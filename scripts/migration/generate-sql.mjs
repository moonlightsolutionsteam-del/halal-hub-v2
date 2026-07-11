/**
 * Generates INSERT SQL from extracted Firebase JSON files.
 * Output files are executed via Supabase MCP execute_sql.
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function esc(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (typeof val === 'number') return String(val);
  const s = String(val).replace(/'/g, "''");
  return `'${s}'`;
}

function escJson(val) {
  if (val === null || val === undefined) return 'NULL';
  return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
}

function escArr(arr) {
  if (!arr || arr.length === 0) return "'{}'";
  const elements = arr.map(e => {
    const s = String(e).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `"${s}"`;
  });
  return `'{${elements.join(',')}}'`;
}

const businesses = JSON.parse(readFileSync(join(__dirname, 'data-businesses.json'), 'utf8'));
const feedPosts = JSON.parse(readFileSync(join(__dirname, 'data-feed-posts.json'), 'utf8'));
const catalogItems = JSON.parse(readFileSync(join(__dirname, 'data-catalog-items.json'), 'utf8'));
const authUsers = JSON.parse(readFileSync(join(__dirname, 'data-auth-users.json'), 'utf8'));

// ── Auth user mappings (firebase_uid stored, supabase_uuid linked on first login) ──
const authLines = authUsers.map(u => {
  const phone = esc(u.phone);
  const email = esc(u.email);
  return `INSERT INTO firebase_uid_mapping (firebase_uid, phone) VALUES (${esc(u.firebase_uid)}, ${phone}) ON CONFLICT (firebase_uid) DO NOTHING;`;
});

// ── Businesses ──────────────────────────────────────────────────────────────────────
const bizLines = businesses.map(b => {
  return `INSERT INTO businesses (
  firebase_business_id, firebase_owner_uid, name, description, category, subcategory, sub_sub_category,
  address, city, state, country, latitude, longitude, phone, whatsapp, email, website,
  logo_url, cover_url, image_url, images, menu_images, ambience_images,
  halal_verified, halal_cert_url, price_range, starting_price, cost_per_person, cost_two,
  alcohol_served, separate_kitchen, separate_storage, separate_utensils,
  selected_cuisines, selected_amenities, selected_dining, selected_highlights, selected_meat, selected_payment,
  popular_dishes, signature_dish, primary_cuisine,
  prayer_times, social_links, ordering_platforms, suppliers, compliance_docs,
  subscription_plan, under_no_cert, full_responsibility,
  assigned_owner, assigned_owner_id, lead_id, claims, rating, review_count,
  hours_open, hours_from, hours_to, status, created_at
) VALUES (
  ${esc(b.firebase_business_id)}, ${esc(b.firebase_owner_uid)}, ${esc(b.name)}, ${esc(b.description)}, ${esc(b.category)}, ${esc(b.subcategory)}, ${esc(b.sub_sub_category)},
  ${esc(b.address)}, ${esc(b.city)}, ${esc(b.state)}, ${esc(b.country)}, ${b.latitude ?? 'NULL'}, ${b.longitude ?? 'NULL'}, ${esc(b.phone)}, ${esc(b.whatsapp)}, ${esc(b.email)}, ${esc(b.website)},
  ${esc(b.logo_url)}, ${esc(b.cover_url)}, ${esc(b.image_url)}, ${escArr(b.images)}, ${escArr(b.menu_images)}, ${escArr(b.ambience_images)},
  ${b.halal_verified ? 'TRUE' : 'FALSE'}, ${esc(b.halal_cert_url)}, ${esc(b.price_range)}, ${esc(b.starting_price)}, ${esc(b.cost_per_person)}, ${esc(b.cost_two)},
  ${esc(b.alcohol_served)}, ${b.separate_kitchen ? 'TRUE' : 'FALSE'}, ${b.separate_storage ? 'TRUE' : 'FALSE'}, ${b.separate_utensils ? 'TRUE' : 'FALSE'},
  ${escArr(b.selected_cuisines)}, ${escArr(b.selected_amenities)}, ${escArr(b.selected_dining)}, ${escArr(b.selected_highlights)}, ${escArr(b.selected_meat)}, ${escArr(b.selected_payment)},
  ${esc(b.popular_dishes)}, ${esc(b.signature_dish)}, ${esc(b.primary_cuisine)},
  ${escJson(b.prayer_times)}, ${escJson(b.social_links)}, ${escJson(b.ordering_platforms)}, ${escJson(b.suppliers)}, ${escJson(b.compliance_docs)},
  ${esc(b.subscription_plan)}, ${b.under_no_cert ? 'TRUE' : 'FALSE'}, ${b.full_responsibility ? 'TRUE' : 'FALSE'},
  ${esc(b.assigned_owner)}, ${esc(b.assigned_owner_id)}, ${esc(b.lead_id)}, ${b.claims ?? 0}, ${b.rating ?? 0}, ${b.review_count ?? 0},
  ${escJson(b.hours_open)}, ${escJson(b.hours_from)}, ${escJson(b.hours_to)}, ${esc(b.status)}, ${esc(b.created_at)}
) ON CONFLICT (firebase_business_id) DO NOTHING;`;
});

// ── Feed Posts ──────────────────────────────────────────────────────────────────────
const feedLines = feedPosts.map(f => {
  return `INSERT INTO feed_posts (
  firebase_id, firebase_owner_uid, display_name, description, media_url, firebase_media_url,
  business_name, place_name, lat, lon, status, firebase_created_on, created_at
) VALUES (
  ${esc(f.firebase_id)}, ${esc(f.firebase_owner_uid)}, ${esc(f.display_name)}, ${esc(f.description)},
  ${esc(f.media_url)}, ${esc(f.firebase_media_url)},
  ${esc(f.business_name)}, ${esc(f.place_name)}, ${f.lat ?? 'NULL'}, ${f.lon ?? 'NULL'},
  ${esc(f.status)}, ${f.firebase_created_on ?? 'NULL'}, ${esc(f.created_at)}
) ON CONFLICT (firebase_id) DO NOTHING;`;
});

// ── Catalog Items ───────────────────────────────────────────────────────────────────
const catalogLines = catalogItems.map(c => {
  return `INSERT INTO business_catalog_items (
  firebase_id, firebase_business_id, business_name, title, description, image_url, price, lat, lon, vendor_uid
) VALUES (
  ${esc(c.firebase_id)}, ${esc(c.firebase_business_id)}, ${esc(c.business_name)}, ${esc(c.title)}, ${esc(c.description)},
  ${esc(c.image_url)}, ${c.price ?? 'NULL'}, ${c.lat ?? 'NULL'}, ${c.lon ?? 'NULL'}, ${esc(c.vendor_uid)}
) ON CONFLICT (firebase_id) DO NOTHING;`;
});

// Write output files (split businesses into batches for MCP size limits)
const BATCH = 5;

function batches(lines, size) {
  const result = [];
  for (let i = 0; i < lines.length; i += size) {
    result.push(lines.slice(i, i + size).join('\n'));
  }
  return result;
}

const bizBatches = batches(bizLines, BATCH);
bizBatches.forEach((sql, i) => {
  writeFileSync(join(__dirname, `sql-businesses-${String(i+1).padStart(2,'0')}.sql`), sql);
});

writeFileSync(join(__dirname, 'sql-auth-mappings.sql'), authLines.join('\n'));
writeFileSync(join(__dirname, 'sql-feed-posts.sql'), feedLines.join('\n'));
writeFileSync(join(__dirname, 'sql-catalog-items.sql'), catalogLines.join('\n'));

console.log(`✅ SQL files generated:`);
console.log(`   Auth mappings:  sql-auth-mappings.sql (${authLines.length} rows)`);
console.log(`   Businesses:     ${bizBatches.length} batch files × up to ${BATCH} rows`);
console.log(`   Feed posts:     sql-feed-posts.sql (${feedLines.length} rows)`);
console.log(`   Catalog items:  sql-catalog-items.sql (${catalogLines.length} rows)`);
