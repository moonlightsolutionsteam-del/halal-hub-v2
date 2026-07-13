-- ============================================================
-- HALAL HUB V2 — Supabase Database Schema
-- Run this in the Supabase SQL editor to set up all tables
-- ============================================================

-- PROFILES (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text,
  phone text,
  email text,
  photo_url text,
  city text,
  country text default 'IN',
  roles text[] default array['consumer'],
  halal_coins_balance integer default 50,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Admins can read all profiles" on public.profiles
  for select using (
    exists (
      select 1 from public.profiles where id = auth.uid() and 'super_admin' = any(roles)
    )
  );

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, photo_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- BUSINESSES
create table if not exists public.businesses (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  category text not null,
  subcategory text,
  address text,
  city text,
  latitude double precision,
  longitude double precision,
  phone text,
  email text,
  website text,
  image_url text,
  images text[] default '{}',
  rating numeric(2,1),
  review_count integer default 0,
  halal_verified boolean default false,
  halal_cert_url text,
  is_open boolean,
  opening_hours jsonb,
  owner_id uuid references public.profiles(id) on delete set null,
  status text default 'pending' check (status in ('pending', 'active', 'suspended', 'rejected')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.businesses enable row level security;

create policy "Anyone can read active businesses" on public.businesses
  for select using (status = 'active');

create policy "Owners can update own business" on public.businesses
  for update using (auth.uid() = owner_id);

create policy "Admins can manage all" on public.businesses
  for all using (
    exists (
      select 1 from public.profiles where id = auth.uid() and 'super_admin' = any(roles)
    )
  );

-- CONTACTS
create table if not exists public.contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  user_id uuid references public.profiles(id) on delete set null,
  status text default 'new' check (status in ('new', 'in_review', 'resolved')),
  created_at timestamptz default now()
);

alter table public.contacts enable row level security;

create policy "Anyone can insert contacts" on public.contacts
  for insert with check (true);

create policy "Admins can read contacts" on public.contacts
  for select using (
    exists (
      select 1 from public.profiles where id = auth.uid() and 'super_admin' = any(roles)
    )
  );

-- SUGGESTIONS
create table if not exists public.suggestions (
  id uuid default gen_random_uuid() primary key,
  category text not null,
  place_name text not null,
  address text,
  reason text,
  image_urls text[] default '{}',
  user_id uuid references public.profiles(id) on delete set null,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);

alter table public.suggestions enable row level security;

create policy "Anyone can insert suggestions" on public.suggestions
  for insert with check (true);

create policy "Users can read own suggestions" on public.suggestions
  for select using (auth.uid() = user_id);

create policy "Admins can manage suggestions" on public.suggestions
  for all using (
    exists (
      select 1 from public.profiles where id = auth.uid() and 'super_admin' = any(roles)
    )
  );

-- CLAIMS
create table if not exists public.claims (
  id uuid default gen_random_uuid() primary key,
  business_name text,
  full_name text not null,
  mobile text not null,
  role text not null,
  proof_url text,
  user_id uuid references public.profiles(id) on delete set null,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);

alter table public.claims enable row level security;

create policy "Anyone can insert claims" on public.claims
  for insert with check (true);

create policy "Admins can manage claims" on public.claims
  for all using (
    exists (
      select 1 from public.profiles where id = auth.uid() and 'super_admin' = any(roles)
    )
  );

-- COMMUNITY POSTS
create table if not exists public.community_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  category text not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  likes integer default 0,
  comment_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.community_posts enable row level security;

create policy "Anyone can read posts" on public.community_posts
  for select using (true);

create policy "Authenticated users can create posts" on public.community_posts
  for insert with check (auth.uid() = author_id);

create policy "Authors can update own posts" on public.community_posts
  for update using (auth.uid() = author_id);

-- MESSAGES
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  read boolean default false,
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

create policy "Users can read own messages" on public.messages
  for select using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Authenticated users can send messages" on public.messages
  for insert with check (auth.uid() = sender_id);

-- Enable realtime for messages
alter publication supabase_realtime add table public.messages;

-- SAVED BUSINESSES
create table if not exists public.saved_businesses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  business_id uuid references public.businesses(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, business_id)
);

alter table public.saved_businesses enable row level security;

create policy "Users can manage own saved businesses" on public.saved_businesses
  for all using (auth.uid() = user_id);

-- UPDATED_AT trigger helper
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_businesses_updated_at before update on public.businesses
  for each row execute procedure public.set_updated_at();

create trigger set_posts_updated_at before update on public.community_posts
  for each row execute procedure public.set_updated_at();

-- INDEXES for performance
create index if not exists idx_businesses_category on public.businesses(category);
create index if not exists idx_businesses_city on public.businesses(city);
create index if not exists idx_businesses_status on public.businesses(status);
create index if not exists idx_messages_sender on public.messages(sender_id);
create index if not exists idx_messages_receiver on public.messages(receiver_id);
create index if not exists idx_community_posts_category on public.community_posts(category);
create index if not exists idx_saved_businesses_user on public.saved_businesses(user_id);

-- ══════════════════════════════════════════════════════════════════
-- Engagement Engine — Wave 1: schema, activity log, points, achievements,
-- faith content, streaks, recent searches.
-- ══════════════════════════════════════════════════════════════════

-- ── Profile extensions ──────────────────────────────────────────────
alter table public.profiles add column if not exists interests text[] default '{}';
alter table public.profiles add column if not exists notification_prefs jsonb default '{
  "prayer": true, "community": true, "businesses": true, "marketplace": true,
  "events": true, "rewards": true, "creators": true, "achievements": true,
  "quiet_hours_start": null, "quiet_hours_end": null
}'::jsonb;
alter table public.profiles add column if not exists last_active_at timestamptz default now();

