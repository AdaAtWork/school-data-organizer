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
* Supabase PostgreSQL
* Prisma

Already completed:

* Increment 0.1: Base Next.js app
* Increment 0.2: Tailwind CSS and shadcn/ui foundation
* Increment 0.3: Application shell navigation
* Increment 0.4: Supabase and Prisma baseline

Current increment:
Increment 0.5 — Add Testing Baseline

Goal:
Add minimal automated testing infrastructure.

In scope:

* Add Vitest setup.
* Add one simple sample unit test.
* Add Playwright setup.
* Add one smoke E2E test that verifies the app loads.
* Add package scripts for tests.
* Update README with testing instructions.

Out of scope:

* Full test suite.
* Feature-specific tests.
* Testing Supabase.
* Testing Prisma.
* Testing authentication.
* Testing real business workflows.
* Complex mocking.
* Visual regression testing.
* CI/CD setup.

Expected files/modules:

* tests/
* playwright config
* vitest config
* package.json
* README.md

Important Claude Code workflow:
Before editing files:

1. Inspect the current project structure.
2. Inspect package.json.
3. Propose a short implementation plan.
4. List the exact files you intend to create or modify.
5. Wait for my approval before making changes.

Implementation requirements:

* Keep the setup minimal.
* Use stable selectors in Playwright, preferably text or accessible roles.
* Do not write tests against components or features that do not exist.
* Do not add excessive testing utilities.
* Do not introduce unnecessary dependencies.
* Do not modify unrelated app behavior.
* Do not implement future increments.

Testing requirements:
After implementation, provide the commands I should run:

* unit test command
* E2E test command
* build command

Acceptance criteria:

* Unit test command runs successfully.
* E2E smoke test runs successfully.
* Smoke test verifies that the application loads.
* Build still succeeds.
* README explains how to run tests.

Please proceed in this order:

1. Inspect the project.
2. Propose the plan.
3. Wait for approval.
4. Implement only after approval.
5. Show a summary of changes.
6. Tell me the exact verification commands.

Before editing files, propose a plan and list the files you intend to change. Wait for my approval.
