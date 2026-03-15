# Overwater.com

Fractional ownership of luxury glass-floor overwater cabanas — starting with Lina Point Resort in Belize and expanding worldwide.

**Live:** [overwater.com](https://overwater.com)

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS 4 + Framer Motion
- **Backend:** Supabase (Auth, DB, Analytics)
- **AI:** Grok (xAI) — AI Concierge chat
- **State:** Zustand
- **Deploy:** Vercel

## Getting Started

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Tests
npm test
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

Required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GROK_API_KEY`

See [.env.example](.env.example) for all variables.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── api/              # API routes (contact, newsletter, concierge, marketing)
│   ├── blog/             # Blog with dynamic [slug] routes
│   ├── own/              # Fractional ownership listings
│   ├── quiz/             # Soulful Escape quiz
│   ├── blueprint/        # Escape Blueprint results
│   ├── vision/           # Vision & story
│   └── contact/          # Contact form
├── components/           # Reusable UI components
│   ├── AIConcierge.tsx   # AI chat widget (dynamic import)
│   ├── Header.tsx        # Site navigation
│   ├── Footer.tsx        # Site footer
│   └── ...
└── lib/                  # Utilities & clients
    ├── supabase.ts       # Browser Supabase client
    ├── supabase-server.ts # Server Supabase client
    ├── data.ts           # Listing & comparison data
    └── analytics.ts      # Event tracking
```

## Database Migrations

Run in Supabase SQL Editor:

- `contact-migration.sql` — Contact inquiries table

## Part of the Overwater Ecosystem

- **[Lina Point](https://lina-point.vercel.app)** — Resort website (lina-point-nextjs)
- **[The Magic is You](https://magic.overwater.com)** — Maya Cosmic Blueprint (magic-is-you)
- **[Overwater.com](https://overwater.com)** — Fractional ownership platform (this repo)
