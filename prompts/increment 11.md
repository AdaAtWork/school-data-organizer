You are a senior full-stack engineer working inside my local codebase with Claude Code.

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
* Supabase Auth
* Supabase PostgreSQL
* Prisma
* Vercel

Already completed:

* Phase 0 project foundation
* Base Next.js app
* Styling and UI foundation
* Application shell navigation
* Supabase and Prisma baseline
* Testing baseline
* First Vercel deployment

Current increment:
Increment 1.1 — Add Supabase Authentication Screens

Goal:
Allow parents to register, log in, and log out.

In scope:

* Supabase Auth client/server helpers.
* Register screen.
* Login screen.
* Logout behavior.
* Basic validation.
* Friendly auth error messages.
* Session persistence after refresh.

Out of scope:

* Parent profile creation.
* Family workspace creation.
* Role management.
* Invite parent flow.
* Business database tables.
* Dashboard data.
* Permission-based routing beyond basic auth flow.
* Email templates.
* Password reset.
* Social login.

Expected files/modules:

* app/(auth)/
* modules/auth/
* lib/supabase/
* components/auth/

Important architecture rule:
Supabase Auth user is only the authentication identity.
Do not treat the Supabase Auth user as the complete application parent profile.
Parent profile creation will be implemented in a later increment.

Security requirements:

* Never expose service-role keys.
* Never put private secrets in client components.
* Use only public Supabase URL and anon key on the client.
* Do not use `NEXT_PUBLIC_` for private secrets.
* Do not hardcode credentials.
* Do not commit `.env`.

Claude Code workflow:
Before editing files:

1. Inspect the current project structure.
2. Inspect package.json.
3. Inspect existing environment variable files/templates.
4. Inspect any existing Supabase or Prisma helper files.
5. Propose a short implementation plan.
6. List the exact files you intend to create or modify.
7. Wait for my approval before making changes.

Implementation requirements:

* Use current recommended Supabase patterns for Next.js App Router.
* Keep the implementation simple.
* Prefer server actions where appropriate.
* Use existing shadcn/ui components where useful.
* Add only dependencies required for Supabase Auth.
* Do not add unnecessary form libraries unless clearly justified.
* Keep validation basic and understandable.
* Add user-friendly error messages for failed login/register.
* Add logout from the application shell/navigation if appropriate.
* Do not over-engineer middleware unless required for session persistence.
* Do not protect all routes yet unless that is the minimal correct Supabase App Router setup.
* Keep route names simple:

  * /login
  * /register

Acceptance criteria:

* Parent can register.
* Parent can log in.
* Parent can log out.
* Failed login shows a friendly error.
* Auth state persists after refresh.
* App still builds successfully.
* No secrets are committed.

Testing:

* Add or update tests only if practical and minimal.
* If adding an E2E test is fragile because it requires real Supabase credentials, explain why and provide a manual test checklist instead.
* Do not create complex mocks for this increment.

Please proceed in this order:

1. Inspect the project.
2. Propose the implementation plan.
3. List files to change.
4. Wait for my approval.
5. Implement only after approval.
6. Summarize all changes.
7. Tell me exact verification commands.
8. Give me a manual test checklist for register, login, logout, refresh persistence, and failed login.

Do not implement future increments.
Do not create parent profile logic.
Do not create business tables.
