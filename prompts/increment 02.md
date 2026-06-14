You are a senior frontend engineer helping me implement Increment 0.2.

Project:
School Communication Organizer

Current stack:

* Next.js
* TypeScript
* React
* App Router
* pnpm

Planned stack:

* Tailwind CSS
* shadcn/ui
* Supabase later
* Prisma later
* Vercel later

Current increment:
Increment 0.2 — Add Styling and UI Foundation

Goal:
Set up Tailwind CSS and shadcn/ui foundation.

Prerequisite:
Increment 0.1 is complete. The base Next.js app runs and builds.

Scope:

In scope:

* Verify Tailwind CSS is installed/configured.
* Configure Tailwind only if missing.
* Initialize shadcn/ui.
* Add only the minimum useful shadcn components:

  * Button
  * Card
  * Input
  * Label
* Create a very simple app shell in the homepage to prove Tailwind and shadcn work.
* Keep styling minimal.

Out of scope:

* Authentication.
* Supabase.
* Prisma.
* Database.
* Real feature pages.
* Final branding.
* Complex themes.
* Dark mode.
* Animations.
* Dashboard implementation.
* Feature-specific components.

Files expected to change:

* app/layout.tsx
* app/page.tsx
* app/globals.css
* components/ui/
* components.json
* tailwind config if present/needed
* package.json only if required by shadcn/ui

Important constraints:

* Do not over-design the UI.
* Do not create real app features.
* Do not add navigation for unfinished pages.
* Do not add animation libraries.
* Do not add dark mode yet.
* Do not add custom component libraries besides shadcn/ui.
* Follow current official shadcn/ui conventions.
* Explain every command before I run it.

Please provide:

1. Exact terminal commands to run.
2. How to answer any shadcn/ui setup prompts.
3. Which shadcn components to add and why.
4. Which files will change.
5. Minimal code/content changes needed.
6. Verification steps:

   * Tailwind classes work
   * shadcn Button/Card/Input/Label render
   * app runs locally
   * build succeeds
7. Common mistakes to avoid.

Do not implement future increments.
