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