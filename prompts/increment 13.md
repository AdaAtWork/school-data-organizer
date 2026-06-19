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

* Increment 1.1: Supabase authentication screens
* Increment 1.2: Protected app routes

Current increment:
Increment 1.3 — Create Parent Profile and Family Workspace

Goal:
Create application-specific parent and family records for authenticated users.

Important domain rule:
Supabase Auth user is only the authentication identity.
The application must create its own domain records:

* parent user
* family workspace
* family membership

In scope:

* Add Prisma models:

  * families
  * parent_users
  * family_memberships
* First parent becomes owner of their family workspace.
* Add idempotent logic to ensure:

  * parent profile exists
  * family workspace exists
  * owner membership exists
* Add a basic profile page that displays the current parent profile/family information.
* Add integration tests if practical.

Out of scope:

* Invite parent.
* Multiple families per account.
* Complex roles.
* Child management.
* Homework.
* Events.
* Permission slips.
* Attachments.
* Family switching.
* Role management beyond owner/member if minimally needed.

Expected files/modules:

* prisma/schema.prisma
* modules/profile/
* modules/family/
* modules/auth/
* lib/db/
* app/(app)/profile/

Critical implementation requirements:

* Use Supabase Auth user ID as the stable identity link.
* Do NOT use email as the only identity link.
* Add database constraints to prevent duplicate parent profiles.
* Add database constraints to prevent duplicate family memberships.
* Ensure re-login does not create duplicate parent/family/membership records.
* Ensure the logic is idempotent.
* Prefer a transaction for parent/family/membership creation if appropriate.
* Keep this limited to the first-family MVP model.
* Do not implement multiple-family support yet.
* Do not implement invite flow.
* Do not implement business feature tables.

Claude Code workflow:
Before editing files:

1. Inspect the current project structure.
2. Inspect Prisma schema.
3. Inspect auth helpers.
4. Inspect protected route logic.
5. Inspect profile route/page if it already exists.
6. Propose the implementation plan.
7. Propose Prisma model names, fields, constraints, and relationships.
8. List exact files to create or modify.
9. Explain migration strategy.
10. Wait for my approval before making changes.

Database requirements:
Create models that support:

* one authenticated Supabase user maps to one parent user for MVP
* one parent user initially owns one family
* a family can have memberships
* the first parent has an active owner membership

Suggested concepts:

* ParentUser
* Family
* FamilyMembership

Include fields such as:

* id
* supabaseUserId
* email
* displayName if available
* familyId
* role
* status
* createdAt
* updatedAt

But inspect the existing schema first and choose names consistent with the project.

Acceptance criteria:

* New registered parent gets exactly one parent profile.
* New registered parent gets exactly one family workspace.
* Parent has exactly one active owner membership.
* Re-login or refresh does not create duplicates.
* Profile page displays the current parent information.
* App builds successfully.
* Prisma migration succeeds.
* No secrets are committed.

Testing requirements:

* Add integration tests for first-login setup if practical.
* Add idempotency test if practical.
* If tests are difficult because they require Supabase Auth/session context, explain the limitation and provide a manual test checklist.
* Do not create fragile tests.

Manual verification checklist should include:

* register a new user
* login
* open profile page
* verify parent profile exists in database
* verify family exists in database
* verify owner membership exists in database
* logout and login again
* verify no duplicates were created

Security requirements:

* Never expose service-role keys.
* Never hardcode credentials.
* Never commit `.env`.
* Do not use private database URLs in client components.
* Keep all database writes server-side.

Please proceed in this order:

1. Inspect the project.
2. Propose the implementation plan.
3. Propose Prisma schema changes.
4. List exact files to change.
5. Wait for my approval.
6. Implement only after approval.
7. Summarize all changes.
8. Tell me exact migration/build/test commands.
9. Provide manual verification steps.

Do not implement future increments.
Do not create child/homework/event/permission slip/attachment tables yet.
Do not create invite-parent logic.
