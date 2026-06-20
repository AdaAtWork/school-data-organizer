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

* Phase 1 authentication, parent profile, family workspace, and current family authorization helpers
* Increment 2.1: Child data model and empty children list
* Increment 2.2: Add child creation flow

Current increment:
Increment 2.3 — Edit Child

Goal:
Allow a logged-in parent to update child profile details.

Important domain rules:

* Children are application records, not authenticated users.
* Children belong to a family.
* A parent may only load and update children from their current family.
* The client may pass `childId`, but the server must validate that the child belongs to the current family.
* Never update a child by ID alone.

In scope:

* Child detail/edit page.
* Load child by ID within the current family.
* Update child action or server-side mutation.
* Validation.
* Safe not-found behavior for missing or inaccessible child.
* Update the children list so updated data is visible.

Out of scope:

* Archive/delete behavior.
* Child dashboard.
* Linked homework display.
* Linked events display.
* School/class/teacher fields.
* Child authentication.
* Analytics.
* Future feature placeholders.

Expected files/modules:

* modules/children/
* app/(app)/children/[childId]/
* components/forms/
* tests/

Implementation requirements:

* Reuse current family authorization helper from Increment 1.4.
* Reuse validation patterns from Increment 2.2.
* Reuse existing child form components where appropriate.
* Keep UI minimal.
* Do not duplicate family lookup logic.
* Do not allow client to pass or change `familyId`.
* Load child using both `childId` and current `familyId`.
* Update child using both `childId` and current `familyId`.
* Missing child and cross-family child access should use the same safe not-found behavior.
* Do not reveal whether another family’s child exists.
* Do not add unnecessary dependencies.

Validation requirements:

* First name remains required.
* Last name is optional.
* Notes are optional if supported by the existing model.
* Do not make date of birth required.
* Do not add school/class/teacher fields.

Claude Code workflow:
Before editing files:

1. Inspect the current project structure.
2. Inspect Prisma schema and Child model.
3. Inspect current children module.
4. Inspect create child flow from Increment 2.2.
5. Inspect current family authorization helper.
6. Inspect existing tests.
7. Propose the implementation plan.
8. Propose route structure for the edit/detail page.
9. Propose validation reuse strategy.
10. List exact files to create or modify.
11. Wait for my approval before making changes.

Acceptance criteria:

* Parent can edit child first name.
* Parent can edit child last name if present.
* Parent can edit child notes if supported by the current model.
* Parent cannot edit a child outside current family.
* Missing or inaccessible child shows safe not-found behavior.
* Updated data appears in the children list.
* App builds successfully.
* Tests pass.

Testing requirements:

* Unit validation tests.
* Integration-style test for update child behavior.
* Integration-style test that updating by child ID alone is not possible.
* Integration-style test for cross-family access denial if practical.
* If full server-action testing is complex, test the core update-child service function and explain the limitation.
* Do not require production Supabase credentials.
* Do not write brittle UI tests.

Manual verification checklist:

* Login as a parent.
* Create a child if needed.
* Open child edit/detail page.
* Submit empty first name and verify validation error.
* Update child first name.
* Update child optional fields if present.
* Return to children list.
* Verify updated data appears.
* Verify missing child URL shows safe not-found behavior.
* Verify build succeeds.
* Verify tests pass.

Security requirements:

* Never expose service-role keys.
* Never hardcode credentials.
* Never commit `.env`.
* Never accept `familyId` from client input.
* Never update child records outside the current family.
* Keep database writes server-side.

Please proceed in this order:

1. Inspect the project.
2. Propose the implementation plan.
3. Propose route/edit-page approach.
4. Propose validation reuse strategy.
5. Propose family-scoped update approach.
6. List exact files to change.
7. Wait for my approval.
8. Implement only after approval.
9. Summarize all changes.
10. Tell me exact test/build commands.
11. Provide manual verification steps.

Do not implement future increments.
Do not create archive/delete flows.
Do not add school/class/teacher fields.
Do not add child dashboard.
Do not add child authentication.
