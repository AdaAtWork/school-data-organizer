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
* Vitest
* Playwright
* Vercel

Already completed:

* Increment 1.1: Supabase authentication screens
* Increment 1.2: Protected app routes
* Increment 1.3: Parent profile and family workspace creation

Current increment:
Increment 1.4 — Add Current Family Authorization Helper

Goal:
Create reusable server-side helpers for current parent and family access.

Important domain rule:
Supabase Auth identifies the logged-in user.
Application authorization must use the application domain records:

* ParentUser
* Family
* FamilyMembership

In scope:

* Helper to get current authenticated parent.
* Helper to get current family.
* Helper to require authenticated parent.
* Helper to require active family membership.
* Standard unauthorized/not-found/forbidden error model.
* Basic tests for helper behavior.

Out of scope:

* Record-level authorization for every feature.
* Complex role permissions.
* Invite parent.
* Multiple-family switching.
* Child/homework/event/permission slip authorization.
* Admin roles.
* UI redesign.

Expected files/modules:

* modules/auth/
* modules/family/
* lib/auth/
* lib/errors/
* tests/

Critical security requirements:

* Helpers must fail closed.
* If no authenticated Supabase user exists, return/throw unauthorized.
* If no ParentUser exists, fail cleanly.
* If no active FamilyMembership exists, fail cleanly.
* Do not return family by email only.
* Use Supabase user ID as the identity link.
* Do not expose private database details to client components.
* Keep these helpers server-side only.
* Do not expose service-role keys.
* Do not hardcode secrets.
* Do not commit `.env`.

Architecture requirements:

* Centralize current parent/family lookup logic.
* Avoid duplicating auth/family lookup in future modules.
* Provide one primary helper that future feature modules can call to get current family context.
* Keep the helper names clear and boring.
* Keep the error model simple.
* Avoid over-engineering role permissions.
* Do not implement future authorization rules yet.

Suggested helper concepts:

* getCurrentParent()
* requireCurrentParent()
* getCurrentFamilyContext()
* requireCurrentFamilyContext()

But inspect the existing codebase first and choose names consistent with the project.

Claude Code workflow:
Before editing files:

1. Inspect the current project structure.
2. Inspect Prisma schema.
3. Inspect Supabase auth helpers.
4. Inspect parent/family modules from Increment 1.3.
5. Inspect existing tests and test setup.
6. Propose the implementation plan.
7. Propose helper names and return shapes.
8. Propose the error classes/types.
9. List exact files to create or modify.
10. Wait for my approval before making changes.

Testing requirements:

* Add unit tests for helper behavior where possible.
* Add integration-style tests for:

  * happy path: authenticated parent with active family membership
  * logged-out user fails cleanly
  * missing ParentUser fails cleanly
  * missing active membership fails cleanly
* If real Supabase session mocking is complex, explain the limitation and use clean dependency boundaries so the core family lookup behavior can still be tested.
* Do not create brittle tests.
* Do not require real production Supabase credentials in automated tests.

Acceptance criteria:

* Future feature modules can call one helper to get current parent/family context.
* Logged-out access fails cleanly.
* Missing parent fails cleanly.
* Missing membership fails cleanly.
* Tests cover happy path and failure paths where practical.
* App builds successfully.
* Existing auth/profile behavior still works.

Manual verification checklist should include:

* logged-out user cannot access protected app area
* logged-in user can access profile
* profile still displays current parent/family
* no duplicate parent/family records are created
* build succeeds
* tests pass

Please proceed in this order:

1. Inspect the project.
2. Propose the implementation plan.
3. Propose helper API and error model.
4. List exact files to change.
5. Wait for my approval.
6. Implement only after approval.
7. Summarize all changes.
8. Tell me exact test/build commands.
9. Provide manual verification steps.

Do not implement future increments.
Do not create child/homework/event/permission slip/attachment authorization yet.
Do not implement invite-parent logic.
Do not implement complex roles.
