# Master Implementation Roadmap — School Communication Organizer MVP

## Selected MVP scope

This roadmap is based on the updated MVP scope:

* User Authentication
* Parent Profile
* Child Management
* Homework Management
* School Events
* Permission Slips
* Attachments
* Dashboard

Standalone **Teacher Management** is intentionally excluded from this roadmap. If teacher information is needed in Version 1, it should be handled as a simple optional text field inside homework or event records, not as a separate module.

---

# Part 1 — Delivery Strategy

## Recommended strategy

Use:

```text
Foundation First
+ Small Vertical Slices
+ Feature-Based Modular Development
+ Continuous Testing
```

## Why this is optimal for Claude-assisted development

Claude should work on one focused coding task at a time. Therefore, the roadmap must avoid increments that require Claude to understand the whole system at once.

The best strategy is:

1. **Build the foundation first**
   Authentication, database setup, layout, testing, and deployment must be stable before feature work begins.

2. **Build small vertical slices**
   Each feature should be implemented end-to-end in small steps: data model, basic list, create flow, edit flow, status behavior, then dashboard integration.

3. **Keep modules isolated**
   Each Claude conversation should focus on one module or one narrow part of a module.

4. **Avoid future partials**
   Do not create half-finished integrations, OCR, notifications, AI features, or teacher accounts.

5. **Test during each increment**
   Tests should be created while the feature is implemented, not after the MVP is complete.

## Architectural principle

The application should remain a **modular monolith**:

```text
One Next.js application
One database
One file storage system
Clear internal modules
No microservices
No distributed architecture
```

---

# Part 2 — Project Phases

## Phase 0 — Project Foundation

### Objective

Create the technical base of the application.

### Expected outcome

A deployed application shell with project structure, UI foundation, database connection, testing setup, and deployment pipeline.

### Dependencies

None.

### Completion criteria

* App runs locally.
* App builds successfully.
* App deploys to Vercel.
* Supabase and Prisma are configured.
* Basic test commands work.
* Placeholder app shell exists.

---

## Phase 1 — Authentication and Family Workspace

### Objective

Allow a parent to register, log in, and access a private family workspace.

### Expected outcome

A parent can authenticate and enter a protected dashboard area tied to a family workspace.

### Dependencies

Phase 0.

### Completion criteria

* Register/login/logout work.
* Protected pages are inaccessible when logged out.
* Parent profile exists.
* Family workspace exists.
* Current user/family lookup works.

---

## Phase 2 — Child Management

### Objective

Allow parents to manage children as profiles, not users.

### Expected outcome

A parent can create, view, edit, and archive child profiles.

### Dependencies

Phase 1.

### Completion criteria

* Parent can add child.
* Parent can view child list.
* Parent can edit child.
* Parent can archive child.
* Children are scoped to the current family.

---

## Phase 3 — Homework Management

### Objective

Allow parents to track homework for one or more children.

### Expected outcome

A parent can create homework, link it to children, track completion per child, and see overdue/due soon items.

### Dependencies

Phase 2.

### Completion criteria

* Parent can create homework.
* Homework can be linked to one or multiple children.
* Completion is tracked per child.
* Homework can be edited.
* Homework can be archived/deleted.
* Due soon and overdue logic works.

---

## Phase 4 — School Events

### Objective

Allow parents to track school events and parent meetings.

### Expected outcome

A parent can create, view, edit, and cancel/archive events linked to one or more children.

### Dependencies

Phase 2.

### Completion criteria

* Parent can create event.
* Event can target one or multiple children.
* Parent meetings are represented as event type `meeting`.
* Upcoming events can be queried.
* Cancelled/archived events are handled.

---

## Phase 5 — Permission Slips

### Objective

Allow parents to track permission slips and form deadlines.

### Expected outcome

A parent can create permission slips, link them to children, track status, and see pending/due slips.

### Dependencies

Phase 2.

### Completion criteria

* Parent can create permission slip.
* Permission slip can target one or multiple children.
* Status can be updated.
* Submitted date is tracked.
* Pending and overdue slips are visible.

---

## Phase 6 — Attachments and School Documents

### Objective

Allow parents to upload and manage files.

### Expected outcome

A parent can upload files, store file metadata, and link files to homework, events, or permission slips.

### Dependencies

Phases 3, 4, and 5 for record linking.

### Completion criteria

* File upload works.
* File metadata is stored.
* File access is private.
* Attachments can be linked to supported record types.
* Attachments can be safely unlinked.
* Deletion rules are enforced.

---

## Phase 7 — Dashboard

### Objective

Create the main parent-facing planning view.

### Expected outcome

After login, the parent can immediately see what needs attention.

### Dependencies

Phases 3, 4, 5, and ideally 6.

### Completion criteria

* Dashboard shows homework due soon.
* Dashboard shows overdue homework.
* Dashboard shows upcoming events.
* Dashboard shows pending permission slips.
* Dashboard supports child filtering.
* Dashboard has quick actions.

---

## Phase 8 — MVP Hardening and Portfolio Readiness

### Objective

Stabilize, test, document, and prepare the MVP for portfolio use.

### Expected outcome

A usable deployed MVP with tests, clean UX states, demo data, and documentation.

### Dependencies

All previous phases.

### Completion criteria

* Production deployment works.
* Critical flows are covered by tests.
* Error states are handled.
* Empty states are helpful.
* README is complete.
* Known limitations are documented.

---

# Part 3 — Implementation Increments

Each increment below is designed to fit into one focused Claude coding session.

---

# Phase 0 — Project Foundation

## Increment 0.1 — Create Project Repository and Base App

### Goal

Create the initial Next.js TypeScript application.

### Prerequisites

None.

### Scope

In scope:

* Create project repository.
* Create Next.js app.
* Add TypeScript.
* Add basic folder structure.
* Add README skeleton.

Out of scope:

* Authentication.
* Database.
* Real app pages.
* Styling polish.

### Files or Modules Expected to Change

```text
package.json
README.md
app/
components/
lib/
```

### Tasks

* Initialize project.
* Configure TypeScript.
* Add basic scripts.
* Create initial folder structure.
* Add README with local start instructions.

### Deliverables

* Running local app.
* Initial repository.
* README skeleton.

### Acceptance Criteria

* App starts locally.
* TypeScript compiles.
* Build succeeds.
* README explains how to run the app.

### Testing Requirements

* Manual local run.
* Manual build test.

### Risks

* Adding unnecessary tools too early.
* Starting with a complex folder structure.

### AI Guidance

Claude can safely generate:

* folder structure proposal
* README draft
* setup checklist

Developer must carefully review:

* package versions
* project scripts
* unnecessary dependencies

Common AI mistakes:

* adding libraries not yet needed
* creating premature abstractions
* generating feature folders with fake implementation

---

## Increment 0.2 — Add Styling and UI Foundation

### Goal

Set up Tailwind CSS and shadcn/ui foundation.

### Prerequisites

Increment 0.1.

### Scope

In scope:

* Tailwind setup.
* shadcn/ui setup.
* Basic shared UI components.
* Global layout foundation.

Out of scope:

* Final branding.
* Complex themes.
* Feature-specific components.

### Files or Modules Expected to Change

```text
app/layout.*
app/globals.*
components/ui/
tailwind config
shadcn config
```

### Tasks

* Configure Tailwind.
* Configure shadcn/ui.
* Add basic button/card/form components as needed.
* Ensure styling works in the app shell.

### Deliverables

* Styled base app.
* UI component foundation.

### Acceptance Criteria

* Tailwind classes work.
* shadcn components render.
* App still builds successfully.

### Testing Requirements

* Manual visual smoke test.
* Build test.

### Risks

* Spending too much time on UI styling.
* Adding many UI components before they are needed.

### AI Guidance

Claude can safely generate:

* layout skeleton
* component usage examples
* basic styling setup checklist

Developer must review:

* whether generated components are actually used
* consistency with shadcn conventions

Common AI mistakes:

* creating custom UI components instead of using shadcn
* over-designing the theme
* adding unnecessary animation libraries

---

## Increment 0.3 — Create Application Shell Navigation

### Goal

Create placeholder navigation for the MVP modules.

### Prerequisites

Increment 0.2.

### Scope

In scope:

* App shell.
* Placeholder pages.
* Main navigation.
* Mobile-friendly navigation foundation.

Out of scope:

* Real data.
* Auth protection.
* Dashboard logic.

### Files or Modules Expected to Change

```text
app/(app)/
components/layout/
components/navigation/
```

### Tasks

* Create placeholder pages:

  * Dashboard
  * Children
  * Homework
  * Events
  * Permission Slips
  * Attachments
  * Profile/Settings
* Add sidebar or top-level navigation.
* Add mobile navigation placeholder if simple.

### Deliverables

* Navigable application shell.
* Placeholder screens.

### Acceptance Criteria

* User can navigate between placeholder pages.
* App builds successfully.
* No real feature logic exists yet.

### Testing Requirements

* Manual navigation test.
* Build test.

### Risks

* Building complex navigation too early.
* Adding pages outside MVP scope.

### AI Guidance

Claude can safely generate:

* layout components
* placeholder page text
* navigation labels

Developer must review:

* route naming
* MVP scope alignment
* mobile usability basics

Common AI mistakes:

* adding teacher management route
* adding school/class routes
* adding notification pages too early

---

## Increment 0.4 — Configure Supabase and Prisma Baseline

### Goal

Connect the application to Supabase PostgreSQL through Prisma.

### Prerequisites

Increment 0.1.

### Scope

In scope:

* Supabase project connection.
* Prisma setup.
* Initial database connection.
* Environment variable template.

Out of scope:

* Full schema.
* Auth integration.
* Business tables beyond foundational placeholders if needed.

### Files or Modules Expected to Change

```text
prisma/
lib/db/
.env.example
package.json
README.md
```

### Tasks

* Install and configure Prisma.
* Configure Supabase database connection.
* Add environment variable template.
* Create minimal Prisma setup.
* Verify database connectivity.

### Deliverables

* Prisma configured.
* Database connection works.
* `.env.example` documented.

### Acceptance Criteria

* Prisma can connect to Supabase database.
* App build works.
* No secrets are committed.

### Testing Requirements

* Manual database connection test.
* Migration command smoke test.
* Build test.

### Risks

* Exposing database credentials.
* Using production database accidentally.
* Misconfigured connection pooling.

### AI Guidance

Claude can safely generate:

* Prisma setup checklist
* `.env.example` draft
* README database setup instructions

Developer must review:

* connection strings
* secrets
* Supabase project settings

Common AI mistakes:

* hardcoding secrets
* mixing public and private environment variables
* assuming local PostgreSQL instead of Supabase

---

## Increment 0.5 — Add Testing Baseline

### Goal

Add minimal automated testing infrastructure.

### Prerequisites

Increment 0.1.

### Scope

In scope:

* Vitest setup.
* One sample unit test.
* Playwright setup.
* One smoke E2E test.

