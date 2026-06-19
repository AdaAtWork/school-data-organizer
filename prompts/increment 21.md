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

* Phase 0 foundation
* Phase 1 authentication, parent profile, family workspace, and family authorization helpers

Current increment:
Increment 2.1 — Child Data Model and Empty List

Goal:
Add the child profile data model and create the foundation of the children page.

Important domain rules:

* Children are application domain records.
* Children are NOT authenticated users.
* Children do NOT have login credentials.
* Children belong to a family.
* Every child must be family-scoped.
* Future features such as homework and events will be attached to children.

In scope:

* Add Child model to Prisma.
* Create and run Prisma migration.
* Add family-scoped child query.
* Create children list page.
* Show empty state when no children exist.
* Add tests for family-scoped querying where practical.

Out of scope:

* Create child form.
* Edit child form.
* Archive behavior.
* School integration.
* School/class/teacher tables.
* Homework.
* Events.
* Permission slips.
* Attachments.
* Child authentication.
* Child user accounts.

Expected files/modules:

* prisma/schema.prisma
* modules/children/
* app/(app)/children/
* tests/

Critical architecture requirements:

* Child records must be linked to Family.
* Child queries must always be family-scoped.
* Reuse the current family authorization helpers from Increment 1.4.
* Do not duplicate family lookup logic.
* Keep implementation minimal.
* This increment is about data model and list foundation only.
* Do not build CRUD functionality yet.

Database requirements:
Inspect the existing schema first.

Create a Child model consistent with the existing naming conventions.

Recommended fields (adjust if schema conventions require different names):

* id
* familyId
* firstName
* lastName
* preferredName (optional)
* birthDate (optional)
* isArchived
* createdAt
* updatedAt

Requirements:

* familyId is required.
* Child belongs to exactly one family.
* Add appropriate indexes.
* Support future archive filtering.
* Do not add school-specific fields yet.
* Do not add authentication-related fields.

Claude Code workflow:
Before editing files:

1. Inspect the current project structure.
2. Inspect Prisma schema.
3. Inspect family authorization helpers.
4. Inspect current children route/page.
5. Propose the implementation plan.
6. Propose Prisma schema changes.
7. Propose query structure.
8. List exact files to create or modify.
9. Explain migration strategy.
10. Wait for my approval before making changes.

Children page requirements:

* Use existing application shell.
* Query active children for the current family.
* If no children exist:

  * show a friendly empty state
  * explain that no children have been added yet
* Keep UI minimal.
* Use existing shadcn/ui components where appropriate.
* Do not add create/edit buttons unless needed for future navigation placeholders.

Testing requirements:

* Add migration verification if practical.
* Add integration-style test for family-scoped query.
* Verify that children from another family are never returned.
* Do not create brittle tests.
* Do not require production Supabase credentials.

Acceptance criteria:

* Child model exists in Prisma.
* Migration succeeds.
* Children page loads.
* Empty state appears when no children exist.
* Query is scoped to current family.
* App builds successfully.
* Tests pass.

Manual verification checklist:

* Login as a parent.
* Open Children page.
* Verify empty state appears.
* Verify no errors occur.
* Verify family scoping in query logic.
* Build succeeds.
* Tests pass.

Security requirements:

* Never expose service-role keys.
* Never hardcode credentials.
* Never commit .env.
* Never return children outside the current family.
* Use existing authorization helpers.

Please proceed in this order:

1. Inspect the project.
2. Propose the implementation plan.
3. Propose Prisma schema changes.
4. Propose family-scoped query approach.
5. List exact files to change.
6. Wait for my approval.
7. Implement only after approval.
8. Summarize all changes.
9. Tell me exact migration/build/test commands.
10. Provide manual verification steps.

Do not implement future increments.
Do not create child forms.
Do not create school integration placeholders.
Do not create child authentication.
Do not add school/class/teacher fields.