-- ── Activity log (backbone for journey, points, achievements, recs) ─
create table if not exists public.user_activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null,
  ref_table text,
  ref_id uuid,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
create index if not exists idx_activity_user_type on public.user_activity_events(user_id, event_type);
create index if not exists idx_activity_user_created on public.user_activity_events(user_id, created_at desc);
alter table public.user_activity_events enable row level security;
create policy "Users can read own activity" on public.user_activity_events
  for select using (auth.uid() = user_id);

-- ── Points ledger (every point transaction, auditable) ──────────────
create table if not exists public.points_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  delta integer not null,
  reason text not null,
  ref_table text,
  ref_id uuid,
  created_at timestamptz default now()
);
create index if not exists idx_points_user on public.points_ledger(user_id, created_at desc);
alter table public.points_ledger enable row level security;
create policy "Users can read own points ledger" on public.points_ledger
  for select using (auth.uid() = user_id);

-- ── Achievements catalog + unlocks ───────────────────────────────────
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  name text not null,
  description text not null,
  icon text not null default 'Award',
  event_type text not null,
  threshold integer not null default 1,
  points_reward integer not null default 20,
  sort_order integer default 0,
  active boolean default true,
  created_at timestamptz default now()
);
alter table public.achievements enable row level security;
create policy "Anyone can read active achievements" on public.achievements
  for select using (active = true);

create table if not exists public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  unlocked_at timestamptz default now(),
  unique(user_id, achievement_id)
);
alter table public.user_achievements enable row level security;
create policy "Users can read own achievements" on public.user_achievements
  for select using (auth.uid() = user_id);

-- ── Faith content pool ───────────────────────────────────────────────
create table if not exists public.faith_content (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('verse','hadith','quote','dua')),
  text_en text not null,
  reference text,
  active boolean default true,
  created_at timestamptz default now()
);
alter table public.faith_content enable row level security;
create policy "Anyone can read active faith content" on public.faith_content
  for select using (active = true);

-- ── Streaks (generic, opt-out) ───────────────────────────────────────
create table if not exists public.user_streaks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  streak_type text not null,
  current_count integer default 0,
  longest_count integer default 0,
  last_activity_date date,
  enabled boolean default true,
  unique(user_id, streak_type)
);
alter table public.user_streaks enable row level security;
create policy "Users can read own streaks" on public.user_streaks
  for select using (auth.uid() = user_id);
create policy "Users can update own streak prefs" on public.user_streaks
  for update using (auth.uid() = user_id);

-- ── Recent searches ──────────────────────────────────────────────────
create table if not exists public.recent_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  query text not null,
  created_at timestamptz default now()
);
create index if not exists idx_recent_searches_user on public.recent_searches(user_id, created_at desc);
alter table public.recent_searches enable row level security;
create policy "Users can read own searches" on public.recent_searches
  for select using (auth.uid() = user_id);
create policy "Users can insert own searches" on public.recent_searches
  for insert with check (auth.uid() = user_id);
create policy "Users can delete own searches" on public.recent_searches
  for delete using (auth.uid() = user_id);

-- ══════════════════════════════════════════════════════════════════
-- RPC engine functions
-- ══════════════════════════════════════════════════════════════════

