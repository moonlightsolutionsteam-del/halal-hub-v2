# Halal Hub

A full-stack community platform for the global Muslim community — discover verified halal businesses, earn coins for check-ins, list your business, and connect with mosques and creators near you.

**Live:** [halal-hub-gamma.vercel.app](https://halal-hub-gamma.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Supabase (Postgres + Auth + Storage) |
| Auth | Supabase Auth — Google OAuth + Phone OTP |
| Deployment | Vercel |
| Monitoring | Sentry |

---

## Features

- **Business discovery** — browse 130+ verified halal businesses by category, map, and search
- **Check-in & earn coins** — check into any business to earn Halal Coins, enforced 1× per day per business via database constraint
- **Save businesses** — bookmark favourites
- **Partner onboarding** — multi-step form for businesses to list themselves (category → details → location → hours → contact → halal declaration → media)
- **Role-based access** — JWT-embedded roles (`consumer`, `business_owner`, `admin`, `super_admin`) enforced in Next.js middleware with no per-request DB query
- **Consumer dashboard** — coins balance, saved businesses, check-in history
- **Vendor dashboards** — per-category management panels (restaurant, butcher, catering, grocery, hotel, mosque, fashion, healthcare, and more)
- **Admin panel** — business review queue, user management, certifications, analytics
- **Suggest a place** — users can suggest unlisted mosques and businesses
- **Onboarding carousel** — 3-slide welcome flow before sign-in

---

## Getting Started

### Prerequisites

- Node.js 20+
- A Supabase project ([supabase.com](https://supabase.com))

### Local development

```bash
# Clone
git clone https://github.com/moonlightsolutionsteam-del/halal-hub-v2.git
cd halal-hub-v2

# Install dependencies
npm install

# Set up environment variables (see below)
cp .env.example .env.local

# Start the dev server
npm run dev
```

App runs at `http://localhost:9002`

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
NEXT_PUBLIC_APP_URL=http://localhost:9002
```

> **Never commit `.env.local`** — it is already in `.gitignore`.

For production, set these in your Vercel project's Environment Variables dashboard.

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── account/            # Authenticated user pages
│   ├── admin/              # Admin portal
│   ├── api/                # API route handlers
│   ├── auth/               # Auth callback handlers
│   ├── entities/[id]/      # Business detail page
│   ├── login/              # Login + onboarding carousel
│   ├── map/                # Business map
│   ├── partner/            # Partner onboarding flow
│   ├── search/             # Search results
│   └── vendor/             # Vendor dashboards (per category)
├── components/
│   ├── auth/               # Login form, OTP input
│   └── ui/                 # shadcn/ui primitives
├── context/
│   └── AuthContext.tsx     # Supabase auth state + UserProfile
├── hooks/
│   ├── use-auth.ts
│   └── use-businesses.ts   # Fetches businesses from Supabase
├── lib/
│   ├── supabase/           # client / server / middleware helpers
│   ├── onboarding-context  # Partner onboarding draft state
│   └── saved-businesses-context
└── supabase/
    └── functions/          # Supabase Edge Functions
```

---

## Database

Hosted on Supabase (PostgreSQL). Key tables:

| Table | Description |
|---|---|
| `businesses` | 136 verified halal businesses |
| `profiles` | Extended user data linked to `auth.users` |
| `check_ins` | One check-in per user per business per day |
| `suggestions` | User-submitted mosque/business suggestions |
| `claims` | Business claim requests |
| `feed_posts` | Community feed content |
| `creators` | Creator profiles |

Row-level security (RLS) is enabled on all tables.

---

## Auth

Authentication uses Supabase Auth with two providers:

- **Google OAuth** — one-tap sign-in
- **Phone OTP** — SMS verification

A custom JWT hook embeds user roles into the JWT `app_metadata`, enabling role-based route guards in Next.js middleware without a per-request database query.

---

## Deployment

The app is deployed on Vercel with automatic deployments on every push to `main`.

After deploying, set the following in Supabase → Authentication → URL Configuration:
- **Site URL**: your Vercel production URL
- **Redirect URLs**: `<your-url>/auth/callback` and `<your-url>/**`
