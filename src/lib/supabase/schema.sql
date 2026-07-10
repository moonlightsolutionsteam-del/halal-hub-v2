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
