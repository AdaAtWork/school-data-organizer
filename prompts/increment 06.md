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
* GitHub
* Vercel

Already completed:

* Increment 0.1: Base Next.js app
* Increment 0.2: Styling and UI foundation
* Increment 0.3: Application shell navigation
* Increment 0.4: Supabase and Prisma baseline

Current increment:
Increment 0.6 — First Vercel Deployment

Goal:
Deploy the application shell.

In scope:

* Prepare the application for Vercel deployment.
* Review environment variables.
* Create a deployment checklist.
* Create deployment documentation.
* Update README.
* Verify that the project is deployment-ready.

Out of scope:

* Production authentication.
* Production monitoring.
* Production database schema.
* Production business data.
* CI/CD pipelines.
* GitHub Actions.
* Future roadmap increments.

Expected files that may change:

* README.md
* .env.example
* deployment notes/documentation

Important workflow requirements:

Before editing files:

1. Inspect the current project.
2. Inspect package.json.
3. Inspect environment variable usage.
4. Propose an implementation plan.
5. List every file that will be modified.
6. Wait for my approval.

Security requirements:

* Never hardcode secrets.
* Never generate real API keys.
* Never expose Supabase service-role keys.
* Clearly distinguish between:

  * NEXT_PUBLIC_* variables
  * server-side private variables
* Assume development and production environments are separate.

Deployment requirements:

Help me prepare for deployment, but DO NOT deploy automatically.

Instead:

* Explain how to create the Vercel project.
* Explain which environment variables should be configured.
* Explain which values belong in Vercel.
* Explain which values should never be public.
* Generate a production smoke-test checklist.

README requirements:

Add a Deployment section that explains:

* how to connect GitHub
* how to configure environment variables
* how to trigger deployment
* how to verify deployment

Acceptance criteria:

* Application is ready for deployment.
* Build succeeds.
* Environment variables are documented.
* No secrets are committed.
* README contains deployment instructions.

Please work in this order:

1. Inspect the project.
2. Propose the plan.
3. Wait for my approval.
4. Implement approved changes.
5. Summarize all modifications.
6. Tell me exactly which commands I should run.
7. Tell me exactly which actions I should perform manually in the Vercel dashboard.

Do not implement future increments.
Do not automatically deploy the application.
Do not modify unrelated files.
