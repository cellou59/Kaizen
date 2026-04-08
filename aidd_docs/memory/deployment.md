---
name: deployment
description: Infrastructure and deployment documentation
scope: all
---

# Deployment

## CI/CD Pipeline

Not set up yet.

## Deployment Process

Vercel (planned) - auto-deploy from Git on push.

# Infrastructure

## Environment Variables

### Environment Files

- `.env.local` - local dev, gitignored

### Required Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server only)

## URLs

- Dev: localhost:3000
- Prod: TBD (Vercel)
