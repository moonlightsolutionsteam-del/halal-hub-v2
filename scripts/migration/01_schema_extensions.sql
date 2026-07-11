-- ============================================================
-- Halal Hub V2 — Schema Extensions for Firebase Migration
-- Run against Supabase project: xqtujvultnrlookvtcot
-- ============================================================

-- ── 1. Firebase UID → Supabase UUID mapping table ──────────
-- Used during migration and kept permanently for auth lookups.
CREATE TABLE IF NOT EXISTS firebase_uid_mapping (
  firebase_uid   TEXT PRIMARY KEY,
  supabase_uuid  UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  phone          TEXT,
  migrated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. Extend businesses table ──────────────────────────────
-- Existing columns (already present):
--   id, name, description, category, subcategory, address, city,
--   latitude, longitude, phone, email, website, image_url, images,
--   rating, review_count, halal_verified, halal_cert_url,
--   is_open, opening_hours, owner_id, status, created_at, updated_at

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS firebase_business_id  TEXT UNIQUE,      -- "HH-20263151341345"
  ADD COLUMN IF NOT EXISTS firebase_owner_uid    TEXT,             -- for migration mapping
  ADD COLUMN IF NOT EXISTS state                 TEXT,
  ADD COLUMN IF NOT EXISTS country               TEXT DEFAULT 'India',
  ADD COLUMN IF NOT EXISTS whatsapp              TEXT,
  ADD COLUMN IF NOT EXISTS logo_url              TEXT,
  ADD COLUMN IF NOT EXISTS cover_url             TEXT,
  ADD COLUMN IF NOT EXISTS sub_sub_category      TEXT,
  ADD COLUMN IF NOT EXISTS price_range           TEXT,             -- "Budget" | "Moderate" | "Premium"
  ADD COLUMN IF NOT EXISTS starting_price        TEXT,
  ADD COLUMN IF NOT EXISTS cost_per_person       TEXT,
  ADD COLUMN IF NOT EXISTS cost_two              TEXT,
  ADD COLUMN IF NOT EXISTS alcohol_served        TEXT DEFAULT 'no',
  ADD COLUMN IF NOT EXISTS separate_kitchen      BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS separate_storage      BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS separate_utensils     BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS selected_cuisines     TEXT[],
  ADD COLUMN IF NOT EXISTS selected_amenities    TEXT[],
  ADD COLUMN IF NOT EXISTS selected_dining       TEXT[],
  ADD COLUMN IF NOT EXISTS selected_highlights   TEXT[],
  ADD COLUMN IF NOT EXISTS selected_meat         TEXT[],
  ADD COLUMN IF NOT EXISTS selected_payment      TEXT[],
  ADD COLUMN IF NOT EXISTS popular_dishes        TEXT,
  ADD COLUMN IF NOT EXISTS signature_dish        TEXT,
  ADD COLUMN IF NOT EXISTS primary_cuisine       TEXT,
  ADD COLUMN IF NOT EXISTS prayer_times          JSONB,            -- {fajr, zohar, asr, maghrib, isha, jumma_1..3}
  ADD COLUMN IF NOT EXISTS social_links          JSONB,            -- [{name, link, image, ischeck}]
  ADD COLUMN IF NOT EXISTS ordering_platforms    JSONB,            -- [{name, link, image, ischeck}] Swiggy/Zomato
  ADD COLUMN IF NOT EXISTS suppliers             JSONB,            -- [{name, phone, location, meatTypes[]}]
  ADD COLUMN IF NOT EXISTS compliance_docs       JSONB,            -- [{id, name, fileName, link, tagging}]
  ADD COLUMN IF NOT EXISTS subscription_plan     TEXT DEFAULT 'Free',
  ADD COLUMN IF NOT EXISTS under_no_cert         BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS full_responsibility   BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS assigned_owner        TEXT,
  ADD COLUMN IF NOT EXISTS assigned_owner_id     TEXT,
  ADD COLUMN IF NOT EXISTS lead_id               TEXT,
  ADD COLUMN IF NOT EXISTS claims                INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS menu_images           TEXT[],
  ADD COLUMN IF NOT EXISTS ambience_images       TEXT[],
  ADD COLUMN IF NOT EXISTS youtube_links         TEXT[],
  ADD COLUMN IF NOT EXISTS hours_open            JSONB,            -- {mon: "Open"|"Closed", ...}
  ADD COLUMN IF NOT EXISTS hours_from            JSONB,            -- {mon: "07:00", ...}
  ADD COLUMN IF NOT EXISTS hours_to              JSONB;            -- {mon: "22:30", ...}

-- ── 3. Feed posts table ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS feed_posts (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_id       TEXT UNIQUE,
  owner_id          UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  firebase_owner_uid TEXT,
  display_name      TEXT,                            -- poster name
  description       TEXT,
  media_url         TEXT,                            -- migrated to Supabase Storage
  firebase_media_url TEXT,                           -- original Firebase Storage URL
  business_id       UUID REFERENCES businesses(id) ON DELETE SET NULL,
  business_name     TEXT,
  place_name        TEXT,                            -- "palceName" in Firebase (typo)
  lat               DOUBLE PRECISION,
  lon               DOUBLE PRECISION,
  status            TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  firebase_created_on BIGINT                         -- original ms timestamp
);

-- ── 4. Creators table ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS creators (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  firebase_uid    TEXT UNIQUE,
  display_name    TEXT,
  bio             TEXT,
  avatar_url      TEXT,
  cover_url       TEXT,
  category        TEXT,
  follower_count  INTEGER DEFAULT 0,
  post_count      INTEGER DEFAULT 0,
  status          TEXT DEFAULT 'active',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── 5. Business catalog items table ─────────────────────────
-- From Firebase: business/catalouge/live/{id}
CREATE TABLE IF NOT EXISTS business_catalog_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_id     TEXT UNIQUE,
  business_id     UUID REFERENCES businesses(id) ON DELETE CASCADE,
  firebase_business_id TEXT,
  business_name   TEXT,
  title           TEXT,
  description     TEXT,
  image_url       TEXT,
  price           NUMERIC,
  lat             DOUBLE PRECISION,
  lon             DOUBLE PRECISION,
  vendor_uid      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── 6. RLS policies ─────────────────────────────────────────
ALTER TABLE feed_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE creators   ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_catalog_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE firebase_uid_mapping   ENABLE ROW LEVEL SECURITY;

-- feed_posts: public read for approved posts
CREATE POLICY "approved posts are public" ON feed_posts
  FOR SELECT USING (status = 'approved');

CREATE POLICY "owner can manage own posts" ON feed_posts
  FOR ALL USING (auth.uid() = owner_id);

-- creators: public read
CREATE POLICY "creators are public" ON creators
  FOR SELECT USING (true);

-- business_catalog_items: public read
CREATE POLICY "catalog items are public" ON business_catalog_items
  FOR SELECT USING (true);

-- firebase_uid_mapping: service role only (no RLS bypass needed, restrict)
CREATE POLICY "no public access to uid mapping" ON firebase_uid_mapping
  FOR ALL USING (false);

-- ── 7. Indexes ───────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_businesses_firebase_id ON businesses(firebase_business_id);
CREATE INDEX IF NOT EXISTS idx_businesses_owner ON businesses(owner_id);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);
CREATE INDEX IF NOT EXISTS idx_feed_posts_owner ON feed_posts(owner_id);
CREATE INDEX IF NOT EXISTS idx_feed_posts_status ON feed_posts(status);
CREATE INDEX IF NOT EXISTS idx_creators_user ON creators(user_id);
CREATE INDEX IF NOT EXISTS idx_uid_mapping ON firebase_uid_mapping(firebase_uid);
