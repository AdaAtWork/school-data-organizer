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
* Increment 1.1: Supabase authentication screens

  * register
  * login
  * logout
  * basic auth error handling
  * auth state persistence

Current increment:
Increment 1.2 — Protect App Routes

Goal:
Prevent logged-out users from accessing private app pages.

In scope:

* Protect the private app area under `app/(app)/`.
* Redirect logged-out users to `/login`.
* Redirect logged-in users away from `/login` and `/register`, if appropriate.
* Add safe loading/auth checking behavior where needed.
* Ensure refresh works on protected pages.
* Avoid redirect loops.

Out of scope:

* Family authorization.
* Record-level permissions.
* Parent roles.
* Parent profile creation.
* Business data permissions.
* Row-level security.
* Invite flows.
* Password reset.
* Social login.

Expected files/modules:

* app/(app)/
* app/(auth)/
* modules/auth/
* lib/supabase/
* middleware.ts or auth guard utilities, only if appropriate

Important architecture rules:

* Prefer server-side route protection where possible.
* Do not rely only on client-side checks for protected routes.
* Keep auth logic centralized; avoid duplicating the same auth check in every page.
* Do not confuse Supabase Auth user with the future application Parent Profile.
* Do not implement family/workspace authorization yet.
* Do not protect public auth pages in a way that creates redirect loops.

Security requirements:

* Never expose service-role keys.
* Never hardcode credentials.
* Never commit `.env`.
* Do not add private secrets to client components.
* Use existing Supabase client/server helpers from Increment 1.1 where possible.

Claude Code workflow:
Before editing files:

1. Inspect the current project structure.
2. Inspect the auth implementation from Increment 1.1.
3. Inspect existing Supabase helper utilities.
4. Inspect current app and auth layouts/routes.
5. Propose a short implementation plan.
6. List exact files you intend to create or modify.
7. Explain whether you recommend middleware, protected layout, server component checks, or a combination.
8. Wait for my approval before making changes.

Implementation requirements:

* Keep the solution minimal and idiomatic for Next.js App Router with Supabase Auth.
* Avoid over-engineering.
* Avoid duplicate auth checks.
* Avoid UI flicker where possible.
* Do not introduce unnecessary dependencies.
* Do not implement future increments.
* Ensure dashboard and other private app pages require authentication.
* Ensure `/login` and `/register` remain reachable when logged out.
* If logged in users visit `/login` or `/register`, redirect them to the dashboard only if this can be done safely without loops.

Acceptance criteria:

* Logged-out user cannot access dashboard or other private app pages.
* Logged-out user is redirected to `/login`.
* Logged-in user can access dashboard and other private app pages.
* Refreshing a protected page while logged in still works.
* Login/register pages work correctly.
* No infinite redirect loops.
* App still builds successfully.

Testing:

* Add or update tests only if practical and minimal.
* Add an E2E unauthorized redirect test if it can be reliable without needing real Supabase test credentials.
* If E2E auth testing would be brittle, explain why and provide a manual test checklist instead.

Please proceed in this order:

1. Inspect the project.
2. Propose the implementation plan.
3. List files to change.
4. Wait for my approval.
5. Implement only after approval.
6. Summarize all changes.
7. Tell me exact verification commands.
8. Give me a manual test checklist for:

   * logged-out access to dashboard
   * logged-in access to dashboard
   * refresh on protected page
   * logged-in access to login/register
   * failed redirect-loop scenarios

Do not implement future increments.
Do not create parent profile logic.
Do not create family authorization logic.
Do not create business tables.
