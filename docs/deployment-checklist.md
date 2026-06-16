# Vercel Deployment Checklist

Step-by-step guide for deploying the School Data Organizer to Vercel.

---

## Pre-deployment

- [ ] Confirm the local build passes: `pnpm build`
- [ ] Confirm no secrets are committed: `git status` shows no `.env` file
- [ ] Confirm `.env.example` is committed and up to date
- [ ] Push all changes to GitHub: `git push origin main`

---

## 1. Create the Vercel project

1. Log in at [vercel.com](https://vercel.com).
2. Click **Add New → Project**.
3. Select **Import Git Repository** and connect your GitHub account if prompted.
4. Find and import the `school-data-organizer` repository.
5. Vercel will auto-detect Next.js. Accept the defaults:
   - **Framework**: Next.js
   - **Build command**: `pnpm build` (Vercel detects pnpm automatically)
   - **Output directory**: `.next` (default)
   - **Install command**: `pnpm install` (default)
6. Do **not** deploy yet — configure environment variables first (step 2).

---

## 2. Configure environment variables

In the Vercel project settings (**Settings → Environment Variables**), add:

| Variable | Value | Visibility | Notes |
|---|---|---|---|
| `DATABASE_URL` | Your Supabase connection string | **Server only** | Never expose this. Copy from Supabase → Settings → Database → Connection string → Session mode (port 5432). |

### Security rules

- `DATABASE_URL` is a private server-side secret. **Never** prefix it with `NEXT_PUBLIC_`.
- Do not paste the Supabase **service-role key** anywhere in Vercel for this project — it is not needed at this stage.
- Set environment variables to **Production** scope. Add a separate value for **Preview** environments only if you have a separate Supabase project for staging.

> **Note:** The current app shell does not make any database queries. `DATABASE_URL` is documented here for when database features are added in future increments. The initial deployment will succeed without it.

---

## 3. Deploy

1. Click **Deploy** in the Vercel dashboard.
2. Watch the build log. Confirm:
   - `pnpm install` completes.
   - `prisma generate` runs (triggered by `postinstall` script).
   - `next build` completes with no errors.
3. Vercel will provide a production URL when the deploy finishes (e.g., `https://school-data-organizer.vercel.app`).

---

## 4. Production smoke test

Once deployed, manually verify the following:

- [ ] Production URL loads in a browser (no 500 or 404 error).
- [ ] `/` redirects to `/dashboard`.
- [ ] The Dashboard page renders with the heading **"Dashboard"**.
- [ ] Navigation sidebar is visible and links are present.
- [ ] No browser console errors (open DevTools → Console).
- [ ] No secrets appear in the page source (`View Page Source`).

---

## 5. Verify no secrets are exposed

- [ ] Open the production URL and **View Page Source**. Confirm `DATABASE_URL` is not present.
- [ ] In Vercel → **Settings → Environment Variables**, confirm `DATABASE_URL` is set to **Server** scope only (not Edge or Client).

---

## Re-deployment

Vercel redeploys automatically on every push to `main`. To trigger a manual redeploy:

- Vercel dashboard → **Deployments → Redeploy**.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Build fails with "Cannot find module '@prisma/client'" | `prisma generate` did not run | Confirm `postinstall` script is in `package.json` |
| Build fails with missing env var | `DATABASE_URL` not set in Vercel | Add it in Settings → Environment Variables |
| 500 error on dashboard | Runtime DB connection error (future, when DB is wired up) | Check `DATABASE_URL` value is correct and uses port 5432 |
| Page loads but looks unstyled | Tailwind CSS not compiled | Check build log for CSS errors |