Out of scope:

* Full test suite.
* Feature-specific tests.

### Files or Modules Expected to Change

```text
tests/
playwright config
vitest config
package.json
README.md
```

### Tasks

* Configure Vitest.
* Configure Playwright.
* Add sample unit test.
* Add smoke E2E test for app loading.
* Document test commands.

### Deliverables

* Test setup.
* Test scripts.
* Testing instructions.

### Acceptance Criteria

* Unit test command runs.
* E2E test command runs.
* Smoke test passes.
* Build still succeeds.

### Testing Requirements

This increment creates the testing foundation.

### Risks

* Brittle E2E test setup.
* Overcomplicated testing configuration.

### AI Guidance

Claude can safely generate:

* basic test setup
* smoke test
* README testing instructions

Developer must review:

* test reliability
* unnecessary test dependencies
* whether tests run in local environment

Common AI mistakes:

* writing tests against components that do not exist
* relying on unstable CSS selectors
* adding excessive test utilities

---

## Increment 0.6 — First Vercel Deployment

### Goal

Deploy the application shell.

### Prerequisites

Increments 0.1 through 0.4.

### Scope

In scope:

* Vercel deployment.
* Environment configuration.
* Production smoke test.
* Deployment documentation.

Out of scope:

* Production-ready data.
* Production auth.
* Production monitoring.

### Files or Modules Expected to Change

```text
README.md
deployment notes
environment configuration
```

### Tasks

* Create Vercel project.
* Configure environment variables.
* Deploy app.
* Verify deployment.
* Document deployment steps.

### Deliverables

* Live app shell.
* Deployment notes.

### Acceptance Criteria

* Production URL loads.
* Build succeeds on Vercel.
* No secrets are exposed.
* README includes deployment instructions.

### Testing Requirements

* Manual production smoke test.
* Build verification.

### Risks

* Missing environment variables.
* Exposing private keys.
* Connecting to wrong database.

### AI Guidance

Claude can safely generate:

* deployment checklist
* README deployment section
* smoke test checklist

Developer must carefully review:

* Vercel environment variables
* Supabase keys
* production/development separation

Common AI mistakes:

* suggesting service-role keys in client code
* not distinguishing public and private variables
* skipping production smoke testing

---

# Phase 1 — Authentication and Family Workspace

## Increment 1.1 — Add Supabase Authentication Screens

### Goal

Allow parents to register, log in, and log out.

### Prerequisites

Phase 0.

### Scope

In scope:

* Register screen.
* Login screen.
* Logout action.
* Basic auth error messages.

Out of scope:

* Parent profile creation.
* Family workspace creation.
* Role management.
* Invite parent flow.

### Files or Modules Expected to Change

```text
app/(auth)/
modules/auth/
lib/supabase/
components/auth/
```

### Tasks

* Configure Supabase Auth client/server helpers.
* Add register form.
* Add login form.
* Add logout behavior.
* Add basic validation and error handling.

### Deliverables

* Register flow.
* Login flow.
* Logout flow.

### Acceptance Criteria

* Parent can register.
* Parent can log in.
* Parent can log out.
* Failed login shows friendly error.
* Auth state persists after refresh.

### Testing Requirements

* Manual register test.
* Manual login/logout test.
* E2E test for login happy path if practical.

### Risks

* Confusing Supabase auth user with app parent profile.
* Poor session handling.
* Exposing secrets.

### AI Guidance

Claude can safely generate:

* auth forms
* validation messages
* basic auth flow code
* E2E test draft

Developer must carefully review:

* Supabase client/server usage
* session handling
* environment variable use

Common AI mistakes:

* treating auth user as complete application user
* skipping server-side auth checks
* exposing service-role keys

---

## Increment 1.2 — Protect App Routes

### Goal

Prevent logged-out users from accessing private app pages.

### Prerequisites

Increment 1.1.

### Scope

In scope:

* Protected app layout.
* Redirect logged-out users to login.
* Redirect logged-in users away from auth pages if appropriate.
* Loading/auth checking states.

Out of scope:

* Family authorization.
* Record-level permissions.
* Parent roles.

### Files or Modules Expected to Change

```text
app/(app)/
app/(auth)/
modules/auth/
middleware or auth guard utilities
```

### Tasks

* Add protected route logic.
* Add unauthenticated redirect.
* Add authenticated redirect behavior.
* Add loading state where needed.

### Deliverables

* Protected private app.
* Public auth area.

### Acceptance Criteria

* Logged-out user cannot access dashboard.
* Logged-in user can access dashboard.
* Refreshing protected pages works.
* No infinite redirect loops.

### Testing Requirements

* Manual logged-out access test.
* Manual logged-in refresh test.
* E2E unauthorized redirect test.

### Risks

* Redirect loops.
* Flickering protected content.
* Inconsistent auth state.

### AI Guidance

Claude can safely generate:

* route protection pattern
* redirect tests
* loading state handling

Developer must carefully review:

* server/client auth boundary
* middleware behavior
* redirect logic

Common AI mistakes:

* protecting only client-side routes
* causing infinite redirects
* duplicating auth logic everywhere

---

## Increment 1.3 — Create Parent Profile and Family Workspace

### Goal

Create application-specific parent and family records for authenticated users.

### Prerequisites

Increments 1.1 and 1.2.

### Scope

In scope:

* `families`
* `parent_users`
* `family_memberships`
* First parent becomes owner.
* Idempotent profile/workspace creation.

Out of scope:

* Invite parent.
* Multiple families per account.
* Complex roles.

### Files or Modules Expected to Change

```text
prisma/schema
modules/profile/
modules/family/
modules/auth/
lib/db/
```

### Tasks

* Add foundational tables to Prisma.
* Create migration.
* Add logic to ensure parent profile exists.
* Add logic to ensure family workspace exists.
* Add owner membership.
* Add basic profile page.

### Deliverables

* Parent profile.
* Family workspace.
* Membership record.
* Basic profile screen.

### Acceptance Criteria

* New registered parent gets one parent profile.
* New parent gets one family workspace.
* Parent has active owner membership.
* Re-login does not create duplicates.
* Profile page displays current parent.

### Testing Requirements

* Integration test for first-login setup.
* Integration test for idempotency.
* Manual database verification.

### Risks

* Duplicate family creation.
* Duplicate parent profile creation.
* Incorrect mapping between Supabase user and parent profile.

### AI Guidance

Claude can safely generate:

* Prisma schema draft
* idempotency tests
* profile page skeleton

Developer must carefully review:

* database constraints
* idempotent logic
* auth-user-to-parent mapping

Common AI mistakes:

* using email as the only identity link
* creating duplicate families on every login
* skipping unique constraints

---

## Increment 1.4 — Add Current Family Authorization Helper

### Goal

Create reusable helpers for current parent and family access.

### Prerequisites

Increment 1.3.

### Scope

In scope:

* Current parent lookup.
* Current family lookup.
* Require authenticated parent helper.
* Require active family membership helper.

Out of scope:

* Record-level authorization for every feature.
* Complex role permissions.
* Invite parent.

### Files or Modules Expected to Change

```text
modules/auth/
modules/family/
lib/auth/
lib/errors/
tests/
```

### Tasks

* Add helper to get current authenticated parent.
* Add helper to get current family.
* Add standard unauthorized/not found errors.
* Add tests for helper behavior.

### Deliverables

* Reusable auth/family helper.
* Basic error model.

### Acceptance Criteria

* Feature modules can call one helper to get current family context.
* Logged-out access fails cleanly.
* Missing membership fails cleanly.
* Tests cover happy path and failure path.

### Testing Requirements

* Unit tests for helper behavior.
* Integration test for missing/active membership.
* Manual test while logged out.

### Risks

* Scattered authorization logic later.
* Cross-family data access.
* Overcomplicated role system.

### AI Guidance

Claude can safely generate:

* helper function structure
* unit tests
* error naming suggestions

Developer must carefully review:

* security behavior
* family scoping
* server-only usage

Common AI mistakes:

* returning family by user email only
* failing open when membership is missing
* exposing too much error detail

---

# Phase 2 — Child Management

## Increment 2.1 — Child Data Model and Empty List

### Goal

Add child profile data model and children page foundation.

### Prerequisites

Phase 1.

### Scope

In scope:

* `children` table.
* Children page.
* Empty state.
* Family-scoped list query.

Out of scope:

* Add form.
* Edit form.
* Archive behavior.

### Files or Modules Expected to Change

```text
prisma/schema
modules/children/
app/(app)/children/
tests/
```

### Tasks

* Add child model to Prisma.
* Run migration.
* Create children list page.
* Query active children for current family.
* Add empty state.

### Deliverables

* Child database model.
* Children list page.
* Empty state.

### Acceptance Criteria

* Children page loads.
* Empty state appears when there are no children.
* Query is scoped to current family.
* App builds successfully.

### Testing Requirements

* Migration test.
* Integration test for family-scoped child query.
* Manual empty state test.

### Risks

* Treating children as users.
* Missing family scoping.
* Overbuilding child profile early.

### AI Guidance

Claude can safely generate:

* Prisma model draft
* empty state text
* list page skeleton
* query tests

Developer must review:

* child is not linked to authentication
* family_id requirement
* active/archived filtering

Common AI mistakes:

* adding user credentials to child
* adding school/class fields
* creating school integration placeholders

---

## Increment 2.2 — Add Child

### Goal

Allow parent to create a child profile.

### Prerequisites

Increment 2.1.

### Scope

In scope:

* Add child form.
* Create child action.
* Basic validation.
* Return to children list.

Out of scope:

* Editing.
* Archiving.
* Child-specific dashboard.

### Files or Modules Expected to Change

```text
modules/children/
app/(app)/children/
components/forms/
tests/
```

### Tasks

* Add create child form.
* Validate required fields.
* Save child to current family.
* Show created child in list.
* Add success/error handling.

### Deliverables

* Add child flow.

### Acceptance Criteria

* Parent can add child with first name.
* Last name and notes are optional.
* Child belongs to current family.
* Created child appears in list.
* Invalid form shows clear error.

### Testing Requirements

* Unit tests for validation.
* Integration test for create child.
* Manual create child test.

### Risks

* Too many required fields.
* Cross-family assignment.
* Poor validation messages.

### AI Guidance

Claude can safely generate:

* form component
* validation schema
* create action
* tests

Developer must review:

* family assignment
* authorization check
* required vs optional fields

Common AI mistakes:

* asking for school/class
* making date of birth required
* allowing client to pass family_id directly

---

## Increment 2.3 — Edit Child

### Goal

Allow parent to update child profile details.

### Prerequisites

Increment 2.2.

### Scope

In scope:

* Child detail or edit page.
* Update child action.
* Validation.
* Family authorization.

Out of scope:

* Archive/delete.
* Child dashboard.
* Linked homework/events display.

### Files or Modules Expected to Change

```text
modules/children/
app/(app)/children/[childId]/
components/forms/
tests/
```

