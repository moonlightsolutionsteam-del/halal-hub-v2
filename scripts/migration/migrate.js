/**
 * Halal Hub — Firebase → Supabase Migration Script
 *
 * What this migrates:
 *   1. Business listings  (Firestore: business/details/live/{uuid})
 *   2. Feed posts         (Firestore: feeds/{id})
 *   3. Catalog items      (Firestore: business/catalouge/live/{id})
 *   4. User phone→UID map (RTDB export JSON + Firebase Auth export)
 *   5. Firebase UID mapping table (for auth continuity)
 *
 * Prerequisites:
 *   npm install firebase-admin @supabase/supabase-js
 *
 * Before running:
 *   1. Download Firebase service account JSON from:
 *      Firebase Console → Project Settings → Service Accounts → Generate new private key
 *      Save as: scripts/migration/serviceAccount.json
 *
 *   2. Export Firebase Auth users:
 *      firebase auth:export scripts/migration/firebase-auth-users.json --format=json
 *      (requires Firebase CLI: npm install -g firebase-tools)
 *
 *   3. Set SUPABASE_SERVICE_ROLE_KEY in your .env.local
 *      (find it in Supabase Dashboard → Project Settings → API → service_role key)
 *
 *   4. Run: node scripts/migration/migrate.js
 */

import admin from 'firebase-admin';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Config ──────────────────────────────────────────────────
const SUPABASE_URL = 'https://xqtujvultnrlookvtcot.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SERVICE_ACCOUNT_PATH = join(__dirname, 'serviceAccount.json');
const AUTH_EXPORT_PATH = join(__dirname, 'firebase-auth-users.json');
const RTDB_EXPORT_PATH = '/Users/nadk/Downloads/halal-hub-dev-default-rtdb-export (1).json';

const DRY_RUN = process.env.DRY_RUN === 'true'; // set DRY_RUN=true to preview without writing

// ── Initialise clients ──────────────────────────────────────
const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://halal-hub-dev-default-rtdb.asia-southeast1.firebasedatabase.app',
});

const db = admin.firestore();
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── Helpers ─────────────────────────────────────────────────
function log(msg) { console.log(`[${new Date().toISOString()}] ${msg}`); }
function warn(msg) { console.warn(`[WARN] ${msg}`); }

async function upsert(table, rows, conflictCol = 'id') {
  if (DRY_RUN) { log(`DRY_RUN: would upsert ${rows.length} rows into ${table}`); return; }
  const { error } = await supabase.from(table).upsert(rows, { onConflict: conflictCol });
  if (error) throw new Error(`Upsert into ${table} failed: ${error.message}`);
}

function boolStr(val) {
  if (val === 'yes' || val === true) return true;
  if (val === 'no' || val === false) return false;
  return false;
}

function tsFromMs(ms) {
  if (!ms) return null;
  return new Date(Number(ms)).toISOString();
}

// ── Step 1: Build Firebase UID → Supabase UUID mapping ─────
async function buildUidMapping() {
  log('Step 1: Building Firebase UID → Supabase UUID mapping...');

  // Read RTDB export to get phone → firebase UID
  const rtdb = JSON.parse(readFileSync(RTDB_EXPORT_PATH, 'utf8'));
  const authNode = rtdb.auth || {};

  // Read Firebase Auth export (firebase auth:export)
  let authUsers = [];
  try {
    const raw = JSON.parse(readFileSync(AUTH_EXPORT_PATH, 'utf8'));
    authUsers = raw.users || [];
  } catch {
    warn('firebase-auth-users.json not found — skipping Auth user migration. Run: firebase auth:export');
  }

  const phoneToFirebaseUid = {};

  // From RTDB auth node: {"+91XXXXXXXXXX": {uid: "...", ...}} or {uid: {phone: "..."}}
  for (const [key, val] of Object.entries(authNode)) {
    if (val && typeof val === 'object') {
      const uid = val.uid || key;
      const phone = val.phone || (key.startsWith('+') ? key : null);
      if (phone && uid) phoneToFirebaseUid[uid] = phone;
    }
  }

  // Also from Auth export
  for (const user of authUsers) {
    if (user.localId && user.phoneNumber) {
      phoneToFirebaseUid[user.localId] = user.phoneNumber;
    }
  }

  log(`Found ${Object.keys(phoneToFirebaseUid).length} Firebase auth users`);

  // Insert into firebase_uid_mapping (without supabase_uuid — filled after Supabase auth migration)
  const mappingRows = Object.entries(phoneToFirebaseUid).map(([firebase_uid, phone]) => ({
    firebase_uid,
    phone,
  }));

  if (mappingRows.length > 0) {
    await upsert('firebase_uid_mapping', mappingRows, 'firebase_uid');
    log(`Mapped ${mappingRows.length} Firebase UIDs`);
  }

  return phoneToFirebaseUid;
}

