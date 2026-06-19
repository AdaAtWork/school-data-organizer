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

Current increment:
Increment 2.2 — Add Child

Goal:
Allow a logged-in parent to create a child profile.

Important domain rules:

* Children are application records, not authenticated users.
* Children must belong to the current authenticated parent’s family.
* The client must never choose or submit `familyId`.
* Family assignment must happen server-side using the current family authorization helper.
* A child profile should be minimal in this increment.

In scope:

* Add child form.
* Add create child server action or equivalent server-side mutation.
* Add basic validation.
* Save child to the current family.
* Redirect or return to children list after successful creation.
* Show created child in list.
* Add success/error handling.
* Add validation tests and create-child tests where practical.

Out of scope:

* Editing children.
* Archiving children.
* Child-specific dashboard.
* School/class/teacher fields.
* Child authentication.
* Homework.
* Events.
* Permission slips.
* Attachments.
* Complex profile fields.
* Client-provided family assignment.

Expected files/modules:

* modules/children/
* app/(app)/children/
* components/forms/
* tests/

Form requirements:

* First name is required.
* Last name is optional.
* Notes are optional if a notes field exists in the current model.
* Do not make date of birth required.
* Do not ask for school/class/teacher.
* Keep the form short and parent-friendly.
* Show clear validation errors.

Implementation requirements:

* Reuse current family authorization helper from Increment 1.4.
* Reuse existing child model and list query from Increment 2.1.
* Keep child creation server-side.
* Do not allow the client to pass `familyId`.
* After successful creation, the child should appear in the children list.
* Use shadcn/ui components where appropriate.
* Keep UI minimal.
* Do not add unnecessary dependencies.
* Do not implement future increments.

Claude Code workflow:
Before editing files:

1. Inspect the current project structure.
2. Inspect Prisma schema and Child model.
3. Inspect existing children module from Increment 2.1.
4. Inspect current family authorization helper.
5. Inspect current children page.
6. Inspect existing form/component patterns.
7. Inspect current test setup.
8. Propose the implementation plan.
9. Propose validation approach.
10. List exact files to create or modify.
11. Wait for my approval before making changes.

Acceptance criteria:

* Parent can add a child with first name.
* Last name is optional.
* Notes are optional if supported by the existing model.
* Invalid form shows a clear error.
* Child is saved to the current family.
* Created child appears in the children list.
* Logged-out users cannot create children.
* App builds successfully.
* Tests pass.

Testing requirements:

* Unit tests for validation.
* Integration-style test for create child behavior if practical.
* Verify family scoping:

  * created child uses current family
  * client cannot override familyId
* If full server action testing is complex, test the core create-child service function and explain the limitation.
* Do not require production Supabase credentials.
* Do not write brittle UI tests.

Security requirements:

* Never expose service-role keys.
* Never hardcode credentials.
* Never commit `.env`.
* Never accept `familyId` from client form input.
* Never create child records outside the current family.
* Keep database writes server-side.

Manual verification checklist:

* Login as a parent.
* Open Children page.
* Click Add Child.
* Submit empty form and verify validation error.
* Add child with first name only.
* Verify child appears in list.
* Add child with first and last name.
* Verify child belongs to current family in database.
* Verify no school/class fields were added.
* Verify build succeeds.
* Verify tests pass.

Please proceed in this order:

1. Inspect the project.
2. Propose the implementation plan.
3. Propose validation approach.
4. Propose server-side create-child flow.
5. List exact files to change.
6. Wait for my approval.
7. Implement only after approval.
8. Summarize all changes.
9. Tell me exact test/build commands.
10. Provide manual verification steps.

Do not implement future increments.
Do not create edit/archive flows.
Do not add school/class/teacher fields.
Do not add child authentication.