### Tasks

* Add child detail/edit page.
* Load child by ID within current family.
* Add update form.
* Save updates.
* Show not-found behavior for inaccessible child.

### Deliverables

* Edit child flow.

### Acceptance Criteria

* Parent can edit child name and notes.
* Parent cannot edit child outside current family.
* Missing child shows safe not-found behavior.
* Updated data appears in list.

### Testing Requirements

* Unit validation tests.
* Integration test for update child.
* Integration test for cross-family access denial if practical.
* Manual edit test.

### Risks

* Trusting child ID from frontend.
* Leaking existence of another family’s child.
* Overcomplicating child detail.

### AI Guidance

Claude can safely generate:

* edit form
* update logic
* not-found tests

Developer must review:

* family-scoped lookup
* not-found behavior
* validation consistency

Common AI mistakes:

* updating by child ID only
* skipping current family check
* adding unrelated child analytics

---

## Increment 2.4 — Archive Child

### Goal

Allow parent to archive a child without hard deleting historical data.

### Prerequisites

Increment 2.3.

### Scope

In scope:

* Archive action.
* Hide archived children from default lists.
* Basic confirmation.

Out of scope:

* Restore archived child.
* Permanent delete.
* Complex data retention UI.

### Files or Modules Expected to Change

```text
modules/children/
app/(app)/children/
tests/
```

### Tasks

* Add archive status field if not already present.
* Add archive action.
* Exclude archived children from default list.
* Add confirmation copy.

### Deliverables

* Archive child behavior.

### Acceptance Criteria

* Parent can archive child.
* Archived child disappears from active list.
* Existing records are not deleted.
* App remains stable after archive.

### Testing Requirements

* Unit test for active-child filtering.
* Integration test for archive action.
* Manual archive test.

### Risks

* Hard deleting child.
* Breaking linked records later.
* Not handling child filters after archive.

### AI Guidance

Claude can safely generate:

* archive action
* confirmation message
* filtering tests

Developer must review:

* no hard delete
* relationship safety
* query filters

Common AI mistakes:

* deleting child row
* cascading deletes
* removing linked records

---

# Phase 3 — Homework Management

## Increment 3.1 — Homework Data Model and Empty List

### Goal

Add homework tables and the homework list foundation.

### Prerequisites

Phase 2.

### Scope

In scope:

* `homework`
* `homework_children`
* Empty homework list.
* Family-scoped query.

Out of scope:

* Create homework.
* Edit homework.
* Completion updates.
* Attachments.

### Files or Modules Expected to Change

```text
prisma/schema
modules/homework/
app/(app)/homework/
tests/
```

### Tasks

* Add homework tables to Prisma.
* Add migration.
* Create homework list page.
* Query homework for current family.
* Add empty state.

### Deliverables

* Homework data model.
* Empty homework list page.

### Acceptance Criteria

* Homework page loads.
* Empty state appears.
* Query is family-scoped.
* Database migration succeeds.

### Testing Requirements

* Migration test.
* Unit tests for status constants if used.
* Integration test for empty homework query.

### Risks

* Modeling homework completion incorrectly.
* Adding recurrence complexity too early.

### AI Guidance

Claude can safely generate:

* Prisma schema draft
* list page skeleton
* empty state copy

Developer must carefully review:

* `homework_children` model
* per-child completion design
* family_id placement

Common AI mistakes:

* adding one global completed field only
* adding full recurrence engine
* adding teacher management dependency

---

## Increment 3.2 — Add Homework

### Goal

Allow parent to create homework linked to one or more children.

### Prerequisites

Increment 3.1 and active children.

### Scope

In scope:

* Add homework form.
* Select children.
* Optional due date.
* Optional notes.
* Optional teacher/source text field.
* Create homework-child status records.

Out of scope:

* Attachments.
* Recurrence.
* Edit.
* Completion updates.

### Files or Modules Expected to Change

```text
modules/homework/
app/(app)/homework/
components/forms/
tests/
```

### Tasks

* Build add homework form.
* Load active children.
* Validate title and at least one child.
* Create homework.
* Create one `homework_children` record per selected child.
* Default completion status to `not_started`.

### Deliverables

* Add homework flow.

### Acceptance Criteria

* Parent can create homework.
* Title is required.
* At least one child is required.
* Homework appears in list.
* Each selected child receives a status record.
* Children must belong to current family.

### Testing Requirements

* Unit validation tests.
* Integration test for create homework.
* Integration test for multiple children.
* Manual add homework test.

### Risks

* Cross-family child linking.
* Missing child status records.
* Overly large form.

### AI Guidance

Claude can safely generate:

* form component
* validation schema
* create action
* test cases

Developer must carefully review:

* transaction behavior
* child-family validation
* default status creation

Common AI mistakes:

* trusting child IDs from client without checking family
* creating homework without child statuses
* adding attachments prematurely

---

## Increment 3.3 — Homework Detail

### Goal

Show homework details and per-child completion statuses.

### Prerequisites

Increment 3.2.

### Scope

In scope:

* Homework detail page.
* Display linked children.
* Display completion status per child.
* Display due date and notes.

Out of scope:

* Edit homework.
* Change completion status.
* Attachments.

### Files or Modules Expected to Change

```text
modules/homework/
app/(app)/homework/[homeworkId]/
tests/
```

### Tasks

* Add homework detail route.
* Load homework by ID within current family.
* Show linked children and statuses.
* Add safe not-found behavior.

### Deliverables

* Homework detail view.

### Acceptance Criteria

* Parent can open homework detail.
* Linked children are visible.
* Each child’s status is visible.
* Parent cannot access homework from another family.

### Testing Requirements

* Integration test for detail query.
* Manual detail page test.
* Not-found manual test.

### Risks

* Loading homework by ID only.
* Confusing per-child status display.
* Overbuilding detail page.

### AI Guidance

Claude can safely generate:

* detail page layout
* query helper
* test cases

Developer must review:

* family-scoped query
* status display accuracy
* not-found behavior

Common AI mistakes:

* showing global completion only
* adding edit controls before edit increment
* leaking inaccessible records

---

## Increment 3.4 — Mark Homework Complete Per Child

### Goal

Allow parent to update completion status for each child independently.

### Prerequisites

Increment 3.3.

### Scope

In scope:

* Status update action.
* Per-child status controls.
* `completed_at` behavior.
* Update list/detail display.

Out of scope:

* Bulk complete all children.
* Attachments.
* Recurrence.

### Files or Modules Expected to Change

```text
modules/homework/
app/(app)/homework/
app/(app)/homework/[homeworkId]/
tests/
```

### Tasks

* Add status update action.
* Allow statuses:

  * `not_started`
  * `in_progress`
  * `completed`
* Set `completed_at` when completed.
* Clear or reset `completed_at` if moved away from completed.
* Update UI.

### Deliverables

* Per-child completion behavior.

### Acceptance Criteria

* Completing homework for one child does not complete it for another.
* Completed status records completed date.
* Parent can change status back if needed.
* List/detail show correct status.

### Testing Requirements

* Unit tests for completion rules.
* Integration test for single child status update.
* Integration test for multi-child homework.
* Manual test with two children.

### Risks

* Accidentally implementing global completion.
* Incorrect completed_at behavior.
* Confusing UI.

### AI Guidance

Claude can safely generate:

* status update action
* status UI controls
* tests for multi-child status

Developer must carefully review:

* per-child update condition
* completed_at rule
* authorization check

Common AI mistakes:

* updating all child statuses together
* not checking homework belongs to family
* not checking child status belongs to homework

---

## Increment 3.5 — Edit Homework

### Goal

Allow parent to edit homework fields and linked children.

### Prerequisites

Increment 3.4.

### Scope

In scope:

* Edit title, notes, due date, source/teacher text.
* Add/remove linked children.
* Preserve existing child statuses where possible.

Out of scope:

* Attachments.
* Recurrence.
* Delete/archive.

### Files or Modules Expected to Change

```text
modules/homework/
app/(app)/homework/[homeworkId]/edit/
components/forms/
tests/
```

### Tasks

* Add edit homework form.
* Load existing homework.
* Update homework fields.
* Add status rows for newly linked children.
* Remove or deactivate child links for removed children.
* Preserve statuses for unchanged children.

### Deliverables

* Edit homework flow.

### Acceptance Criteria

* Parent can edit homework.
* Adding a child creates default status.
* Removing a child removes that child from the homework.
* Existing child completion statuses are preserved.
* Cross-family child links are rejected.

### Testing Requirements

* Integration test for edit fields.
* Integration test for add child to homework.
* Integration test for remove child from homework.
* Manual edit test.

### Risks

* Resetting completion status accidentally.
* Complex child link update logic.
* Overbuilding editing UX.

### AI Guidance

Claude can safely generate:

* edit form
* update action
* child-link test cases

Developer must carefully review:

* update transaction
* status preservation
* child-family validation

Common AI mistakes:

* deleting and recreating all child links
* losing completed statuses
* allowing homework with zero children

---

## Increment 3.6 — Archive Homework

### Goal

Allow parent to archive homework instead of hard deleting it.

### Prerequisites

Increment 3.5.

### Scope

In scope:

* Archive action.
* Hide archived homework from default list.
* Preserve child statuses.

Out of scope:

* Permanent delete.
* Restore archive.
* Bulk archive.

### Files or Modules Expected to Change

```text
modules/homework/
app/(app)/homework/
tests/
```

### Tasks

* Add archive action.
* Add archive button/confirmation.
* Update list query to show active homework only.
* Preserve detail behavior if needed.

### Deliverables

* Archive homework behavior.

### Acceptance Criteria

* Parent can archive homework.
* Archived homework disappears from default list.
* Child status records are preserved.
* Dashboard later can ignore archived homework.

### Testing Requirements

* Unit test for active filtering.
* Integration test for archive action.
* Manual archive test.

### Risks

* Hard deleting homework.
* Removing completion history.
* Forgetting to filter archived items.

### AI Guidance

Claude can safely generate:

* archive action
* filter update
* tests

Developer must review:

* no destructive cascade
* dashboard implications
* status naming consistency

Common AI mistakes:

* deleting records
* not updating list query
* archiving child links separately

---

## Increment 3.7 — Homework Due Soon and Overdue Logic

### Goal

Add useful planning logic for homework.

### Prerequisites

Increment 3.4.

### Scope

In scope:

* Due soon calculation.
* Overdue calculation.
* List sorting/filtering.
* Child filter if simple.

Out of scope:

* Dashboard integration.
* Notifications.
* Recurrence.

### Files or Modules Expected to Change

```text
modules/homework/
app/(app)/homework/
tests/
```

### Tasks

* Add helper for overdue calculation.
* Add helper for due soon calculation.
* Update list display.
* Exclude fully completed homework from overdue.
* Add child filter if straightforward.

### Deliverables

* Homework list with useful planning indicators.

### Acceptance Criteria

