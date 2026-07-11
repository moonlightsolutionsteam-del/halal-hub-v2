/**
 * Reads all Firebase data and writes it to JSON files for MCP-based migration.
 * No Supabase key needed — output is consumed by the MCP execute_sql tool.
 */
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getDatabase } from 'firebase-admin/database';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serviceAccount = JSON.parse(readFileSync(join(__dirname, 'serviceAccount.json'), 'utf8'));

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: 'https://halal-hub-dev-default-rtdb.asia-southeast1.firebasedatabase.app',
});

const db = getFirestore();
const rtdb = getDatabase();

function tsFromMs(ms) {
  if (!ms) return null;
  return new Date(Number(ms)).toISOString();
}

function boolStr(val) {
  if (val === 'yes' || val === true) return true;
  if (val === 'no' || val === false) return false;
  return false;
}

async function main() {
  console.log('Reading Firebase data...');

  // ── Businesses ────────────────────────────────────────────
  console.log('  Reading businesses...');
  const bizSnap = await db.collection('business').doc('details').collection('live').get();
  const businesses = bizSnap.docs.map(doc => {
    const d = doc.data();
    const hasHalalCert = (d.documents || []).some(doc => doc.id === 'Halal_Certificate' && doc.link);
    const halalCertDoc = (d.documents || []).find(doc => doc.id === 'Halal_Certificate');
    const imgLinks = d.imgLink || [];
    return {
      id: doc.id,
      firebase_business_id: d.businessId || null,
      firebase_owner_uid: d.uid || null,
      name: d.businessName || '',
      description: d.description || null,
      category: d.category || 'Other',
      subcategory: d.sub_Category || null,
      sub_sub_category: d.sub_Sub_Category || null,
      address: d.address || null,
      city: d.city || null,
      state: d.state || null,
      country: d.country || 'India',
      latitude: d.lat || null,
      longitude: d.lon || null,
      phone: d.phone || null,
      whatsapp: d.whatsapp || null,
      email: d.email || null,
      website: d.website || null,
      logo_url: d.logo || null,
      cover_url: d.cover || null,
      image_url: imgLinks[0] || null,
      images: imgLinks,
      menu_images: d.images?.Menu || [],
      ambience_images: d.images?.Ambience || [],
      halal_verified: hasHalalCert || boolStr(d.separateKitchen),
      halal_cert_url: halalCertDoc?.link || null,
      price_range: d.price_range || null,
      starting_price: d.starting_price || null,
      cost_per_person: d.cost_per_person || null,
      cost_two: d.cost_two || null,
      alcohol_served: d.alcoholServed || 'no',
      separate_kitchen: boolStr(d.separateKitchen),
      separate_storage: boolStr(d.separateStorage),
      separate_utensils: boolStr(d.separateUtensils),
      selected_cuisines: d.selectedCuisines || [],
      selected_amenities: d.selectedAmenities || [],
      selected_dining: d.selectedDiningService || [],
      selected_highlights: d.selectedHighlights || [],
      selected_meat: d.selectedMeatServed || [],
      selected_payment: d.selectedPaymentMethods || [],
      popular_dishes: d.popularDishes || null,
      signature_dish: d.signatureDish || null,
      primary_cuisine: d.primary_cuisine || null,
      prayer_times: d.prayer || null,
      social_links: d.social || null,
      ordering_platforms: d.selectedItems || null,
      suppliers: d.suppliers || null,
      compliance_docs: d.documents || null,
      subscription_plan: d.subscription?.plan || 'Free',
      under_no_cert: boolStr(d.understandNoCert),
      full_responsibility: boolStr(d.fullResponsibility),
      assigned_owner: d.assignedOwner || null,
      assigned_owner_id: d.assignedOwnerId || null,
      lead_id: d.leadId || null,
      claims: d.claims || 0,
      rating: d.reviews?.avg || 0,
      review_count: d.reviews?.count || 0,
      hours_open: d.statusOpen || null,
      hours_from: d.timeFrom || null,
      hours_to: d.timeTo || null,
      status: d.status || 'pending',
      created_at: tsFromMs(d.createdOn),
    };
  });
  console.log(`  ✓ ${businesses.length} businesses`);

  // ── Feed Posts ────────────────────────────────────────────
  console.log('  Reading feed posts...');
  const feedSnap = await db.collection('feeds').get();
  const feedPosts = feedSnap.docs.map(doc => {
    const d = doc.data();
    return {
      firebase_id: doc.id,
      firebase_owner_uid: d.owner || null,
      display_name: d.name || null,
      description: d.description || null,
      firebase_media_url: d.link || null,
      media_url: d.link || null,
      business_name: d.businessName || null,
      place_name: d.palceName || d.placeName || null,
      lat: d.lat ? Number(d.lat) : null,
      lon: d.lon ? Number(d.lon) : null,
      status: (d.status || 'pending').toLowerCase(),
      firebase_created_on: d.createdOn ? Number(d.createdOn) : null,
      created_at: tsFromMs(d.createdOn),
    };
  });
  console.log(`  ✓ ${feedPosts.length} feed posts`);

  // ── Catalog Items ─────────────────────────────────────────
  console.log('  Reading catalog items...');
  const catSnap = await db.collection('business').doc('catalouge').collection('live').get();
  const catalogItems = catSnap.docs.map(doc => {
    const d = doc.data();
    return {
      firebase_id: doc.id,
      firebase_business_id: d.businessId || null,
      business_name: d.businessName || null,
      title: d.title || null,
      description: d.description || null,
      image_url: d.imgLink || null,
      price: d.price ? Number(d.price) : null,
      lat: d.lat ? Number(d.lat) : null,
      lon: d.lon ? Number(d.lon) : null,
      vendor_uid: d.vendor || null,
    };
  });
  console.log(`  ✓ ${catalogItems.length} catalog items`);

  // ── Auth Users (from export) ──────────────────────────────
  console.log('  Reading auth users export...');
  const authExport = JSON.parse(readFileSync(join(__dirname, 'firebase-auth-users.json'), 'utf8'));
  const authUsers = (authExport.users || []).map(u => ({
    firebase_uid: u.localId,
    phone: u.phoneNumber || null,
    email: u.email || null,
  }));
  console.log(`  ✓ ${authUsers.length} auth users`);

  // ── Write output files ────────────────────────────────────
  writeFileSync(join(__dirname, 'data-businesses.json'), JSON.stringify(businesses, null, 2));
  writeFileSync(join(__dirname, 'data-feed-posts.json'), JSON.stringify(feedPosts, null, 2));
  writeFileSync(join(__dirname, 'data-catalog-items.json'), JSON.stringify(catalogItems, null, 2));
  writeFileSync(join(__dirname, 'data-auth-users.json'), JSON.stringify(authUsers, null, 2));

  console.log('\n✅ All data extracted to scripts/migration/data-*.json');
  console.log(`   Businesses:   ${businesses.length}`);
  console.log(`   Feed posts:   ${feedPosts.length}`);
  console.log(`   Catalog:      ${catalogItems.length}`);
  console.log(`   Auth users:   ${authUsers.length}`);

  process.exit(0);
}

main().catch(err => {
  console.error('[FATAL]', err.message);
  process.exit(1);
});
