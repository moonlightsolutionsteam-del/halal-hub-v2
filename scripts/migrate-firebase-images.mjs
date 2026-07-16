/**
 * Firebase → Supabase Storage Image Migration
 *
 * Copies all Firebase Storage image URLs from the Supabase DB into
 * our own Supabase Storage bucket, then updates every URL column in-place.
 *
 * Run once:  node scripts/migrate-firebase-images.mjs
 *
 * Requires:
 *   NEXT_PUBLIC_SUPABASE_URL   (already in .env.local)
 *   SUPABASE_SERVICE_ROLE_KEY  (from Supabase dashboard → Settings → API)
 *
 * Firebase is read-only — nothing is deleted or changed there.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import path from "path";

// ── Load env ────────────────────────────────────────────────────────────────
const envPath = path.resolve(process.cwd(), ".env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
// Service role key preferred; anon key works because we set a permissive INSERT policy on the bucket
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  env.SUPABASE_SERVICE_ROLE_KEY ||
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const BUCKET = "business-media";

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("\n❌  Could not find Supabase credentials in .env.local\n");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

// ── Helpers ──────────────────────────────────────────────────────────────────

function isFirebaseUrl(url) {
  return typeof url === "string" && url.includes("firebasestorage.googleapis.com");
}

/** Extract a stable path from a Firebase Storage URL to use as the Supabase key */
function firebaseUrlToStoragePath(url) {
  try {
    const u = new URL(url);
    // e.g. /v0/b/halal-hub-dev.firebasestorage.app/o/pages%2Frefimages%2Fabc123
    const encoded = u.pathname.split("/o/")[1];
    if (!encoded) throw new Error("no /o/ segment");
    const decoded = decodeURIComponent(encoded); // pages/refimages/abc123
    // flatten: replace / with _ to keep a flat bucket structure
    return decoded.replace(/\//g, "_");
  } catch {
    return `unknown_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  }
}

/** Download a Firebase image and return its Buffer + content-type */
async function downloadImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const ct = res.headers.get("content-type") || "image/jpeg";
  return { buf, contentType: ct };
}

/** Upload buffer to Supabase Storage, return the public URL */
async function uploadToSupabase(storagePath, buf, contentType) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buf, {
      contentType,
      upsert: true,
    });
  if (error) throw new Error(`Upload failed for ${storagePath}: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}

/** Cache to avoid re-downloading the same Firebase URL twice */
const urlCache = new Map();

async function migrateUrl(firebaseUrl) {
  if (!isFirebaseUrl(firebaseUrl)) return firebaseUrl;
  if (urlCache.has(firebaseUrl)) return urlCache.get(firebaseUrl);

  const storagePath = firebaseUrlToStoragePath(firebaseUrl);
  try {
    const { buf, contentType } = await downloadImage(firebaseUrl);
    const newUrl = await uploadToSupabase(storagePath, buf, contentType);
    urlCache.set(firebaseUrl, newUrl);
    return newUrl;
  } catch (err) {
    console.warn(`  ⚠  Could not migrate ${firebaseUrl.slice(0, 80)}…  →  ${err.message}`);
    urlCache.set(firebaseUrl, firebaseUrl); // keep original on failure
    return firebaseUrl;
  }
}

/** Migrate every Firebase URL inside an array column, return updated array */
async function migrateArray(arr) {
  if (!Array.isArray(arr)) return arr;
  return Promise.all(arr.map(migrateUrl));
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function migrateBusinesses() {
  console.log("\n📦  Fetching businesses with Firebase images…");
  const { data: rows, error } = await supabase
    .from("businesses")
    .select("id, cover_url, logo_url, image_url, images, ambience_images, menu_images, halal_cert_url");

  if (error) throw error;
  const filtered = rows.filter(r =>
    isFirebaseUrl(r.cover_url) || isFirebaseUrl(r.logo_url) || isFirebaseUrl(r.image_url) ||
    isFirebaseUrl(r.halal_cert_url) ||
    (Array.isArray(r.images) && r.images.some(isFirebaseUrl)) ||
    (Array.isArray(r.ambience_images) && r.ambience_images.some(isFirebaseUrl)) ||
    (Array.isArray(r.menu_images) && r.menu_images.some(isFirebaseUrl))
  );
  const rows_to_process = filtered;
  console.log(`   Found ${rows_to_process.length} businesses with Firebase URLs (out of ${rows.length} total).`);

  let updated = 0;
  let failed = 0;

  for (const row of rows_to_process) {
    process.stdout.write(`   [${updated + failed + 1}/${rows_to_process.length}] ${row.id.slice(0, 8)}…  `);

    const patch = {};

    const cover = await migrateUrl(row.cover_url);
    if (cover !== row.cover_url) patch.cover_url = cover;

    const logo = await migrateUrl(row.logo_url);
    if (logo !== row.logo_url) patch.logo_url = logo;

    const img = await migrateUrl(row.image_url);
    if (img !== row.image_url) patch.image_url = img;

    const cert = await migrateUrl(row.halal_cert_url);
    if (cert !== row.halal_cert_url) patch.halal_cert_url = cert;

    const images = await migrateArray(row.images);
    if (JSON.stringify(images) !== JSON.stringify(row.images)) patch.images = images;

    const ambience = await migrateArray(row.ambience_images);
    if (JSON.stringify(ambience) !== JSON.stringify(row.ambience_images)) patch.ambience_images = ambience;

    const menu = await migrateArray(row.menu_images);
    if (JSON.stringify(menu) !== JSON.stringify(row.menu_images)) patch.menu_images = menu;

    if (Object.keys(patch).length > 0) {
      const { error: updateErr } = await supabase
        .from("businesses")
        .update(patch)
        .eq("id", row.id);

      if (updateErr) {
        console.log(`❌ update failed: ${updateErr.message}`);
        failed++;
      } else {
        console.log(`✅ updated ${Object.keys(patch).join(", ")}`);
        updated++;
      }
    } else {
      console.log("— no changes");
    }
  }

  console.log(`\n   Businesses: ${updated} updated, ${failed} failed.`);
}

async function migrateFeedPosts() {
  console.log("\n📦  Fetching feed_posts with Firebase media…");
  const { data: rows, error } = await supabase
    .from("feed_posts")
    .select("id, media_url, firebase_media_url")
    .or("media_url.like.%firebasestorage%,firebase_media_url.like.%firebasestorage%");

  if (error) throw error;
  console.log(`   Found ${rows.length} feed posts to process.`);

  let updated = 0;

  for (const row of rows) {
    process.stdout.write(`   [${updated + 1}/${rows.length}] post ${row.id.slice(0, 8)}…  `);

    const patch = {};

    if (isFirebaseUrl(row.media_url)) {
      const newUrl = await migrateUrl(row.media_url);
      if (newUrl !== row.media_url) patch.media_url = newUrl;
    }

    if (isFirebaseUrl(row.firebase_media_url)) {
      // migrate the content but store it in media_url (canonical column)
      const newUrl = await migrateUrl(row.firebase_media_url);
      if (!patch.media_url) patch.media_url = newUrl;
      // null out the firebase_media_url since it's now in media_url
      patch.firebase_media_url = null;
    }

    if (Object.keys(patch).length > 0) {
      const { error: updateErr } = await supabase
        .from("feed_posts")
        .update(patch)
        .eq("id", row.id);

      if (updateErr) {
        console.log(`❌ ${updateErr.message}`);
      } else {
        console.log(`✅`);
        updated++;
      }
    } else {
      console.log("— no changes");
    }
  }

  console.log(`\n   Feed posts: ${updated} updated.`);
}

async function main() {
  console.log("🚀  Firebase → Supabase Storage Migration");
  console.log(`    Supabase: ${SUPABASE_URL}`);
  console.log(`    Bucket:   ${BUCKET}`);

  await migrateBusinesses();
  await migrateFeedPosts();

  console.log("\n✅  Migration complete.");
  console.log(`    ${urlCache.size} unique Firebase URLs processed.`);
  console.log(`    ${[...urlCache.values()].filter(v => v.includes("supabase")).length} successfully migrated to Supabase.`);
  console.log("\n    Next: run the cleanup script to remove dead Firebase code from V2.\n");
}

main().catch((err) => {
  console.error("\n💥  Migration failed:", err.message);
  process.exit(1);
});