* Incomplete homework past due is overdue.
* Fully completed homework is not overdue.
* Due soon homework is visible.
* Sorting prioritizes urgent items.

### Testing Requirements

* Unit tests for date/status logic.
* Manual tests with past/today/future due dates.
* Manual tests with completed and incomplete children.

### Risks

* Date/time bugs.
* Incorrect logic with multiple children.
* Scope creep into reminders.

### AI Guidance

Claude can safely generate:

* due/overdue helpers
* unit tests
* list display updates

Developer must carefully review:

* date handling
* multi-child completion rule
* timezone assumptions

Common AI mistakes:

* marking homework overdue even when all children completed
* using client time inconsistently
* adding notification system

---

# Phase 4 — School Events

## Increment 4.1 — School Event Data Model and Empty List

### Goal

Add school event tables and list page foundation.

### Prerequisites

Phase 2.

### Scope

In scope:

* `school_events`
* `school_event_children`
* Empty events page.
* Family-scoped event query.

Out of scope:

* Create event.
* Calendar view.
* Recurring events.
* Attachments.

### Files or Modules Expected to Change

```text
prisma/schema
modules/events/
app/(app)/events/
tests/
```

### Tasks

* Add event models to Prisma.
* Run migration.
* Add events page.
* Query events for current family.
* Add empty state.

### Deliverables

* Event database model.
* Events list foundation.

### Acceptance Criteria

* Events page loads.
* Empty state appears.
* Event query is family-scoped.
* Migration succeeds.

### Testing Requirements

* Migration test.
* Integration test for empty query.
* Manual page test.

### Risks

* Adding recurring events too early.
* Building calendar UI too early.

### AI Guidance

Claude can safely generate:

* schema draft
* list page skeleton
* empty state text

Developer must review:

* no recurrence
* event-child link model
* family scoping

Common AI mistakes:

* adding calendar sync
* adding full recurrence rules
* requiring school/class fields

---

## Increment 4.2 — Add School Event

### Goal

Allow parent to create an event linked to one or more children.

### Prerequisites

Increment 4.1 and active children.

### Scope

In scope:

* Add event form.
* Event type.
* Date/time.
* Optional location.
* Select children.

Out of scope:

* Attachments.
* Calendar sync.
* Recurrence.
* Event reminders.

### Files or Modules Expected to Change

```text
modules/events/
app/(app)/events/
components/forms/
tests/
```

### Tasks

* Build add event form.
* Load active children.
* Validate title, start date, and selected children.
* Save event.
* Create event-child links.

### Deliverables

* Add event flow.

### Acceptance Criteria

* Parent can create event.
* Event must have title.
* Event must have start date.
* Event must target at least one child.
* Event appears in list.

### Testing Requirements

* Unit validation tests.
* Integration test for create event.
* Manual add event test.

### Risks

* Overly complex form.
* Missing child-family validation.
* Confusing all-day and timed events.

### AI Guidance

Claude can safely generate:

* event form
* validation schema
* create action
* tests

Developer must review:

* child authorization
* date validation
* event type values

Common AI mistakes:

* adding recurring events
* adding external calendar fields
* trusting child IDs from client

---

## Increment 4.3 — Event Detail and Edit

### Goal

Allow parent to view and edit events.

### Prerequisites

Increment 4.2.

### Scope

In scope:

* Event detail page.
* Edit event form.
* Update children.
* Update event fields.

Out of scope:

* Attachments.
* Calendar view.
* Recurrence.

### Files or Modules Expected to Change

```text
modules/events/
app/(app)/events/[eventId]/
components/forms/
tests/
```

### Tasks

* Add event detail page.
* Add edit event form.
* Load event within current family.
* Update event fields.
* Update child links.

### Deliverables

* Event detail and edit flow.

### Acceptance Criteria

* Parent can view event detail.
* Parent can edit event.
* Event must keep at least one linked child.
* Parent cannot access events from another family.

### Testing Requirements

* Integration test for event detail.
* Integration test for event edit.
* Manual event edit test.

### Risks

* Allowing zero children.
* Updating event by ID without family check.
* Overcomplicating date fields.

### AI Guidance

Claude can safely generate:

* detail page
* edit form
* update tests

Developer must review:

* family-scoped lookup
* child link updates
* validation consistency

Common AI mistakes:

* not preserving child links correctly
* leaking inaccessible event
* introducing calendar view prematurely

---

## Increment 4.4 — Cancel or Archive Event

### Goal

Allow parent to remove event from active planning views without hard deleting.

### Prerequisites

Increment 4.3.

### Scope

In scope:

* Cancel/archive action.
* Hide archived events from default list.
* Show cancelled status if used.

Out of scope:

* Permanent delete.
* Recurrence cancellation.
* Notifications.

### Files or Modules Expected to Change

```text
modules/events/
app/(app)/events/
tests/
```

### Tasks

* Add event status handling.
* Add cancel/archive action.
* Update list filtering.
* Add confirmation message.

### Deliverables

* Event cancel/archive behavior.

### Acceptance Criteria

* Parent can cancel/archive event.
* Archived events disappear from default active list.
* Cancelled events do not appear as upcoming unless intentionally shown.
* Existing child links remain safe.

### Testing Requirements

* Unit tests for active/upcoming filters.
* Integration test for cancel/archive action.
* Manual test.

### Risks

* Confusing cancel and archive.
* Deleting event accidentally.
* Showing cancelled events as active.

### AI Guidance

Claude can safely generate:

* status update action
* filter tests
* confirmation copy

Developer must review:

* status semantics
* default filtering
* no hard delete

Common AI mistakes:

* deleting event row
* forgetting to update upcoming queries
* adding reminder cancellation system

---

## Increment 4.5 — Upcoming Events Query

### Goal

Prepare event data for the dashboard.

### Prerequisites

Increment 4.4.

### Scope

In scope:

* Upcoming events helper/query.
* Child filter support if simple.
* Exclude archived/cancelled events.

Out of scope:

* Dashboard UI.
* Calendar view.
* Notifications.

### Files or Modules Expected to Change

```text
modules/events/
tests/
```

### Tasks

* Add upcoming events query.
* Sort by start date.
* Filter by current family.
* Optionally filter by child.
* Add tests.

### Deliverables

* Upcoming event read logic.

### Acceptance Criteria

* Future active events appear.
* Past events do not appear in upcoming list.
* Archived/cancelled events are excluded.
* Query is family-scoped.

### Testing Requirements

* Unit or integration tests for upcoming logic.
* Manual check with past/future events.

### Risks

* Date bugs.
* Cancelled events appearing as upcoming.
* Query duplication later.

### AI Guidance

Claude can safely generate:

* query helper
* date test cases
* sorting logic

Developer must review:

* time comparison
* family filtering
* cancelled/archived filtering

Common AI mistakes:

* using only client-side filtering
* including past events
* ignoring child filter constraints

---

# Phase 5 — Permission Slips

## Increment 5.1 — Permission Slip Data Model and Empty List

### Goal

Add permission slip tables and list page foundation.

### Prerequisites

Phase 2.

### Scope

In scope:

* `permission_slips`
* `permission_slip_children`
* Permission slips page.
* Empty state.

Out of scope:

* Create permission slip.
* Status update.
* Attachments.

### Files or Modules Expected to Change

```text
prisma/schema
modules/permission-slips/
app/(app)/permission-slips/
tests/
```

### Tasks

* Add permission slip models.
* Run migration.
* Add list page.
* Query slips for current family.
* Add empty state.

### Deliverables

* Permission slip data model.
* Permission slips page foundation.

### Acceptance Criteria

* Page loads.
* Empty state appears.
* Query is family-scoped.
* Migration succeeds.

### Testing Requirements

* Migration test.
* Integration test for empty list.
* Manual page test.

### Risks

* Adding per-child status too early.
* Making file upload required too early.

### AI Guidance

Claude can safely generate:

* schema draft
* empty list page
* status constants

Developer must review:

* shared status decision
* child link table
* family scoping

Common AI mistakes:

* building document upload now
* adding signature workflow
* adding per-child slip status prematurely

---

## Increment 5.2 — Add Permission Slip

### Goal

Allow parent to create a permission slip linked to children.

### Prerequisites

Increment 5.1 and active children.

### Scope

In scope:

* Add permission slip form.
* Select children.
* Due date.
* Status defaults to pending.
* Notes.

Out of scope:

* Attachments.
* Digital signatures.
* Status workflow automation.

### Files or Modules Expected to Change

```text
modules/permission-slips/
app/(app)/permission-slips/
components/forms/
tests/
```

### Tasks

* Build add permission slip form.
* Validate title and child selection.
* Save permission slip.
* Create child links.
* Default status to `pending`.

### Deliverables

* Add permission slip flow.

### Acceptance Criteria

* Parent can create permission slip.
* Title is required.
* At least one child is required.
* Status defaults to pending.
* Slip appears in list.

### Testing Requirements

* Unit validation tests.
* Integration test for create slip.
* Manual add slip test.

### Risks

* Requiring attachment too soon.
* Forgetting child-family validation.
* Overcomplicating status options.

### AI Guidance

Claude can safely generate:

* form component
* create action
* validation tests

Developer must review:

* child validation
* default status
* no file upload yet

Common AI mistakes:

* making document required
* adding e-signature fields
* allowing no children

---

## Increment 5.3 — Permission Slip Detail and Edit

### Goal

Allow parent to view and edit permission slip details.

### Prerequisites

Increment 5.2.

### Scope

In scope:

* Detail page.
* Edit title, due date, notes.
* Edit child links.

Out of scope:

* Status transition controls.
* Attachments.
* Digital signature.

### Files or Modules Expected to Change

```text
modules/permission-slips/
app/(app)/permission-slips/[permissionSlipId]/
components/forms/
tests/
```

### Tasks

* Add detail page.
* Add edit form.
* Load slip within current family.
* Update fields and child links.

### Deliverables

* Permission slip detail and edit flow.

### Acceptance Criteria

* Parent can view slip detail.
* Parent can edit slip fields.
* Slip must remain linked to at least one child.
* Cross-family access is blocked.

### Testing Requirements

* Integration test for detail query.
* Integration test for edit.
* Manual edit test.

### Risks

* Losing child links.
* Allowing zero children.
* Skipping family-scoped lookup.

### AI Guidance

Claude can safely generate:

* detail page
* edit form
* tests

Developer must review:

* family access check
* child link update
* validation consistency

Common AI mistakes:

* updating by ID only
* adding upload UI early
* adding per-child statuses

---

## Increment 5.4 — Permission Slip Status Updates

### Goal

Allow parent to update permission slip status.

### Prerequisites

Increment 5.3.

### Scope

In scope:

* Status changes:

  * pending
  * signed
  * submitted
  * expired
  * cancelled
* Capture submitted date.
* Capture signed date if used.

Out of scope:

* Digital signature capture.
* File upload.
* Automatic notifications.

### Files or Modules Expected to Change

