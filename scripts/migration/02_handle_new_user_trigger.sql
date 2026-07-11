-- ============================================================
-- Halal Hub V2 — New-User Profile Trigger (migration-aware)
-- Applies legacy Firebase points and links UID mapping on first login.
-- Run AFTER 01_schema_extensions.sql and after Firebase data migration.
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_firebase_uid  TEXT;
  v_legacy_points INTEGER := 0;
  v_phone         TEXT;
BEGIN
  v_phone := new.phone;

  -- 1. Look up Firebase UID by phone (covers phone OTP users)
  IF v_phone IS NOT NULL THEN
    SELECT firebase_uid, COALESCE(legacy_points, 0)
      INTO v_firebase_uid, v_legacy_points
      FROM firebase_uid_mapping
     WHERE phone = v_phone
     LIMIT 1;
  END IF;

  -- 2. Fallback: firebase_uid passed in user metadata (social login bridge)
  IF v_firebase_uid IS NULL THEN
    v_firebase_uid := new.raw_user_meta_data->>'firebase_uid';
    IF v_firebase_uid IS NOT NULL THEN
      SELECT COALESCE(legacy_points, 0)
        INTO v_legacy_points
        FROM firebase_uid_mapping
       WHERE firebase_uid = v_firebase_uid;
    END IF;
  END IF;

  -- 3. Create profile — coins = 50 signup bonus + any legacy Firebase points
  INSERT INTO public.profiles (id, name, email, phone, photo_url, halal_coins_balance)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.email,
    v_phone,
    new.raw_user_meta_data->>'avatar_url',
    50 + v_legacy_points
  );

  -- 4. Link Supabase UUID into mapping table
  IF v_firebase_uid IS NOT NULL THEN
    UPDATE firebase_uid_mapping
       SET supabase_uuid = new.id
     WHERE firebase_uid = v_firebase_uid;

    -- 5. Attach any pending partner subscriptions
    UPDATE partner_subscriptions
       SET supabase_user_id = new.id
     WHERE firebase_owner_uid = v_firebase_uid AND supabase_user_id IS NULL;
  END IF;

  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