create or replace function public.award_points(
  p_user_id uuid, p_delta integer, p_reason text,
  p_ref_table text default null, p_ref_id uuid default null
) returns void
language plpgsql security definer set search_path = public as $$
begin
  insert into public.points_ledger (user_id, delta, reason, ref_table, ref_id)
  values (p_user_id, p_delta, p_reason, p_ref_table, p_ref_id);

  update public.profiles
  set halal_coins_balance = greatest(0, coalesce(halal_coins_balance, 0) + p_delta)
  where id = p_user_id;
end;
$$;

create or replace function public.check_achievements(p_user_id uuid) returns void
language plpgsql security definer set search_path = public as $$
declare
  rec record;
  ev_count integer;
begin
  for rec in
    select a.* from public.achievements a
    where a.active = true
      and not exists (
        select 1 from public.user_achievements ua
        where ua.user_id = p_user_id and ua.achievement_id = a.id
      )
  loop
    select count(*) into ev_count
    from public.user_activity_events
    where user_id = p_user_id and event_type = rec.event_type;

    if ev_count >= rec.threshold then
      insert into public.user_achievements (user_id, achievement_id)
      values (p_user_id, rec.id)
      on conflict do nothing;

      perform public.award_points(p_user_id, rec.points_reward, 'achievement:' || rec.key, 'achievements', rec.id);

      insert into public.notifications (user_id, type, title, body, link)
      values (p_user_id, 'achievement', 'Achievement Unlocked: ' || rec.name, rec.description, '/account/journey');
    end if;
  end loop;
end;
$$;

create or replace function public.log_activity(
  p_user_id uuid, p_event_type text,
  p_ref_table text default null, p_ref_id uuid default null,
  p_metadata jsonb default '{}'::jsonb
) returns void
language plpgsql security definer set search_path = public as $$
begin
  insert into public.user_activity_events (user_id, event_type, ref_table, ref_id, metadata)
  values (p_user_id, p_event_type, p_ref_table, p_ref_id, p_metadata);

  update public.profiles set last_active_at = now() where id = p_user_id;

  perform public.check_achievements(p_user_id);
end;
$$;

-- Uses auth.uid() internally (not a client-supplied user_id) so a
-- signed-in user can only ever bump their own streak.
create or replace function public.bump_streak(p_streak_type text)
returns table(current_count integer, longest_count integer, is_new_today boolean)
language plpgsql security definer set search_path = public as $$
declare
  v_user_id uuid := auth.uid();
  v_row public.user_streaks;
  v_new boolean := false;
begin
  if v_user_id is null then
    raise exception 'not authenticated';
  end if;

  select * into v_row from public.user_streaks
  where user_id = v_user_id and streak_type = p_streak_type;

  if v_row is null then
    insert into public.user_streaks (user_id, streak_type, current_count, longest_count, last_activity_date)
    values (v_user_id, p_streak_type, 1, 1, current_date)
    returning * into v_row;
    v_new := true;
  elsif v_row.last_activity_date = current_date then
    v_new := false;
  elsif v_row.last_activity_date = current_date - 1 then
    update public.user_streaks
      set current_count = current_count + 1,
          longest_count = greatest(longest_count, current_count + 1),
          last_activity_date = current_date
      where id = v_row.id
      returning * into v_row;
    v_new := true;
  else
    update public.user_streaks
      set current_count = 1,
          last_activity_date = current_date
      where id = v_row.id
      returning * into v_row;
    v_new := true;
  end if;

  if v_new and v_row.enabled then
    perform public.log_activity(v_user_id, 'daily_checkin_streak', 'user_streaks', v_row.id,
      jsonb_build_object('streak', v_row.current_count));
  end if;

  return query select v_row.current_count, v_row.longest_count, v_new;
end;
$$;

-- Internal engine functions must only run via our own triggers (which
-- execute as their SECURITY DEFINER owner) — never directly by a client.
revoke execute on function public.award_points(uuid, integer, text, text, uuid) from public, anon, authenticated;
revoke execute on function public.log_activity(uuid, text, text, uuid, jsonb) from public, anon, authenticated;
revoke execute on function public.check_achievements(uuid) from public, anon, authenticated;
revoke execute on function public.trg_review_activity() from public, anon, authenticated;
revoke execute on function public.trg_checkin_activity() from public, anon, authenticated;
revoke execute on function public.trg_saved_business_activity() from public, anon, authenticated;
revoke execute on function public.trg_product_scan_activity() from public, anon, authenticated;
revoke execute on function public.trg_donation_activity() from public, anon, authenticated;
revoke execute on function public.trg_suggestion_activity() from public, anon, authenticated;
revoke execute on function public.trg_community_post_activity() from public, anon, authenticated;
revoke execute on function public.bump_streak(text) from public, anon;
grant execute on function public.bump_streak(text) to authenticated;