```text
modules/permission-slips/
app/(app)/permission-slips/[permissionSlipId]/
tests/
```

### Tasks

* Add status update controls.
* Add status validation.
* Require submitted date when submitted.
* Show status clearly.

### Deliverables

* Permission slip status workflow.

### Acceptance Criteria

* Parent can mark slip signed.
* Parent can mark slip submitted.
* Submitted slip records submitted date.
* Submitted slips are no longer pending.
* Invalid status transitions are handled safely.

### Testing Requirements

* Unit tests for status rules.
* Integration tests for status update.
* Manual status change test.

### Risks

* Confusing signed vs submitted.
* Missing submitted date.
* Too many workflow rules.

### AI Guidance

Claude can safely generate:

* status action
* status UI controls
* status rule tests

Developer must carefully review:

* submitted date validation
* status values
* UX labels

Common AI mistakes:

* implementing actual electronic signature
* skipping submitted_at requirement
* making workflow too rigid

---

## Increment 5.5 — Permission Slip Due Soon and Overdue Logic

### Goal

Make permission slips actionable for planning.

### Prerequisites

Increment 5.4.

### Scope

In scope:

* Due soon logic.
* Overdue/past due indicator.
* Filter by pending/submitted.

Out of scope:

* Push/email reminders.
* Dashboard integration.
* Automatic background jobs.

### Files or Modules Expected to Change

```text
modules/permission-slips/
app/(app)/permission-slips/
tests/
```

### Tasks

* Add due soon helper.
* Add overdue helper.
* Update list display.
* Exclude submitted/cancelled slips from urgent list.

### Deliverables

* Permission slip list with planning indicators.

### Acceptance Criteria

* Pending slip due soon is highlighted.
* Pending slip past due is highlighted.
* Submitted slip is not urgent.
* Cancelled slip is not urgent.

### Testing Requirements

* Unit tests for due logic.
* Manual tests with different due dates and statuses.

### Risks

* Date logic bugs.
* Accidentally changing stored status automatically.
* Scope creep into reminder system.

### AI Guidance

Claude can safely generate:

* date helper tests
* list display update
* status filter logic

Developer must review:

* date/time assumptions
* derived vs stored status decision
* urgent item rules

Common AI mistakes:

* creating notification table
* auto-updating statuses unexpectedly
* treating expired and overdue inconsistently

---

# Phase 6 — Attachments

## Increment 6.1 — Attachment Metadata and Storage Setup

### Goal

Set up Supabase Storage and attachment metadata.

### Prerequisites

Phase 1.

### Scope

In scope:

* Supabase private bucket setup.
* `attachments` table.
* File metadata storage.
* File validation.
* Upload foundation.

Out of scope:

* Linking files to homework/events/slips.
* File previews.
* OCR.
* Virus scanning.

### Files or Modules Expected to Change

```text
prisma/schema
modules/attachments/
lib/storage/
tests/
```

### Tasks

* Add attachment model.
* Configure storage helper.
* Validate file size/type.
* Upload file to private storage.
* Save attachment metadata.

### Deliverables

* Attachment upload foundation.

### Acceptance Criteria

* Parent can upload allowed file.
* Metadata is stored.
* File is stored privately.
* Unsupported files are rejected.
* Attachment belongs to current family.

### Testing Requirements

* Unit tests for file validation.
* Manual upload test.
* Manual invalid file test.

### Risks

* Public file exposure.
* Incorrect storage permissions.
* Storing files in database.
* Leaking internal storage paths.

### AI Guidance

Claude can safely generate:

* storage helper skeleton
* validation helpers
* upload error messages
* tests for file rules

Developer must carefully review:

* Supabase storage security
* server-side upload flow
* environment variables
* file path strategy

Common AI mistakes:

* making bucket public
* using service key in client code
* not checking current family before upload

---

## Increment 6.2 — Attachment List and Basic Download

### Goal

Allow parent to view uploaded attachments and access their own files securely.

### Prerequisites

Increment 6.1.

### Scope

In scope:

* Attachment list.
* Secure download/view action.
* Family-scoped access.

Out of scope:

* Linking attachments to records.
* File preview UI.
* Delete rules.

### Files or Modules Expected to Change

```text
modules/attachments/
app/(app)/attachments/
tests/
```

### Tasks

* Add attachments page.
* List current family attachments.
* Add secure download/access action.
* Ensure inaccessible files are blocked.

### Deliverables

* Attachment library foundation.

### Acceptance Criteria

* Parent can see uploaded attachments.
* Parent can access own family files.
* Parent cannot access files from another family.
* Empty state appears when no attachments exist.

### Testing Requirements

* Integration test for family-scoped attachment query.
* Manual download test.
* Manual unauthorized access test if practical.

### Risks

* Exposing file URLs publicly.
* Cross-family access.
* Confusing storage object path with attachment ID.

### AI Guidance

Claude can safely generate:

* list page
* secure access helper
* empty state copy
* tests

Developer must carefully review:

* authorization
* signed URL behavior
* no public storage exposure

Common AI mistakes:

* showing raw storage path
* returning public URLs
* skipping family validation

---

## Increment 6.3 — Link Attachments to Homework

### Goal

Allow parent to attach uploaded files to homework.

### Prerequisites

Increment 6.2 and Homework detail.

### Scope

In scope:

* `homework_attachments` table.
* Link existing/uploaded attachment to homework.
* Display attachments on homework detail.
* Unlink attachment from homework.

Out of scope:

* Attachments for events/slips.
* File deletion.
* Bulk attachment actions.

### Files or Modules Expected to Change

```text
prisma/schema
modules/attachments/
modules/homework/
app/(app)/homework/[homeworkId]/
tests/
```

### Tasks

* Add homework attachment link model.
* Add attach action.
* Add unlink action.
* Display linked files on homework detail.
* Prevent duplicate links.

### Deliverables

* Homework attachments.

### Acceptance Criteria

* Parent can link file to homework.
* Linked file appears on homework detail.
* Parent can unlink file.
* Unlink does not delete file globally.
* Attachment and homework must belong to same family.

### Testing Requirements

* Integration test for link.
* Integration test for unlink.
* Manual attach/unlink test.

### Risks

* Deleting file instead of unlinking.
* Cross-family attachment linking.
* Duplicated link rows.

### AI Guidance

Claude can safely generate:

* link table schema
* attach/unlink actions
* link tests
* UI section

Developer must carefully review:

* family ownership validation
* unlink vs delete behavior
* duplicate prevention

Common AI mistakes:

* physically deleting file on unlink
* not validating attachment family
* duplicating upload logic instead of reusing attachment module

---

## Increment 6.4 — Link Attachments to Events

### Goal

Allow parent to attach uploaded files to school events.

### Prerequisites

Increment 6.2 and Event detail.

### Scope

In scope:

* `school_event_attachments` table.
* Link/unlink event attachments.
* Display linked files on event detail.

Out of scope:

* Permission slip attachments.
* File deletion.
* Calendar file import.

### Files or Modules Expected to Change

```text
prisma/schema
modules/attachments/
modules/events/
app/(app)/events/[eventId]/
tests/
```

### Tasks

* Add event attachment link model.
* Add attach/unlink actions.
* Display attachments on event detail.
* Reuse attachment logic.

### Deliverables

* Event attachments.

### Acceptance Criteria

* Parent can link file to event.
* File appears on event detail.
* Unlink does not delete file.
* Attachment and event must belong to same family.

### Testing Requirements

* Integration test for event attachment link.
* Manual attach/unlink test.

### Risks

* Copy-paste inconsistency.
* Cross-family linking.
* Attachment module duplication.

### AI Guidance

Claude can safely generate:

* schema addition
* adapted link/unlink tests
* UI section based on homework pattern

Developer must review:

* reuse of attachment module
* authorization consistency
* duplicate link prevention

Common AI mistakes:

* creating a separate event upload system
* inconsistent UI behavior
* skipping family checks

---

## Increment 6.5 — Link Attachments to Permission Slips

### Goal

Allow parent to attach uploaded forms to permission slips.

### Prerequisites

Increment 6.2 and Permission Slip detail.

### Scope

In scope:

* `permission_slip_attachments` table.
* Link/unlink attachments.
* Display linked files on permission slip detail.

Out of scope:

* Digital signature.
* OCR.
* File versioning.

### Files or Modules Expected to Change

```text
prisma/schema
modules/attachments/
modules/permission-slips/
app/(app)/permission-slips/[permissionSlipId]/
tests/
```

### Tasks

* Add permission slip attachment link model.
* Add attach/unlink actions.
* Display attachments on slip detail.
* Reuse common attachment logic.

### Deliverables

* Permission slip attachments.

### Acceptance Criteria

* Parent can attach file to permission slip.
* File appears on slip detail.
* Slip can still exist without attachment.
* Unlink does not delete file globally.
* Family ownership is enforced.

### Testing Requirements

* Integration test for slip attachment.
* Manual attach/unlink test.
* Manual status/file distinction test.

### Risks

* Treating uploaded file as submitted status.
* Making attachment required.
* Cross-family file access.

### AI Guidance

Claude can safely generate:

* link action
* display section
* tests based on previous attachment patterns

Developer must carefully review:

* status is independent from file upload
* family validation
* no digital signature logic

Common AI mistakes:

* setting status to submitted automatically after upload
* making file upload mandatory
* creating document versioning

---

## Increment 6.6 — Attachment Delete Rules

### Goal

Prevent unsafe file deletion.

### Prerequisites

Increments 6.3, 6.4, and 6.5.

### Scope

In scope:

* Check active links before delete.
* Allow delete only when no active links exist.
* Soft-delete metadata.
* User-friendly error when linked.

Out of scope:

* Background cleanup jobs.
* Versioning.
* Bulk delete.

### Files or Modules Expected to Change

```text
modules/attachments/
app/(app)/attachments/
tests/
```

### Tasks

* Add delete eligibility check.
* Add delete action.
* Check homework/event/permission slip links.
* Soft-delete attachment metadata.
* Optionally delete physical file only if safe.

### Deliverables

* Safe attachment deletion.

### Acceptance Criteria

* Linked attachment cannot be deleted.
* Unlinked attachment can be deleted or soft-deleted.
* Delete error explains why deletion failed.
* File access is blocked after delete.

### Testing Requirements

* Unit tests for delete eligibility.
* Integration test for linked attachment delete failure.
* Integration test for unlinked attachment delete success.
* Manual delete test.

### Risks

* Deleting files still used by records.
* Orphaning metadata.
* Physical storage cleanup mistakes.

### AI Guidance

Claude can safely generate:

* delete rule helper
* tests
* error messages

Developer must carefully review:

* all link checks
* physical deletion behavior
* transaction safety

Common AI mistakes:

* checking only one link table
* hard deleting too aggressively
* not blocking access after soft delete

---

# Phase 7 — Dashboard

## Increment 7.1 — Dashboard Empty State and Quick Actions

### Goal