// ── Step 2: Migrate business listings ──────────────────────
async function migrateBusinesses(uidToPhone) {
  log('Step 2: Migrating business listings (business/details/live/*)...');

  const snapshot = await db.collection('business').doc('details').collection('live').get();
  log(`Found ${snapshot.size} business listings`);

  const rows = [];

  for (const doc of snapshot.docs) {
    const d = doc.data();

    // Determine halal_verified from documents array
    const hasHalalCert = (d.documents || []).some(
      (doc) => doc.id === 'Halal_Certificate' && doc.link
    );
    const halalCertDoc = (d.documents || []).find((doc) => doc.id === 'Halal_Certificate');
    const fssaiDoc = (d.documents || []).find((doc) => doc.id === 'FSSAI');

    // Images: use imgLink array for primary images
    const imgLinks = d.imgLink || [];
    const menuImages = (d.images?.Menu) || [];
    const ambienceImages = (d.images?.Ambience) || [];

    rows.push({
      id:                     doc.id,                             // UUID preserved
      firebase_business_id:   d.businessId || null,              // "HH-20263151341345"
      firebase_owner_uid:     d.uid || null,
      name:                   d.businessName || '',
      description:            d.description || null,
      category:               d.category || 'Other',
      subcategory:            d.sub_Category || null,
      sub_sub_category:       d.sub_Sub_Category || null,
      address:                d.address || null,
      city:                   d.city || null,
      state:                  d.state || null,
      country:                d.country || 'India',
      latitude:               d.lat || null,
      longitude:              d.lon || null,
      phone:                  d.phone || null,
      whatsapp:               d.whatsapp || null,
      email:                  d.email || null,
      website:                d.website || null,
      logo_url:               d.logo || null,
      cover_url:              d.cover || null,
      image_url:              imgLinks[0] || null,
      images:                 imgLinks,
      menu_images:            menuImages,
      ambience_images:        ambienceImages,
      halal_verified:         hasHalalCert || boolStr(d.separateKitchen),
      halal_cert_url:         halalCertDoc?.link || null,
      price_range:            d.price_range || null,
      starting_price:         d.starting_price || null,
      cost_per_person:        d.cost_per_person || null,
      cost_two:               d.cost_two || null,
      alcohol_served:         d.alcoholServed || 'no',
      separate_kitchen:       boolStr(d.separateKitchen),
      separate_storage:       boolStr(d.separateStorage),
      separate_utensils:      boolStr(d.separateUtensils),
      selected_cuisines:      d.selectedCuisines || [],
      selected_amenities:     d.selectedAmenities || [],
      selected_dining:        d.selectedDiningService || [],
      selected_highlights:    d.selectedHighlights || [],
      selected_meat:          d.selectedMeatServed || [],
      selected_payment:       d.selectedPaymentMethods || [],
      popular_dishes:         d.popularDishes || null,
      signature_dish:         d.signatureDish || null,
      primary_cuisine:        d.primary_cuisine || null,
      prayer_times:           d.prayer || null,
      social_links:           d.social || null,
      ordering_platforms:     d.selectedItems || null,
      suppliers:              d.suppliers || null,
      compliance_docs:        d.documents || null,
      subscription_plan:      d.subscription?.plan || 'Free',
      under_no_cert:          boolStr(d.understandNoCert),
      full_responsibility:    boolStr(d.fullResponsibility),
      assigned_owner:         d.assignedOwner || null,
      assigned_owner_id:      d.assignedOwnerId || null,
      lead_id:                d.leadId || null,
      claims:                 d.claims || 0,
      rating:                 d.reviews?.avg || 0,
      review_count:           d.reviews?.count || 0,
      hours_open:             d.statusOpen || null,
      hours_from:             d.timeFrom || null,
      hours_to:               d.timeTo || null,
      opening_hours:          d.statusOpen ? {
                                open: d.statusOpen,
                                from: d.timeFrom,
                                to:   d.timeTo,
                              } : null,
      status:                 d.status || 'pending',
      created_at:             tsFromMs(d.createdOn),
    });
  }

  // Batch upsert in chunks of 50
  for (let i = 0; i < rows.length; i += 50) {
    await upsert('businesses', rows.slice(i, i + 50), 'id');
    log(`  Upserted businesses ${i + 1}–${Math.min(i + 50, rows.length)}`);
  }

  log(`✓ Migrated ${rows.length} businesses`);
  return rows.length;
}