-- ══════════════════════════════════════════════════════════════════
-- Triggers: auto-log + auto-award on real user actions (can't be bypassed)
-- ══════════════════════════════════════════════════════════════════

create or replace function public.trg_review_activity() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.status = 'published' then
    perform public.log_activity(new.user_id, 'review_written', 'business_reviews', new.id);
    perform public.award_points(new.user_id, 20, 'review_written', 'business_reviews', new.id);
  end if;
  return new;
end;
$$;
drop trigger if exists on_review_activity on public.business_reviews;
create trigger on_review_activity after insert on public.business_reviews
  for each row execute procedure public.trg_review_activity();

create or replace function public.trg_checkin_activity() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  perform public.log_activity(new.user_id, 'business_checkin', 'check_ins', new.id,
    jsonb_build_object('business_id', new.business_id));
  perform public.award_points(new.user_id, coalesce(new.coins_earned, 5), 'business_checkin', 'check_ins', new.id);
  return new;
end;
$$;
drop trigger if exists on_checkin_activity on public.check_ins;
create trigger on_checkin_activity after insert on public.check_ins
  for each row execute procedure public.trg_checkin_activity();

create or replace function public.trg_saved_business_activity() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  perform public.log_activity(new.user_id, 'business_saved', 'saved_businesses', new.id,
    jsonb_build_object('business_id', new.business_id));
  perform public.award_points(new.user_id, 2, 'business_saved', 'saved_businesses', new.id);
  return new;
end;
$$;
drop trigger if exists on_saved_business_activity on public.saved_businesses;
create trigger on_saved_business_activity after insert on public.saved_businesses
  for each row execute procedure public.trg_saved_business_activity();

create or replace function public.trg_product_scan_activity() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  perform public.log_activity(new.user_id, 'product_scanned', 'product_scans', new.id,
    jsonb_build_object('barcode', new.barcode));
  perform public.award_points(new.user_id, 3, 'product_scanned', 'product_scans', new.id);
  return new;
end;
$$;
drop trigger if exists on_product_scan_activity on public.product_scans;
create trigger on_product_scan_activity after insert on public.product_scans
  for each row execute procedure public.trg_product_scan_activity();

create or replace function public.trg_donation_activity() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.status = 'completed' and new.user_id is not null then
    perform public.log_activity(new.user_id, 'donation_made', 'business_donations', new.id,
      jsonb_build_object('amount', new.amount));
    perform public.award_points(new.user_id, 15, 'donation_made', 'business_donations', new.id);
  end if;
  return new;
end;
$$;
drop trigger if exists on_donation_activity on public.business_donations;
create trigger on_donation_activity after insert on public.business_donations
  for each row execute procedure public.trg_donation_activity();

create or replace function public.trg_suggestion_activity() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.user_id is not null then
    perform public.log_activity(new.user_id, 'business_suggested', 'suggestions', new.id);
    perform public.award_points(new.user_id, 10, 'business_suggested', 'suggestions', new.id);
  end if;
  return new;
end;
$$;
drop trigger if exists on_suggestion_activity on public.suggestions;
create trigger on_suggestion_activity after insert on public.suggestions
  for each row execute procedure public.trg_suggestion_activity();

create or replace function public.trg_community_post_activity() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  perform public.log_activity(new.author_id, 'community_post', 'community_posts', new.id);
  perform public.award_points(new.author_id, 5, 'community_post', 'community_posts', new.id);
  return new;
end;
$$;
drop trigger if exists on_community_post_activity on public.community_posts;
create trigger on_community_post_activity after insert on public.community_posts
  for each row execute procedure public.trg_community_post_activity();

-- ══════════════════════════════════════════════════════════════════
-- Seed: achievements (all backed by triggers above — nothing unreachable)
-- ══════════════════════════════════════════════════════════════════
insert into public.achievements (key, name, description, icon, event_type, threshold, points_reward, sort_order) values
  ('explorer',            'Explorer',            'Checked in to your first halal business',        'Compass',    'business_checkin',    1,  10, 1),
  ('regular',             'Regular',              'Checked in to 10 halal businesses',                'MapPin',     'business_checkin',    10, 40, 2),
  ('halal_supporter',     'Halal Supporter',      'Saved 5 businesses to support',                    'Heart',      'business_saved',      5,  20, 3),
  ('reviewer',            'Reviewer',             'Wrote your first review',                          'Star',       'review_written',      1,  15, 4),
  ('trusted_reviewer',    'Trusted Reviewer',     'Wrote 10 helpful reviews',                          'Award',      'review_written',      10, 60, 5),
  ('community_builder',   'Community Builder',    'Shared 5 posts with the community',                'Users',      'community_post',      5,  30, 6),
  ('knowledge_seeker',    'Knowledge Seeker',     'Scanned 10 products with Halal Check',             'ScanLine',   'product_scanned',     10, 30, 7),
  ('halal_champion',      'Halal Champion',       'Made your first charitable donation',              'HandHeart',  'donation_made',       1,  25, 8),
  ('business_ambassador', 'Business Ambassador',  'Suggested 3 new businesses to the directory',      'Megaphone',  'business_suggested',  3,  35, 9),
  ('streak_keeper',       'Streak Keeper',        'Kept a 7-day activity streak going',                'Flame',      'daily_checkin_streak',7,  50, 10)
on conflict (key) do nothing;

-- ══════════════════════════════════════════════════════════════════
-- Seed: faith content pool
-- ══════════════════════════════════════════════════════════════════
insert into public.faith_content (type, text_en, reference) values
  ('verse', 'Indeed, with hardship comes ease.', 'Qur''an 94:6'),
  ('verse', 'And whoever relies upon Allah - then He is sufficient for him.', 'Qur''an 65:3'),
  ('verse', 'Verily, in the remembrance of Allah do hearts find rest.', 'Qur''an 13:28'),
  ('verse', 'And your Lord says, "Call upon Me; I will respond to you."', 'Qur''an 40:60'),
  ('verse', 'So remember Me; I will remember you.', 'Qur''an 2:152'),
  ('verse', 'Allah does not burden a soul beyond that it can bear.', 'Qur''an 2:286'),
  ('verse', 'And He found you lost and guided you.', 'Qur''an 93:7'),
  ('verse', 'Indeed, Allah is with the patient.', 'Qur''an 2:153'),
  ('hadith', 'The best among you are those who have the best manners and character.', 'Sahih al-Bukhari'),
  ('hadith', 'None of you truly believes until he loves for his brother what he loves for himself.', 'Sahih al-Bukhari'),
  ('hadith', 'Smiling at your brother is charity.', 'Sunan al-Tirmidhi'),
  ('hadith', 'The strong person is not the one who overcomes people through strength, but the one who controls himself while in anger.', 'Sahih al-Bukhari'),
  ('hadith', 'Whoever believes in Allah and the Last Day should speak good or remain silent.', 'Sahih al-Bukhari'),
  ('hadith', 'Make things easy and do not make things difficult, cheer people up and do not scare them away.', 'Sahih al-Bukhari'),
  ('hadith', 'The most beloved deeds to Allah are those done regularly, even if small.', 'Sahih al-Bukhari'),
  ('quote', 'Patience is not the ability to wait, but the ability to keep a good attitude while waiting.', 'Islamic wisdom'),
  ('quote', 'A good deed is a light in this life and a light in the hereafter.', 'Islamic wisdom'),
  ('quote', 'Gratitude for the abundance you receive today is what attracts more abundance tomorrow.', 'Islamic wisdom'),
  ('dua', 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.', 'Qur''an 2:201'),
  ('dua', 'My Lord, expand for me my chest and ease for me my task.', 'Qur''an 20:25-26'),
  ('dua', 'Our Lord, pour upon us patience and let us die as Muslims in submission to You.', 'Qur''an 7:126')
on conflict do nothing;

-- Patch: review points match the pre-existing UI promise (25 base + 25 photo bonus)
create or replace function public.trg_review_activity() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_points integer;
begin
  if new.status = 'published' then
    v_points := 25 + (case when coalesce(array_length(new.images, 1), 0) > 0 then 25 else 0 end);
    perform public.log_activity(new.user_id, 'review_written', 'business_reviews', new.id);
    perform public.award_points(new.user_id, v_points, 'review_written', 'business_reviews', new.id);
  end if;
  return new;
end;
$$;
revoke execute on function public.trg_review_activity() from public, anon, authenticated;