Create the dashboard foundation before real summary data.

### Prerequisites

Phase 1.

### Scope

In scope:

* Dashboard layout.
* Empty state.
* Quick action links.
* Child filter placeholder if children exist.

Out of scope:

* Real dashboard queries.
* Reminder logic.
* Metrics/cards from all modules.

### Files or Modules Expected to Change

```text
app/(app)/dashboard/
modules/dashboard/
components/dashboard/
tests/
```

### Tasks

* Add dashboard page structure.
* Add empty state.
* Add quick action links:

  * Add child
  * Add homework
  * Add event
  * Add permission slip
  * Upload attachment
* Add basic child filter placeholder if simple.

### Deliverables

* Dashboard shell.

### Acceptance Criteria

* Dashboard loads after login.
* Empty state is helpful.
* Quick action links navigate correctly.
* App remains mobile-friendly.

### Testing Requirements

* Manual dashboard test.
* E2E smoke test after login if practical.

### Risks

* Overbuilding dashboard before data exists.
* Adding fake statistics.
* Complex UI too early.

### AI Guidance

Claude can safely generate:

* dashboard component skeleton
* empty state copy
* quick action layout

Developer must review:

* links match existing routes
* no fake data
* no future feature buttons

Common AI mistakes:

* adding notifications
* adding AI summaries
* adding nonexistent routes

---

## Increment 7.2 — Homework Summary on Dashboard

### Goal

Show homework due soon and overdue on dashboard.

### Prerequisites

Increment 3.7 and Increment 7.1.

### Scope

In scope:

* Overdue homework section.
* Homework due soon section.
* Child filter if available.

Out of scope:

* Events.
* Permission slips.
* Attachments.
* Push notifications.

### Files or Modules Expected to Change

```text
modules/dashboard/
modules/homework/
app/(app)/dashboard/
tests/
```

### Tasks

* Reuse homework due/overdue logic.
* Query family homework summary.
* Show overdue and due soon homework.
* Show per-child status where needed.

### Deliverables

* Homework-aware dashboard.

### Acceptance Criteria

* Overdue incomplete homework appears.
* Fully completed homework does not appear as overdue.
* Due soon homework appears.
* Dashboard respects family scope.

### Testing Requirements

* Unit tests for dashboard homework selection.
* Integration test with mixed homework records.
* Manual dashboard test.

### Risks

* Duplicating homework rules incorrectly.
* Dashboard becoming source of truth.
* Multi-child completion confusion.

### AI Guidance

Claude can safely generate:

* dashboard query helper
* section component
* tests

Developer must review:

* reuse of existing homework logic
* per-child completion behavior
* date handling

Common AI mistakes:

* recalculating rules differently from homework module
* showing completed homework as urgent
* ignoring child-specific status

---

## Increment 7.3 — Events Summary on Dashboard

### Goal

Show upcoming school events on dashboard.

### Prerequisites

Increment 4.5 and Increment 7.1.

### Scope

In scope:

* Upcoming events section.
* Today/this week grouping if simple.
* Child filter if available.

Out of scope:

* Calendar UI.
* Event reminders.
* Notifications.

### Files or Modules Expected to Change

```text
modules/dashboard/
modules/events/
app/(app)/dashboard/
tests/
```

### Tasks

* Reuse upcoming events query.
* Add upcoming events section.
* Show event date, title, children.
* Exclude archived/cancelled events.

### Deliverables

* Event-aware dashboard.

### Acceptance Criteria

* Future events appear.
* Past events are excluded.
* Cancelled/archived events are excluded.
* Data is family-scoped.

### Testing Requirements

* Integration test for upcoming event dashboard section.
* Manual dashboard test with events.

### Risks

* Date filtering bugs.
* Duplicate event query logic.
* Dashboard overcrowding.

### AI Guidance

Claude can safely generate:

* events dashboard section
* tests
* grouping helper

Developer must review:

* upcoming query reuse
* date behavior
* UI density

Common AI mistakes:

* adding calendar view
* including cancelled events
* ignoring past events

---

## Increment 7.4 — Permission Slips Summary on Dashboard

### Goal

Show pending and due permission slips on dashboard.

### Prerequisites

Increment 5.5 and Increment 7.1.

### Scope

In scope:

* Pending slips section.
* Due soon/past due indicator.
* Child filter if available.

Out of scope:

* File upload from dashboard.
* Notifications.
* E-signature.

### Files or Modules Expected to Change

```text
modules/dashboard/
modules/permission-slips/
app/(app)/dashboard/
tests/
```

### Tasks

* Reuse permission slip due logic.
* Query pending/due slips.
* Show title, due date, status, linked children.

### Deliverables

* Permission-slip-aware dashboard.

### Acceptance Criteria

* Pending due soon slips appear.
* Past due pending slips appear.
* Submitted/cancelled slips are not urgent.
* Dashboard remains readable.

### Testing Requirements

* Unit/integration tests for slip dashboard rules.
* Manual dashboard test.

### Risks

* Showing too many slips.
* Confusing uploaded file with submitted status.
* Date bugs.

### AI Guidance

Claude can safely generate:

* dashboard section
* tests
* status copy

Developer must review:

* status filtering
* due logic reuse
* no upload/status confusion

Common AI mistakes:

* marking slips submitted from dashboard without date
* creating notification system
* adding e-signature UI

---

## Increment 7.5 — Dashboard Child Filter

### Goal

Allow parent to filter dashboard by child.

### Prerequisites

Dashboard summary sections and child management.

### Scope

In scope:

* Child selector.
* Filter dashboard homework/events/slips by selected child.
* All children default.

Out of scope:

* Saved preferences.
* Per-child dashboard pages.
* Complex analytics.

### Files or Modules Expected to Change

```text
modules/dashboard/
app/(app)/dashboard/
components/dashboard/
tests/
```

### Tasks

* Add child selector.
* Pass selected child to dashboard queries.
* Ensure all sections update consistently.
* Add empty filtered state.

### Deliverables

* Child-filtered dashboard.

### Acceptance Criteria

* Parent can select all children.
* Parent can select one child.
* Homework/events/slips filter correctly.
* Empty filtered results show helpful message.

### Testing Requirements

* Integration test for child-filtered dashboard query.
* Manual filter test.
* Manual empty filtered state test.

### Risks

* Inconsistent filtering between sections.
* Complex state management.
* Poor mobile usability.

### AI Guidance

Claude can safely generate:

* filter component
* query parameter handling
* tests

Developer must carefully review:

* filter consistency
* family authorization
* no client-only security filtering

Common AI mistakes:

* filtering only in UI after fetching all data
* missing one dashboard section
* adding persistent preferences prematurely

---

# Phase 8 — MVP Hardening

## Increment 8.1 — Global Empty, Loading, and Error States

### Goal

Make the app feel stable and understandable.

### Prerequisites

Core modules mostly complete.

### Scope

In scope:

* Standard loading states.
* Standard error states.
* Standard empty states.
* Not-found behavior.

Out of scope:

* Full monitoring platform.
* Advanced error reporting.
* Custom design system rewrite.

### Files or Modules Expected to Change

```text
components/states/
lib/errors/
app error/not-found boundaries
feature pages as needed
```

### Tasks

* Create reusable empty/loading/error state components.
* Apply to main pages.
* Standardize not-found messages.
* Standardize validation error display.

### Deliverables

* Consistent UX states.

### Acceptance Criteria

* Main pages have empty states.
* Failed operations show clear errors.
* Not-found states do not leak private data.
* Loading states are visible where needed.

### Testing Requirements

* Manual test empty states.
* Manual test common error states.
* Optional unit tests for error mapping.

### Risks

* Large refactor.
* Introducing inconsistent state components.
* Over-polishing.

### AI Guidance

Claude can safely generate:

* reusable state components
* error message copy
* checklist of pages to update

Developer must review:

* not-found security
* limited file changes
* no major UI refactor

Common AI mistakes:

* rewriting many pages unnecessarily
* exposing technical error details
* adding global state library

---

## Increment 8.2 — Seed Data for Development and Demo

### Goal

Create safe demo data for local development and portfolio demonstration.

### Prerequisites

Main schema stable.

### Scope

In scope:

* Seed family.
* Seed parent profile placeholder if appropriate.
* Seed children.
* Seed homework.
* Seed events.
* Seed permission slips.
* Seed attachment metadata if safe.

Out of scope:

* Production seed data.
* Real personal data.
* Complex data generator.

### Files or Modules Expected to Change

```text
prisma/seed
README.md
docs/demo-data.md
```

### Tasks

* Add seed script.
* Create realistic fake data.
* Document how to run seed.
* Ensure seed targets development only.

### Deliverables

* Demo dataset.
* Seed instructions.

### Acceptance Criteria

* Seed script runs locally.
* Dashboard looks meaningful after seed.
* No real personal data.
* Seed data does not break tests.

### Testing Requirements

* Manual seed test.
* Manual app test after seed.
* Build test.

### Risks

* Running seed against production.
* Seed script becoming stale.
* Using real personal information.

### AI Guidance

Claude can safely generate:

* fake data examples
* seed documentation
* demo scenario descriptions

Developer must carefully review:

* environment safety
* fake data only
* schema compatibility

Common AI mistakes:

* hardcoding production IDs
* including realistic but sensitive-looking data
* assuming auth users exist

---

## Increment 8.3 — Critical E2E Tests

### Goal

Add automated coverage for core user journeys.

### Prerequisites

Core MVP features complete.

### Scope

In scope:

* Login flow.
* Add child.
* Add homework.
* Mark homework complete.
* Add event.
* Add permission slip.
* Dashboard smoke test.

Out of scope:

* Exhaustive E2E suite.
* Visual regression testing.
* Testing future features.

### Files or Modules Expected to Change

```text
tests/e2e/
playwright config if needed
README.md
```

### Tasks

* Add E2E tests for critical flows.
* Use stable selectors.
* Document how to run tests.
* Ensure tests can run against test/dev data.

### Deliverables

* Critical E2E test suite.

### Acceptance Criteria

* E2E tests run locally.
* Tests cover main happy paths.
* Tests are not excessively brittle.
* Tests do not require production data.

### Testing Requirements

This increment is testing-focused.

### Risks

* Brittle tests.
* Unstable test data.
* Spending too much time on E2E coverage.

### AI Guidance

Claude can safely generate:

* Playwright test drafts
* selector strategy
* test checklist

Developer must carefully review:

* test stability
* data setup/cleanup
* avoiding brittle CSS selectors

Common AI mistakes:

* testing implementation details
* relying on arbitrary timeouts
* assuming database state

---

## Increment 8.4 — Production Deployment Hardening

### Goal

Prepare the app for a stable portfolio deployment.

### Prerequisites

Core MVP complete.

### Scope

In scope:

* Production environment review.
* Production Supabase configuration.
* Production Vercel configuration.
* Storage access review.
* Smoke test checklist.

Out of scope:

