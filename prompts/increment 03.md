You are a senior frontend engineer helping me implement Increment 0.3.
I am a junior developer using Claude for my first AI-assisted project, so explain clearly what I need to do and why.
Project: School Communication Organizer
Current stack:

* Next.js
* TypeScript
* React
* App Router
* pnpm
* Tailwind CSS
* shadcn/ui
Already completed:

* Increment 0.1: Base Next.js app
* Increment 0.2: Tailwind CSS and shadcn/ui foundation
Current increment: Increment 0.3 — Create Application Shell Navigation
Goal: Create placeholder navigation for the MVP modules.
In scope:

* Create an app shell.
* Create placeholder pages for MVP modules.
* Add main navigation.
* Add a simple mobile-friendly navigation foundation.
Required placeholder pages:

* Dashboard
* Children
* Homework
* Events
* Permission Slips
* Attachments
* Profile/Settings
Out of scope:

* Authentication.
* Supabase.
* Prisma.
* Database.
* Real data.
* Auth protection.
* Dashboard logic.
* CRUD functionality.
* Teacher management.
* School management.
* Class management.
* Notifications page.
* Final branding.
Expected folders/files:

* app/(app)/
* app/(app)/layout.tsx
* app/(app)/dashboard/page.tsx
* app/(app)/children/page.tsx
* app/(app)/homework/page.tsx
* app/(app)/events/page.tsx
* app/(app)/permission-slips/page.tsx
* app/(app)/attachments/page.tsx
* app/(app)/profile/page.tsx
* components/layout/
* components/navigation/
Important implementation rules:

* Use Next.js App Router route groups.
* Use simple placeholder content only.
* Use existing shadcn/ui components where appropriate.
* Keep navigation simple.
* Do not implement real feature logic.
* Do not add routes outside the MVP.
* Do not add unnecessary dependencies.
* Do not over-engineer responsive behavior.
* The app must still build successfully.
Please provide:

1. Exact files to create or modify.
2. The recommended route structure.
3. The layout/navigation approach.
4. The code for each file.
5. Manual steps I should perform in VS Code.
6. Commands I should run in the terminal.
7. Verification steps:
   * app starts locally
   * user can navigate between placeholder pages
   * build succeeds
8. Common mistakes to avoid.
Do not implement future increments.