// ── Step 3: Migrate feed posts ─────────────────────────────
async function migrateFeedPosts() {
  log('Step 3: Migrating feed posts (feeds/*)...');

  const snapshot = await db.collection('feeds').get();
  log(`Found ${snapshot.size} feed posts`);

  const rows = [];

  for (const doc of snapshot.docs) {
    const d = doc.data();

    rows.push({
      firebase_id:          doc.id,
      firebase_owner_uid:   d.owner || null,
      display_name:         d.name || null,
      description:          d.description || null,
      firebase_media_url:   d.link || null,
      media_url:            d.link || null,   // will be replaced by Storage migration later
      business_name:        d.businessName || null,
      place_name:           d.palceName || d.placeName || null,
      lat:                  d.lat ? Number(d.lat) : null,
      lon:                  d.lon ? Number(d.lon) : null,
      status:               (d.status || 'pending').toLowerCase(),
      firebase_created_on:  d.createdOn ? Number(d.createdOn) : null,
      created_at:           tsFromMs(d.createdOn),
    });
  }

  for (let i = 0; i < rows.length; i += 50) {
    await upsert('feed_posts', rows.slice(i, i + 50), 'firebase_id');
    log(`  Upserted feed posts ${i + 1}–${Math.min(i + 50, rows.length)}`);
  }

  log(`✓ Migrated ${rows.length} feed posts`);
  return rows.length;
}

// ── Step 4: Migrate catalog items ──────────────────────────
async function migrateCatalogItems() {
  log('Step 4: Migrating catalog items (business/catalouge/live/*)...');

  const snapshot = await db.collection('business').doc('catalouge').collection('live').get();
  log(`Found ${snapshot.size} catalog items`);

  const rows = [];

  for (const doc of snapshot.docs) {
    const d = doc.data();
    rows.push({
      firebase_id:          doc.id,
      firebase_business_id: d.businessId || null,
      business_name:        d.businessName || null,
      title:                d.title || null,
      description:          d.description || null,
      image_url:            d.imgLink || null,
      price:                d.price ? Number(d.price) : null,
      lat:                  d.lat ? Number(d.lat) : null,
      lon:                  d.lon ? Number(d.lon) : null,
      vendor_uid:           d.vendor || null,
    });
  }

  if (rows.length > 0) {
    await upsert('business_catalog_items', rows, 'firebase_id');
  }

  log(`✓ Migrated ${rows.length} catalog items`);
}

// ── Step 5: Link businesses to Supabase owner_id ──────────
// Run AFTER Supabase Auth migration (Google/phone sign-in setup)
async function linkBusinessOwners() {
  log('Step 5: Linking business.owner_id to firebase_uid_mapping...');

  const { error } = await supabase.rpc('link_business_owners');
  if (error) {
    warn(`link_business_owners RPC not found — run this SQL manually:\n
UPDATE businesses b
SET owner_id = m.supabase_uuid
FROM firebase_uid_mapping m
WHERE b.firebase_owner_uid = m.firebase_uid
  AND m.supabase_uuid IS NOT NULL
  AND b.owner_id IS NULL;`);
  }
}

// ── Main ────────────────────────────────────────────────────
async function main() {
  log(`Starting Halal Hub Firebase → Supabase migration${DRY_RUN ? ' (DRY RUN)' : ''}...`);

  if (!SUPABASE_SERVICE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY env var is not set');
  }

  const uidToPhone = await buildUidMapping();
  await migrateBusinesses(uidToPhone);
  await migrateFeedPosts();
  await migrateCatalogItems();
  await linkBusinessOwners();

  log('');
  log('✅ Migration complete!');
  log('');
  log('Next steps:');
  log('  1. Run: firebase auth:export scripts/migration/firebase-auth-users.json --format=json');
  log('     Then re-run this script to fill in auth user records.');
  log('  2. Migrate Firebase Storage media to Supabase Storage (separate step).');
  log('  3. After users sign in via Supabase Auth, supabase_uuid fills automatically.');
  log('  4. Run the SQL UPDATE in Step 5 once most users have signed in to link owners.');
}

main().catch((err) => {
  console.error('[FATAL]', err.message);
  process.exit(1);
});