* Advanced monitoring.
* Paid infrastructure optimization.
* Load testing.

### Files or Modules Expected to Change

```text
README.md
docs/deployment.md
environment configuration
```

### Tasks

* Review environment variables.
* Verify production database.
* Run production migration carefully.
* Verify auth redirects.
* Verify storage permissions.
* Perform production smoke test.

### Deliverables

* Deployed MVP.
* Deployment checklist.
* Known limitations.

### Acceptance Criteria

* Production app loads.
* Auth works.
* Main features work.
* File upload/access works.
* No secrets are exposed.

### Testing Requirements

* Production smoke test.
* Manual full flow test.
* Check logs for errors.

### Risks

* Production migration mistakes.
* Storage misconfiguration.
* Exposing service keys.
* Auth redirect errors.

### AI Guidance

Claude can safely generate:

* deployment checklist
* smoke test checklist
* README deployment section

Developer must carefully review:

* environment variables
* Supabase keys
* production database target
* storage policies

Common AI mistakes:

* suggesting service role key in client
* skipping migration verification
* mixing dev and prod projects

---

## Increment 8.5 — Final UX and Scope Review

### Goal

Polish the MVP without expanding scope.

### Prerequisites

Production-like MVP complete.

### Scope

In scope:

* UX copy review.
* Navigation review.
* Mobile usability check.
* Remove unused placeholders.
* Document known limitations.

Out of scope:

* New features.
* Redesign.
* Branding overhaul.
* Future integrations.

### Files or Modules Expected to Change

```text
README.md
docs/
selected UI text files/components
navigation config
```

### Tasks

* Review all navigation links.
* Remove dead/unused pages.
* Improve empty/error copy.
* Check mobile usability.
* Document MVP limitations.
* Prepare portfolio description.

### Deliverables

* Clean MVP.
* Documentation.
* Portfolio-ready summary.

### Acceptance Criteria

* No dead navigation.
* No placeholder future features.
* Main flows are understandable.
* MVP limitations are clear.
* Mobile layout is acceptable.

### Testing Requirements

* Manual full app walkthrough.
* Manual mobile test.
* Manual navigation test.

### Risks

* Endless polishing.
* Accidentally adding scope.
* Large refactor late in project.

### AI Guidance

Claude can safely generate:

* UX review checklist
* README/portfolio text
* limitation list
* copy suggestions

Developer must carefully review:

* no new features added
* no large refactors
* final app behavior

Common AI mistakes:

* adding future features during polish
* rewriting UI architecture
* expanding navigation

---

# Part 4 — Dependency Graph

## Full dependency tree

```text
0.1 Create Project Repository and Base App
├── 0.2 Add Styling and UI Foundation
│   └── 0.3 Create Application Shell Navigation
├── 0.4 Configure Supabase and Prisma Baseline
├── 0.5 Add Testing Baseline
└── 0.6 First Vercel Deployment

0.4 Configure Supabase and Prisma Baseline
└── 1.1 Add Supabase Authentication Screens
    └── 1.2 Protect App Routes
        └── 1.3 Create Parent Profile and Family Workspace
            └── 1.4 Add Current Family Authorization Helper
                └── 2.1 Child Data Model and Empty List
                    └── 2.2 Add Child
                        └── 2.3 Edit Child
                            └── 2.4 Archive Child
```

## Homework dependency branch

```text
2.2 Add Child
└── 3.1 Homework Data Model and Empty List
    └── 3.2 Add Homework
        └── 3.3 Homework Detail
            └── 3.4 Mark Homework Complete Per Child
                ├── 3.5 Edit Homework
                │   └── 3.6 Archive Homework
                └── 3.7 Homework Due Soon and Overdue Logic
```

## Events dependency branch

```text
2.2 Add Child
└── 4.1 School Event Data Model and Empty List
    └── 4.2 Add School Event
        └── 4.3 Event Detail and Edit
            └── 4.4 Cancel or Archive Event
                └── 4.5 Upcoming Events Query
```

## Permission slip dependency branch

```text
2.2 Add Child
└── 5.1 Permission Slip Data Model and Empty List
    └── 5.2 Add Permission Slip
        └── 5.3 Permission Slip Detail and Edit
            └── 5.4 Permission Slip Status Updates
                └── 5.5 Permission Slip Due Soon and Overdue Logic
```

## Attachment dependency branch

```text
1.4 Add Current Family Authorization Helper
└── 6.1 Attachment Metadata and Storage Setup
    └── 6.2 Attachment List and Basic Download
        ├── 6.3 Link Attachments to Homework
        ├── 6.4 Link Attachments to Events
        ├── 6.5 Link Attachments to Permission Slips
        └── 6.6 Attachment Delete Rules
```

## Dashboard dependency branch

```text
7.1 Dashboard Empty State and Quick Actions
├── 3.7 Homework Due Soon and Overdue Logic
│   └── 7.2 Homework Summary on Dashboard
├── 4.5 Upcoming Events Query
│   └── 7.3 Events Summary on Dashboard
├── 5.5 Permission Slip Due Soon and Overdue Logic
│   └── 7.4 Permission Slips Summary on Dashboard
└── 2.2 Add Child
    └── 7.5 Dashboard Child Filter
```

## Hardening dependency branch

```text
Core MVP Features
└── 8.1 Global Empty, Loading, and Error States
    └── 8.2 Seed Data for Development and Demo
        └── 8.3 Critical E2E Tests
            └── 8.4 Production Deployment Hardening
                └── 8.5 Final UX and Scope Review
```

---

# Part 5 — Testing Strategy

## Phase 0 Testing

### Unit testing

Only sample tests and simple utility tests.

### Integration testing

Database connection and migration smoke checks.

### Manual testing

* App runs locally.
* App builds.
* Placeholder navigation works.
* Deployment loads.

### When to create tests

During Increment 0.5.

---

## Phase 1 Testing

### Unit testing

* Auth helper logic.
* Family context helper.
* Error mapping.

### Integration testing

* Parent profile creation.
* Family workspace creation.
* Membership creation.
* Idempotent first-login behavior.

### Manual testing

* Register.
* Login.
* Logout.
* Refresh protected route.
* Try accessing dashboard while logged out.

### When to create tests

During each auth increment. Do not postpone auth tests.

---

## Phase 2 Testing

### Unit testing

* Child validation.
* Archive filtering.

### Integration testing

* Create child.
* Update child.
* Archive child.
* Verify family scoping.

### Manual testing

* Empty children page.
* Add child.
* Edit child.
* Archive child.

### When to create tests

With each child increment.

---

## Phase 3 Testing

### Unit testing

* Homework validation.
* Per-child completion logic.
* Due soon logic.
* Overdue logic.

### Integration testing

* Create homework with one child.
* Create homework with multiple children.
* Mark one child complete.
* Edit linked children.
* Archive homework.

### Manual testing

* Add homework.
* View homework detail.
* Mark one child complete.
* Check overdue behavior.
* Edit homework.
* Archive homework.

### When to create tests

During each homework increment. Homework has important business rules, so do not rely only on manual testing.

---

## Phase 4 Testing

### Unit testing

* Event validation.
* Date validation.
* Upcoming event logic.

### Integration testing

* Create event.
* Edit event.
* Cancel/archive event.
* Query upcoming events.

### Manual testing

* Add event.
* Edit event.
* Cancel event.
* Check upcoming event list.

### When to create tests

During each event increment.

---

## Phase 5 Testing

### Unit testing

* Permission slip validation.
* Status rules.
* Submitted date rule.
* Due soon/overdue logic.

### Integration testing

* Create permission slip.
* Edit permission slip.
* Update status.
* Query pending/due slips.

### Manual testing

* Add permission slip.
* Mark signed.
* Mark submitted.
* Verify due/overdue display.

### When to create tests

During each permission slip increment.

---

## Phase 6 Testing

### Unit testing

* File type validation.
* File size validation.
* Delete eligibility.
* Link/unlink rules.

### Integration testing

* Upload attachment.
* Query attachment list.
* Link attachment to homework/event/slip.
* Unlink attachment.
* Block deletion when linked.
* Block cross-family access.

### Manual testing

* Upload PDF/image.
* Try invalid file.
* Download/view file.
* Link/unlink file.
* Try deleting linked file.

### When to create tests

During each attachment increment. File access is security-sensitive.

---

## Phase 7 Testing

### Unit testing

* Dashboard summary rules.
* Child filter logic.
* Needs attention logic.

### Integration testing

* Dashboard with homework.
* Dashboard with events.
* Dashboard with permission slips.
* Child-filtered dashboard.

### Manual testing

* Login and view dashboard.
* Add data and confirm dashboard updates.
* Filter by child.
* Verify empty states.

### When to create tests

During each dashboard increment.

---

## Phase 8 Testing

### Unit testing

* Error mapping if implemented.
* Shared helper tests.

### Integration testing

* Full app flows.
* Seed data correctness.
* Storage access.

### Manual testing

* Full regression.
* Production smoke test.
* Mobile walkthrough.
* Navigation check.
* Error state check.

### When to create tests

Before production hardening is considered complete.

---

# Part 6 — Claude Session Strategy

## Complexity classification rules

```text
Small = 1 focused task, few files, mostly UI or simple helper
Medium = data model + UI + server action/query + tests
Large = multiple modules, security-sensitive logic, or file storage
```

No increment in this roadmap should remain Large. If an increment feels Large during development, split it before asking Claude to implement it.

## Claude session table

