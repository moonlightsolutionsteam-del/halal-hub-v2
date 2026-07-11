-- ============================================================
-- Halal Hub V2 — Partner Subscriptions Table
-- Migrated from Firebase RTDB: partner/subscription
-- ============================================================

CREATE TABLE IF NOT EXISTS partner_subscriptions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id           UUID REFERENCES businesses(id) ON DELETE SET NULL,
  firebase_owner_uid    TEXT,
  supabase_user_id      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  plan                  TEXT NOT NULL,
  price_paid            NUMERIC DEFAULT 0,
  business_slots        INTEGER DEFAULT 1,
  image_slots           INTEGER DEFAULT 1,
  validity_days         INTEGER,
  starts_at             TIMESTAMPTZ DEFAULT NOW(),
  expires_at            TIMESTAMPTZ,
  status                TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  migrated_from_firebase BOOLEAN DEFAULT FALSE,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE partner_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owners can read own subscriptions" ON partner_subscriptions
  FOR SELECT USING (auth.uid() = supabase_user_id);

CREATE INDEX IF NOT EXISTS idx_partner_subs_user     ON partner_subscriptions(supabase_user_id);
CREATE INDEX IF NOT EXISTS idx_partner_subs_business ON partner_subscriptions(business_id);
CREATE INDEX IF NOT EXISTS idx_partner_subs_firebase ON partner_subscriptions(firebase_owner_uid);

-- Migrated Firebase subscriptions
-- Standard plan (active, expires 2026-10-29)
INSERT INTO partner_subscriptions (firebase_owner_uid, plan, price_paid, business_slots, image_slots, validity_days, expires_at, status, migrated_from_firebase)
VALUES ('NIsWTXq8bwea8zImZf0oK9jbx0j1', 'Standard', 10, 5, 5, 365, TO_TIMESTAMP(1793278722011/1000.0), 'active', TRUE)
ON CONFLICT DO NOTHING;

-- Free plan (expired 2025-11-08)
INSERT INTO partner_subscriptions (firebase_owner_uid, plan, price_paid, business_slots, image_slots, expires_at, status, migrated_from_firebase)
VALUES ('AZxhZul4atTprXLvDYHqNao6nqH2', 'Free', 0, 1, 1, TO_TIMESTAMP(1762560000000/1000.0), 'expired', TRUE)
ON CONFLICT DO NOTHING;
