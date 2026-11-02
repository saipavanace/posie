# Posie Cloud Deployment & Public Launch Guide

This guide walks you through deploying the **Posie Atelier** platform to **Vercel** with a serverless **PostgreSQL** database (**Supabase** or **Neon**).

---

## Architecture Overview

```
                                      +-----------------------------+
                                      |   Custom Domain / CDN       |
                                      |   https://atelierposie.com  |
                                      +--------------+--------------+
                                                     |
                                                     v
                                      +-----------------------------+
                                      |        Vercel Edge          |
                                      |      Next.js 15 Monorepo    |
                                      +--------------+--------------+
                                                     |
                         +---------------------------+---------------------------+
                         |                                                       |
                         v                                                       v
           +---------------------------+                           +---------------------------+
           |    Client Web Atelier     |                           |    Studio OS Admin Hub    |
           |    Route: /               |                           |    Route: /admin          |
           |    (Consumer Booking)     |                           |    (POS, Calendar, Stock) |
           +-------------+-------------+                           +-------------+-------------+
                         |                                                       |
                         +---------------------------+---------------------------+
                                                     |
                                                     v
                                      +-----------------------------+
                                      |       @posie/database       |
                                      |   Prisma ORM (PostgreSQL)   |
                                      +--------------+--------------+
                                                     |
                                                     v
                                      +-----------------------------+
                                      |  Supabase / Neon PostgreSQL |
                                      |  (Pooled + Direct Rails)    |
                                      +-----------------------------+
```

---

## Step 1: Provision a Free Cloud PostgreSQL Database

You can choose either **Supabase** or **Neon**. Both offer generous free tiers.

### Option A: Supabase (Recommended for Auth & Storage Extensions)
1. Go to [https://supabase.com](https://supabase.com) and create a free account.
2. Click **New Project**, choose a project name (e.g. `posie-production`), set a strong database password, and pick a region near your primary users (e.g. `us-east-1`).
3. Once initialized, navigate to **Project Settings** > **Database**:
   - Locate the **Connection string** section and select **URI**.
   - Copy the **Connection pooling (Transaction/Session - port 6543)** string. This is your `DATABASE_URL`.
   - Copy the **Direct connection (port 5432)** string. This is your `DIRECT_URL`.

### Option B: Neon (Serverless PostgreSQL with Instant Autoscaling)
1. Go to [https://neon.tech](https://neon.tech) and create a free account.
2. Click **Create Project** (e.g. `posie-db`).
3. In your Neon dashboard under **Connection Details**:
   - Check **Pooled connection** and copy the string -> `DATABASE_URL`.
   - Uncheck **Pooled connection** and copy the string -> `DIRECT_URL`.

---

## Step 2: Push Database Schema & Seed Cloud Database

From your local machine, run the schema push and initial seed against your cloud database:

```bash
# 1. Export your cloud connection strings in your terminal:
export DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?sslmode=require"
export DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/[DATABASE]?sslmode=require"
export PRISMA_DATABASE_PROVIDER="postgresql"

# 2. Push schema to create all tables (Salon, User, Client, Appointment, InventoryItem, Invoice, AuditLog):
pnpm --filter @posie/database db:push

# 3. Seed initial flagship salon, services, retail products, and pre-seeded user accounts:
pnpm --filter @posie/database db:seed
```

You will see:
```text
🌱 Starting Posie database seed...
✓ Created Salon: Atelier Posie Manhattan
✓ Seeded 4 Users with role-based credentials (password: password123)
✓ Seeded 4 Core Services
✓ Seeded 3 Active Clients
✓ Seeded 2 Today's Appointments
✓ Seeded 4 Retail Inventory Items
✓ Seeded Commercial Invoices
✨ Posie Database Seed Completed Successfully!
```

---

## Step 3: Deploy to Vercel

1. Push your latest code to your GitHub repository:
   ```bash
   git push origin main
   ```
2. Go to [https://vercel.com/new](https://vercel.com/new) and click **Import** next to your `posie` repository.
3. Configure the project:
   - **Framework Preset:** Next.js (automatically detected)
   - **Root Directory:** `./` (leave default, monorepo will build automatically)
   - **Build Command:** `pnpm build`
   - **Output Directory:** `apps/web/.next`
4. Expand **Environment Variables** and add the following keys:

| Variable Name | Example Value / Purpose |
| :--- | :--- |
| `DATABASE_URL` | `postgresql://...` (Pooled connection string) |
| `DIRECT_URL` | `postgresql://...` (Direct connection string) |
| `PRISMA_DATABASE_PROVIDER` | `postgresql` |
| `JWT_SECRET` | Generate using `openssl rand -hex 32` |
| `NEXT_PUBLIC_APP_URL` | `https://your-project.vercel.app` (or custom domain) |
| `NODE_ENV` | `production` |

5. Click **Deploy**. Vercel will install dependencies, compile `@posie/tokens`, `@posie/core`, `@posie/database`, and `@posie/ui`, optimize all Next.js routes, and assign your live production URL (e.g. `https://posie-atelier.vercel.app`).

---

## Step 4: Add Custom Domain & SSL (Optional)

1. In your Vercel Project Dashboard, navigate to **Settings** > **Domains**.
2. Enter your custom domain (e.g. `atelierposie.com` or `app.posie.com`).
3. Add the recommended DNS records (`CNAME` or `A` record) in your domain registrar (GoDaddy, Cloudflare, Namecheap).
4. Vercel automatically generates and renews free SSL certificates (Let's Encrypt).

---

## Production Pre-Flight Checklist

Before public launch, run the automated verification command locally:

```bash
pnpm run verify:cloud
```

This verifies:
- [x] Prisma Client compiles cleanly for PostgreSQL.
- [x] Prisma Client compiles cleanly for local SQLite.
- [x] All 184 monorepo tests pass.
- [x] All Next.js pages and API routes compile without type errors.
- [x] Monorepo configuration assets (`vercel.json`, `next.config.js`, `.env.production.example`) are present.
