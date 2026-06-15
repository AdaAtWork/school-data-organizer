You are a senior full-stack engineer helping me implement Increment 0.4.

I am a junior developer using Claude for my first AI-assisted project, so explain clearly what I need to do, where to do it, and why.

Project:
School Communication Organizer

Current stack:

* Next.js
* TypeScript
* React
* App Router
* pnpm
* Tailwind CSS
* shadcn/ui
* Supabase PostgreSQL
* Prisma

Already completed:

* Increment 0.1: Base Next.js app
* Increment 0.2: Tailwind CSS and shadcn/ui foundation
* Increment 0.3: Application shell navigation

Current increment:
Increment 0.4 — Configure Supabase and Prisma Baseline

Goal:
Connect the application to Supabase PostgreSQL through Prisma.

In scope:

* Install Prisma.
* Initialize Prisma.
* Configure Prisma for Supabase PostgreSQL.
* Add a minimal Prisma schema.
* Add `.env.example`.
* Add local `.env` guidance.
* Add a reusable Prisma client helper in `lib/db/`.
* Verify database connectivity.
* Update README with database setup instructions.

Out of scope:

* Supabase Auth.
* Supabase Storage.
* Business database schema.
* User, child, homework, event, permission slip, or attachment tables.
* Real app features.
* Seed data.
* Row-level security.
* Production deployment.
* Vercel environment variables.

Expected files/folders:

* prisma/schema.prisma
* lib/db/prisma.ts
* .env.example
* package.json
* README.md

Important security constraints:

* Never hardcode database credentials.
* Never commit `.env`.
* Only commit `.env.example`.
* Use placeholder values in `.env.example`.
* Clearly explain which Supabase connection string to use.
* Clearly distinguish private server-side variables from public `NEXT_PUBLIC_*` variables.
* Do not use `NEXT_PUBLIC_` for database credentials.
* Do not assume local PostgreSQL.
* Do not create production tables beyond a minimal connection test if needed.

Please provide:

1. Exact terminal commands to run.
2. Supabase dashboard steps:

   * where to find the PostgreSQL connection string
   * which connection string type to use for Prisma
   * what to copy into `.env`
3. Exact `.env.example` content.
4. Exact `schema.prisma` baseline content.
5. Exact `lib/db/prisma.ts` content.
6. README section to add.
7. Verification steps:

   * Prisma validates
   * Prisma can connect to Supabase
   * migration or db push smoke test works
   * app still builds
8. What I should check before committing.
9. Common mistakes to avoid.

Do not implement authentication.
Do not create business tables yet.
Do not implement future increments.
