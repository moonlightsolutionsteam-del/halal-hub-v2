/**
 * Inserts all Firebase data into Supabase using the anon key.
 * RLS must be disabled on target tables (done via MCP before running).
 * Run: node scripts/migration/run-migration.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://xqtujvultnrlookvtcot.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxdHVqdnVsdG5ybG9va3Z0Y290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3MDM4MTEsImV4cCI6MjA5OTI3OTgxMX0.R2j8hMcuzk-P8Mliv8cO_Wfkv1ro3O93oEtdTCmMIv0';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const businesses = JSON.parse(readFileSync(join(__dirname, 'data-businesses.json'), 'utf8'));
const feedPosts = JSON.parse(readFileSync(join(__dirname, 'data-feed-posts.json'), 'utf8'));
const catalogItems = JSON.parse(readFileSync(join(__dirname, 'data-catalog-items.json'), 'utf8'));

async function upsertBatch(table, rows, conflictCol) {
  const { data, error } = await supabase
    .from(table)
    .upsert(rows, { onConflict: conflictCol, ignoreDuplicates: true });

  if (error) {
    console.error(`  ✗ ${table}:`, error.message);
    return 0;
  }
  return rows.length;
}

async function main() {
  console.log('Running Firebase → Supabase migration...\n');

  // ── Businesses ──────────────────────────────────────────────────────────────
  console.log(`Inserting ${businesses.length} businesses...`);
  let bizOk = 0;
  const BIZ_BATCH = 10;
  for (let i = 0; i < businesses.length; i += BIZ_BATCH) {
    const batch = businesses.slice(i, i + BIZ_BATCH);
    // Remove the 'id' field — Supabase generates UUID; map Firebase 'approved' → V2 'active'
    const statusMap = { approved: 'active', pending: 'pending', rejected: 'rejected', suspended: 'suspended' };
    const rows = batch.map(({ id, status, ...rest }) => ({
      ...rest,
      status: statusMap[status] ?? 'pending',
    }));
    const n = await upsertBatch('businesses', rows, 'firebase_business_id');
    bizOk += n;
    process.stdout.write(`  batch ${Math.floor(i/BIZ_BATCH)+1}/${Math.ceil(businesses.length/BIZ_BATCH)} — ${bizOk} inserted\r`);
    await new Promise(r => setTimeout(r, 100)); // small delay
  }
  console.log(`\n  ✓ Businesses: ${bizOk}/${businesses.length}`);

  // ── Feed Posts ──────────────────────────────────────────────────────────────
  console.log(`\nInserting ${feedPosts.length} feed posts...`);
  const feedOk = await upsertBatch('feed_posts', feedPosts, 'firebase_id');
  console.log(`  ✓ Feed posts: ${feedOk}/${feedPosts.length}`);

  // ── Catalog Items ───────────────────────────────────────────────────────────
  console.log(`\nInserting ${catalogItems.length} catalog items...`);
  const catOk = await upsertBatch('business_catalog_items', catalogItems, 'firebase_id');
  console.log(`  ✓ Catalog items: ${catOk}/${catalogItems.length}`);

  console.log('\n✅ Migration complete!');
}

main().catch(err => {
  console.error('[FATAL]', err.message);
  process.exit(1);
});
