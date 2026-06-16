# School Data Organizer

A web application to help organize school communications.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [pnpm](https://pnpm.io/)

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm test:e2e` | Run E2E smoke tests (Playwright) |

## Testing

### Unit tests (Vitest)

```bash
pnpm test
```

Unit tests live in `tests/unit/`. They run without a browser or server.

### E2E tests (Playwright)

First-time setup — install Playwright browsers:

```bash
pnpm playwright install chromium
```

Then run the smoke test (starts the dev server automatically):

```bash
pnpm test:e2e
```

E2E tests live in `tests/e2e/`. The Playwright config starts `pnpm dev` automatically before the tests run and reuses an already-running server if one is available.

## Deployment

This project is deployed to [Vercel](https://vercel.com). The full step-by-step guide is in [`docs/deployment-checklist.md`](docs/deployment-checklist.md).

### Quick overview

1. Push your branch to GitHub.
2. In Vercel, import the repository and accept the Next.js defaults.
3. Before deploying, add environment variables in **Settings → Environment Variables**:

   | Variable | Scope | Description |
   |---|---|---|
   | `DATABASE_URL` | Server only | Supabase PostgreSQL connection string (Session mode, port 5432) |

4. Click **Deploy**. Vercel will run `pnpm install`, `prisma generate` (via `postinstall`), and `next build` automatically.
5. Verify the production URL loads and `/` redirects to `/dashboard`.

### Security notes

- `DATABASE_URL` is a private server-side secret. Never prefix it with `NEXT_PUBLIC_`.
- Never commit a `.env` file. Only `.env.example` (with placeholder values) is committed.

## Database Setup

This project uses [Supabase](https://supabase.com) PostgreSQL accessed through [Prisma](https://prisma.io).

### First-time setup

1. Create a Supabase project at https://supabase.com
2. Go to **Settings → Database → Connection string → URI**
3. Select **Session mode (port 5432)**
4. Copy the connection string and replace `[YOUR-PASSWORD]` with your database password
5. Copy `.env.example` to `.env`:
```bash
   cp .env.example .env
```
6. Paste your connection string as the value of `DATABASE_URL` in `.env`
7. Generate the Prisma client:
```bash
   pnpm prisma generate
```
8. Push the schema to your database:
```bash
   pnpm prisma db push
```

### Prisma commands

| Command | Description |
|---|---|
| `pnpm prisma generate` | Regenerate the TypeScript client after schema changes |
| `pnpm prisma db push` | Push schema changes to the database (development) |
| `pnpm prisma studio` | Open a visual database browser at localhost:5555 |
| `pnpm prisma migrate dev` | Create a named migration file (used later in production) |