| Increment                     | Complexity | Estimated Claude Interactions | Expected Context Size |
| ----------------------------- | ---------: | ----------------------------: | --------------------- |
| 0.1 Base app                  |      Small |                           1–2 | Very small            |
| 0.2 Styling/UI foundation     |      Small |                           1–2 | Small                 |
| 0.3 App shell navigation      |      Small |                           1–2 | Small                 |
| 0.4 Supabase/Prisma baseline  |     Medium |                           2–3 | Medium                |
| 0.5 Testing baseline          |      Small |                           1–2 | Small                 |
| 0.6 Vercel deployment         |      Small |                             1 | Small                 |
| 1.1 Auth screens              |     Medium |                           2–3 | Medium                |
| 1.2 Protected routes          |     Medium |                           2–3 | Medium                |
| 1.3 Parent/family workspace   |     Medium |                           3–4 | Medium                |
| 1.4 Family auth helper        |     Medium |                           2–3 | Medium                |
| 2.1 Child model/list          |     Medium |                           2–3 | Medium                |
| 2.2 Add child                 |     Medium |                           2–3 | Medium                |
| 2.3 Edit child                |     Medium |                           2–3 | Medium                |
| 2.4 Archive child             |      Small |                           1–2 | Small                 |
| 3.1 Homework model/list       |     Medium |                           2–3 | Medium                |
| 3.2 Add homework              |     Medium |                           3–4 | Medium                |
| 3.3 Homework detail           |      Small |                           1–2 | Small                 |
| 3.4 Per-child completion      |     Medium |                           3–4 | Medium                |
| 3.5 Edit homework             |     Medium |                           3–4 | Medium                |
| 3.6 Archive homework          |      Small |                           1–2 | Small                 |
| 3.7 Homework due/overdue      |     Medium |                           2–3 | Medium                |
| 4.1 Event model/list          |     Medium |                           2–3 | Medium                |
| 4.2 Add event                 |     Medium |                           2–3 | Medium                |
| 4.3 Event detail/edit         |     Medium |                           2–3 | Medium                |
| 4.4 Cancel/archive event      |      Small |                           1–2 | Small                 |
| 4.5 Upcoming events query     |      Small |                           1–2 | Small                 |
| 5.1 Slip model/list           |     Medium |                           2–3 | Medium                |
| 5.2 Add slip                  |     Medium |                           2–3 | Medium                |
| 5.3 Slip detail/edit          |     Medium |                           2–3 | Medium                |
| 5.4 Status updates            |     Medium |                           2–3 | Medium                |
| 5.5 Slip due/overdue          |      Small |                           1–2 | Small                 |
| 6.1 Storage/upload foundation |     Medium |                           3–4 | Medium                |
| 6.2 Attachment list/download  |     Medium |                           2–3 | Medium                |
| 6.3 Homework attachments      |     Medium |                           2–3 | Medium                |
| 6.4 Event attachments         |     Medium |                           2–3 | Medium                |
| 6.5 Slip attachments          |     Medium |                           2–3 | Medium                |
| 6.6 Delete rules              |     Medium |                           2–3 | Medium                |
| 7.1 Dashboard shell           |      Small |                           1–2 | Small                 |
| 7.2 Homework dashboard        |     Medium |                           2–3 | Medium                |
| 7.3 Events dashboard          |      Small |                           1–2 | Small                 |
| 7.4 Slips dashboard           |      Small |                           1–2 | Small                 |
| 7.5 Child filter              |     Medium |                           2–3 | Medium                |
| 8.1 Error/loading states      |     Medium |                           2–3 | Medium                |
| 8.2 Seed data                 |      Small |                           1–2 | Small                 |
| 8.3 Critical E2E tests        |     Medium |                           2–3 | Medium                |
| 8.4 Production hardening      |      Small |                           1–2 | Small                 |
| 8.5 Final UX/scope review     |      Small |                           1–2 | Small                 |

## Recommended Claude prompt structure per increment

Use a short prompt like this for each Claude session:

```text
We are building the School Communication Organizer MVP.

Current stack:
Next.js + TypeScript + Prisma + Supabase Auth/PostgreSQL/Storage + Tailwind + shadcn.

Current increment:
[Increment name]

Goal:
[Goal]

Existing context:
[Brief summary of completed increments]

In scope:
[Scope]

Out of scope:
[Explicit exclusions]

Acceptance criteria:
[Paste criteria]

Testing requirements:
[Paste tests]

Please modify only the files needed for this increment.
Do not implement future features.
Do not generate unrelated refactors.
```

---

# Part 7 — Milestones

## Milestone 1 — Running Deployed Shell

### Usable state

The application runs locally and is deployed.

### Includes

* Base app
* UI foundation
* Navigation shell
* Database connection
* Testing baseline
* Vercel deployment

---

## Milestone 2 — Parent Can Log In

### Usable state

A parent can register, log in, log out, and access a protected app area.

### Includes

* Supabase Auth
* Protected routes
* Parent profile
* Family workspace
* Family auth helper

---

## Milestone 3 — Parent Can Manage Children

### Usable state

A parent can create, edit, and archive child profiles.

### Includes

* Child model
* Child list
* Add child
* Edit child
* Archive child

---

## Milestone 4 — Parent Can Manage Homework

### Usable state

A parent can track homework for one or more children and mark completion per child.

### Includes

* Homework model
* Add homework
* Homework detail
* Per-child completion
* Edit homework
* Archive homework
* Due/overdue logic

---

## Milestone 5 — Parent Can Manage Events

### Usable state

A parent can track school events and meetings.

### Includes

* Event model
* Add event
* Edit event
* Cancel/archive event
* Upcoming event query

---

## Milestone 6 — Parent Can Manage Permission Slips

### Usable state

A parent can track permission slips, statuses, and due dates.

### Includes

* Permission slip model
* Add slip
* Edit slip
* Status updates
* Due/overdue logic

---

## Milestone 7 — Parent Can Upload and Link Attachments

### Usable state

A parent can upload files and link them to homework, events, and permission slips.

### Includes

* Attachment upload
* Secure access
* Attachment list
* Homework links
* Event links
* Permission slip links
* Delete rules

---

## Milestone 8 — Parent Has a Useful Dashboard

### Usable state

A parent can log in and immediately see what needs attention.

### Includes

* Dashboard shell
* Homework summary
* Event summary
* Permission slip summary
* Child filter
* Quick actions

---

## Milestone 9 — Portfolio-Ready MVP

### Usable state

The MVP is stable, deployed, documented, and demo-ready.

### Includes

* Error/loading states
* Seed data
* Critical E2E tests
* Production deployment
* UX/scope review
* README and known limitations

---

# Part 8 — Future-Proofing and Scope Control

## Do NOT implement in MVP

### School integrations

Do not build:

* Google Classroom integration
* Microsoft Teams integration
* school portal sync
* LMS sync
* school admin accounts

Reason:

```text
This would multiply integration complexity before validating the core product.
```

---

### Teacher accounts or messaging

Do not build:

* teacher login
* teacher profiles as users
* chat
* inbox
* message threads
* read receipts

Reason:

```text
The MVP is a parent-managed organizer, not a communication platform.
```

---

### Standalone Teacher Management

Do not build as part of this roadmap.

If teacher information is needed, use:

```text
optional teacher/source text field on homework or event
```

Reason:

```text
A separate teacher module adds CRUD scope but is not essential to prove MVP value.
```

---

### OCR and AI organization

Do not build:

* OCR extraction
* automatic due date detection
* automatic categorization
* AI summaries
* document parsing

Reason:

```text
These features depend on stable upload/document workflows first.
```

---

### Email synchronization

Do not build:

* Gmail sync
* Outlook sync
* email parsing
* automatic message import

Reason:

```text
Email sync requires permissions, parsing, privacy handling, and complex edge cases.
```

---

### Native mobile apps

Do not build:

* iOS app
* Android app
* app store deployment

Reason:

```text
The web app should be mobile-friendly first.
```

---

### Push notifications

Do not build yet:

* push notification infrastructure
* email reminders
* SMS reminders
* daily digest

Reason:

```text
Use in-app dashboard reminders first. Add notification infrastructure only after the reminder rules are proven useful.
```

---

### Complex permission model

Do not build:

* read-only guardians
* child-specific parent permissions
* custody access rules
* approval workflows

Reason:

```text
Start with one family workspace and simple parent access.
```

---

### Advanced recurrence

Do not build:

* recurring events
* recurring homework engine
* edit one occurrence/all occurrences/future occurrences

Reason:

```text
Recurring logic can become unexpectedly complex and is not required for the first validated MVP.
```

---

# Part 9 — Architectural Review

## Review 1 — Is this roadmap too large?

Yes, the full roadmap is substantial for a solo developer.

The largest scope areas are:

* homework per-child status
* file upload and attachment linking
* dashboard summary logic
* authentication/family authorization

### Simpler alternative

For the first internal demo, build only:

```text
Auth
Children
Homework
Basic dashboard with homework
```

Then add:

```text
Events
Permission slips
Attachments
```

This produces value earlier.

---

## Review 2 — Are attachments too risky?

Attachments are security-sensitive and can slow development.

### Risk

* private file access
* storage rules
* signed URLs
* link tables
* delete rules
* cross-family access checks

### Simpler alternative

Split attachments further:

```text
1. Upload files only
2. List files
3. Link to homework
4. Link to events
5. Link to slips
6. Add delete rules
```

This roadmap already follows that split.

---

## Review 3 — Is dashboard too late?

The dashboard is the core UX, but it depends on feature data.

### Recommended compromise

Build the dashboard shell early, then add summaries after each feature.

This roadmap does that:

```text
7.1 Dashboard shell
7.2 Homework summary
7.3 Event summary
7.4 Permission slip summary
7.5 Child filter
```

---

## Review 4 — Should Teacher Management be included?

Not in this roadmap.

The updated MVP scope does not include Teacher Management. Adding it would create another CRUD module and more dependencies.

### Simpler MVP handling

Use optional text fields:

```text
homework.source_or_teacher_name
event.contact_or_teacher_name
```

A full teacher contact module can be added later if real usage proves it is needed.

---

## Review 5 — Is Prisma + Supabase Auth + Supabase Storage too complex?

It is manageable but requires care.

### Risk areas

* Supabase auth user vs application parent profile
* environment variables
* storage permissions
* Prisma migrations against Supabase
* family-scoped authorization

### Mitigation

Keep all auth/family helpers centralized and reused.

Do not let each feature invent its own authorization logic.

---

## Review 6 — Are any increments oversized?

The most complex increments are:

```text
1.3 Parent Profile and Family Workspace
3.4 Mark Homework Complete Per Child
3.5 Edit Homework
6.1 Attachment Metadata and Storage Setup
6.6 Attachment Delete Rules
7.5 Dashboard Child Filter
```

None should be larger than one Claude session if the prompt is focused and the existing context is summarized.

If any becomes too large, split it further.

Example split for 3.5:

```text
3.5a Edit homework fields only
3.5b Edit linked children
```

Example split for 6.1:

```text
6.1a Attachment schema and metadata only
6.1b Supabase Storage upload
6.1c File validation
```

---

## Review 7 — Main implementation risks

## Risk: Cross-family data leakage

Mitigation:

* every query must use current family context
* tests should include family scoping
* use helper functions consistently

## Risk: AI-generated overengineering

Mitigation:

* every Claude prompt must include out-of-scope items
* reject generated future features
* limit files changed per increment

## Risk: Half-finished future features

Mitigation:

* no placeholder modules for OCR, notifications, integrations, teacher accounts
* no routes to unimplemented future features

## Risk: Date/time mistakes

Mitigation:

* centralize due/overdue helpers
* unit test date logic
* keep reminder logic simple

## Risk: Attachment security mistakes

Mitigation:

* private buckets
* no public file URLs
* server-side access checks
* file access tests

---

# Final Recommended Execution Order

For the most practical solo-developer path:

```text
1. Project foundation
2. Authentication
3. Parent profile and family workspace
4. Child management
5. Homework management
6. Dashboard with homework
7. Events
8. Permission slips
9. Dashboard with events and slips
10. Attachments
11. Dashboard finalization
12. Hardening and deployment
```

## Core delivery rule

Every increment must end with:

```text
working application
passing build
basic tests
manual verification
small committed change
no future feature partials
```

This roadmap is optimized so each increment can become one focused Claude conversation with a small, explicit context and a clear definition of done.
