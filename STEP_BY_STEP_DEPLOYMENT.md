# 🚀 Step-by-Step Deployment Guide
## Deploy KuberJi Mandir to Production

**Time Required:** 15-20 minutes  
**Difficulty:** Beginner-friendly  
**Cost:** Free tier available on all platforms

---

## 📋 What You'll Need

- [ ] GitHub account (free)
- [ ] Your project code pushed to GitHub
- [ ] A deployment platform account (Vercel/Railway/Netlify - all free)
- [ ] A PostgreSQL database (we'll set this up)

---

## 🎯 Choose Your Deployment Path

### Option A: **Vercel** (Easiest, Recommended)
- ✅ Easiest setup
- ✅ Automatic deployments
- ❌ Database not included (use Supabase free tier)

### Option B: **Railway** (Best for Beginners)
- ✅ Includes free database
- ✅ All-in-one solution
- ✅ Very simple setup

### Option C: **Netlify** (Alternative)
- ✅ Good performance
- ❌ Database not included

---

# 🚂 OPTION A: Railway (Recommended for Beginners)

## Step 1: Create Railway Account

1. Go to https://railway.app/
2. Click **"Start a New Project"**
3. Sign up with GitHub (click "Login with GitHub")
4. Authorize Railway to access your GitHub

---

## Step 2: Create a New Project

1. After login, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Select your repository: `databaseupdate`
4. Click **"Deploy Now"**

Railway will start deploying, but it will fail (expected) because we need the database.

---

## Step 3: Add PostgreSQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"**
3. Choose **"PostgreSQL"**
4. Wait 30 seconds for database to provision

✅ Railway automatically creates a `DATABASE_URL` variable!

---

## Step 4: Get Your DATABASE_URL

1. Click on the **PostgreSQL** service in your project
2. Go to **"Variables"** tab
3. You'll see `DATABASE_URL` - copy this value
4. It looks like: `postgresql://postgres:password@host:5432/railway`

---

## Step 5: Set Environment Variables

1. Click on your **app service** (not the database)
2. Go to **"Variables"** tab
3. Click **"+ New Variable"**

Add these **3 variables**:

### Variable 1: JWT_SECRET
```
Variable Name: JWT_SECRET
Value: (generate below)
```

**Generate secret:**
Open your terminal/command prompt and run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and paste as the value.

### Variable 2: JWT_REFRESH_SECRET
```
Variable Name: JWT_REFRESH_SECRET
Value: (generate another one using the same command above)
```

### Variable 3: NODE_ENV
```
Variable Name: NODE_ENV
Value: production
```

**DATABASE_URL is already set automatically by Railway!**

---

## Step 6: Run Database Migrations

1. Still in your app service, go to **"Settings"** tab
2. Scroll to **"Deploy"** section
3. Find **"Custom Build Command"**
4. Click **"Edit"**
5. Enter:
```bash
npm install && prisma generate && prisma migrate deploy && npm run build
```
6. Click **"Save"**

---

## Step 7: (Optional) Seed the Database

If you want to add sample data (temples, users, etc.):

1. In Railway, click on your app service
2. Go to **"Settings"**
3. Under **"Deploy"**, click **"Deploy"** dropdown
4. Select **"Deploy with Custom Command"**
5. Enter:
```bash
npx prisma db seed
```

---

## Step 8: Redeploy

1. Go to **"Deployments"** tab in your app service
2. Click **"Deploy"** on the latest deployment
3. Or push a new commit to trigger automatic deployment

---

## Step 9: Get Your Live URL

1. Go to **"Settings"** tab
2. Scroll to **"Domains"**
3. Click **"Generate Domain"**
4. Copy your URL: `https://your-app.up.railway.app`

🎉 **Your app is live!**

---

# 🔷 OPTION B: Vercel + Supabase

## Part 1: Setup Supabase Database

### Step 1: Create Supabase Account

1. Go to https://supabase.com/
2. Click **"Start your project"**
3. Sign in with GitHub
4. Authorize Supabase

---

### Step 2: Create a New Project

1. Click **"New project"**
2. Choose your organization (or create one)
3. Fill in project details:
   - **Name:** `kuberji-temple`
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose closest to India (e.g., Singapore)
   - **Pricing Plan:** Free
4. Click **"Create new project"**
5. Wait 2 minutes for provisioning

---

### Step 3: Get Database Connection String

1. In your Supabase project, click **"Project Settings"** (gear icon, bottom left)
2. Click **"Database"** in the left menu
3. Scroll to **"Connection string"**
4. Select **"URI"** tab
5. Copy the connection string
6. Replace `[YOUR-PASSWORD]` with your actual database password

Example:
```
postgresql://postgres.xyz:YOUR-PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

**⚠️ Important:** Use the **Transaction pooler** (port 6543) for production!

---

### Step 4: Run Database Migrations

**Option 1: Using Supabase SQL Editor**

1. In Supabase, go to **"SQL Editor"**
2. We need to run migrations manually. First, generate the SQL:

On your local computer:
```bash
# Navigate to your project
cd path/to/your/project

# Generate migration SQL
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > migration.sql
```

3. Copy the contents of `migration.sql`
4. Paste into Supabase SQL Editor
5. Click **"Run"**

**Option 2: Using Prisma Migrate (Recommended)**

On your local computer:
```bash
# Set your DATABASE_URL
export DATABASE_URL="postgresql://postgres.xyz:YOUR-PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"

# Run migrations
npx prisma migrate deploy

# Seed database (optional)
npx prisma db seed
```

---

## Part 2: Deploy to Vercel

### Step 1: Create Vercel Account

1. Go to https://vercel.com/
2. Click **"Sign Up"**
3. Sign up with GitHub
4. Authorize Vercel

---

### Step 2: Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository: `databaseupdate`
3. Click **"Import"**

---

### Step 3: Configure Project

1. **Framework Preset:** Next.js (should auto-detect)
2. **Root Directory:** `./` (leave as is)
3. **Build Command:** Leave default (uses package.json)
4. **Output Directory:** `.next` (should auto-fill)

---

### Step 4: Add Environment Variables

**BEFORE clicking Deploy**, add environment variables:

1. Click **"Environment Variables"** dropdown
2. Add these variables:

**Variable 1: DATABASE_URL**
```
Name: DATABASE_URL
Value: postgresql://postgres.xyz:YOUR-PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```
(Paste your Supabase connection string)

**Variable 2: JWT_SECRET**
```
Name: JWT_SECRET
Value: (generate using command below)
```

**Variable 3: JWT_REFRESH_SECRET**
```
Name: JWT_REFRESH_SECRET
Value: (generate another)
```

**Variable 4: NODE_ENV**
```
Name: NODE_ENV
Value: production
```

**Generate secrets:** Open terminal and run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Step 5: Deploy!

1. After adding all 4 environment variables
2. Click **"Deploy"**
3. Wait 2-3 minutes for build
4. ✅ You'll see "Congratulations!" when done

---

### Step 6: Get Your Live URL

1. Click **"Visit"** button
2. Your URL: `https://your-app.vercel.app`

🎉 **Your app is live!**

---

# 🟢 OPTION C: Netlify + Supabase

## Part 1: Setup Database (Same as Vercel)

Follow **"Part 1: Setup Supabase Database"** from Option B above.

---

## Part 2: Deploy to Netlify

### Step 1: Create Netlify Account

1. Go to https://netlify.com/
2. Click **"Sign up"**
3. Sign up with GitHub
4. Authorize Netlify

---

### Step 2: Create New Site

1. Click **"Add new site"** → **"Import an existing project"**
2. Click **"Deploy with GitHub"**
3. Authorize Netlify (if needed)
4. Select your repository: `databaseupdate`

---

### Step 3: Configure Build Settings

1. **Branch to deploy:** `main` (or your default branch)
2. **Build command:** `npm run build`
3. **Publish directory:** `.next`

---

### Step 4: Add Environment Variables

1. Click **"Advanced"** → **"New variable"**
2. Add these 4 variables (same as Vercel):

```
DATABASE_URL = your_supabase_connection_string
JWT_SECRET = generated_secret_32_chars
JWT_REFRESH_SECRET = another_generated_secret
NODE_ENV = production
```

---

### Step 5: Deploy!

1. Click **"Deploy site"**
2. Wait 3-4 minutes
3. ✅ Site is live!

Your URL: `https://random-name.netlify.app`

You can customize this in **Site settings** → **Domain management**

---

# ✅ Post-Deployment Checklist

After deploying, verify everything works:

## Test 1: Check Homepage

Visit your URL: `https://your-app.vercel.app/`

✅ Should see the temple homepage

---

## Test 2: Check About Page

Visit: `https://your-app.vercel.app/about`

✅ Should see the about page with deities

---

## Test 3: Test API - Register

Open terminal/command prompt:

```bash
curl -X POST https://your-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","phone":"1234567890"}'
```

✅ Should return success with user data

---

## Test 4: Test API - Login

```bash
curl -X POST https://your-app.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

✅ Should return success with token

---

## Test 5: Test Database

If you seeded the database, try:

1. Visit: `https://your-app.vercel.app/shop`
2. ✅ Should see products/services

---

# 🐛 Troubleshooting

## Issue: Build Failed

**Check build logs:**

1. In Vercel: Click deployment → View logs
2. In Railway: Deployments tab → Click deployment
3. In Netlify: Deploys → Failed deploy → View details

**Common causes:**
- Missing environment variables
- Database connection failed
- Syntax errors in code

---

## Issue: "Prisma Client not initialized"

**Solution:**

1. Verify `DATABASE_URL` is set
2. Check build logs for "Generating Prisma Client"
3. Rebuild/redeploy

---

## Issue: "Can't reach database"

**Solution:**

For Supabase:
1. Check password is correct in DATABASE_URL
2. Use **pooler** connection string (port 6543)
3. Verify database is not paused

For Railway:
1. Check if database service is running
2. Verify DATABASE_URL is set

---

## Issue: API returns 500 errors

**Solution:**

1. Check server logs in deployment platform
2. Verify all environment variables are set
3. Check database has tables (run migrations)

---

## Issue: Environment variables not working

**Solution:**

1. Verify variable names (case-sensitive)
2. Redeploy after adding variables
3. Check variables are set for Production environment

---

# 🔐 Security Checklist

After deployment:

- [ ] ✅ DATABASE_URL is not exposed in client code
- [ ] ✅ JWT secrets are strong (32+ characters)
- [ ] ✅ `.env` file is in `.gitignore` (not committed)
- [ ] ✅ HTTPS is enabled (automatic on all platforms)
- [ ] ✅ Database password is strong
- [ ] ✅ No secrets in GitHub repository

---

# 📊 Monitoring Your App

## Check Deployment Status

**Vercel:**
- Dashboard → Your project → Deployments

**Railway:**
- Project → Deployments tab

**Netlify:**
- Site → Deploys

---

## View Logs

**Vercel:**
- Deployment → Functions tab → View logs

**Railway:**
- Deployment → View logs button

**Netlify:**
- Deploy → Function logs

---

## Database Monitoring

**Supabase:**
- Project → Database → Logs
- Monitor connection pool usage

**Railway:**
- PostgreSQL service → Metrics tab

---

# 🔄 Making Updates

## To Deploy New Changes:

1. **Make changes** to your code locally
2. **Commit** changes:
   ```bash
   git add .
   git commit -m "Update feature"
   ```
3. **Push** to GitHub:
   ```bash
   git push origin main
   ```
4. **Automatic deployment** triggers on all platforms!

---

## To Update Environment Variables:

**Vercel:**
1. Project → Settings → Environment Variables
2. Edit variable → Save
3. Redeploy from Deployments tab

**Railway:**
1. Service → Variables
2. Edit variable
3. Auto-redeploys

**Netlify:**
1. Site settings → Environment variables
2. Edit variable → Save
3. Trigger new deploy

---

# 🎯 Next Steps After Deployment

1. **Custom Domain** (Optional)
   - Vercel: Settings → Domains
   - Railway: Settings → Domains
   - Netlify: Site settings → Domain management

2. **SSL Certificate** (Automatic)
   - All platforms auto-enable HTTPS
   - Certificate auto-renews

3. **Set up Monitoring**
   - Consider: Sentry for error tracking
   - Google Analytics for traffic

4. **Database Backups**
   - Supabase: Automatic daily backups
   - Railway: Settings → Backups

5. **Performance Optimization**
   - Add CDN for images
   - Enable caching
   - Optimize database queries

---

# 📞 Need Help?

## Platform Support:

- **Vercel:** https://vercel.com/support
- **Railway:** https://railway.app/discord (Discord community)
- **Netlify:** https://www.netlify.com/support/
- **Supabase:** https://supabase.com/support

## Check Logs First!

90% of issues can be solved by reading the deployment logs carefully.

---

# 🎉 Congratulations!

You've successfully deployed the KuberJi Mandir temple management system!

**Your live app is at:**
- Vercel: `https://your-app.vercel.app`
- Railway: `https://your-app.up.railway.app`
- Netlify: `https://your-app.netlify.app`

**What you've accomplished:**
- ✅ Deployed a full-stack Next.js application
- ✅ Set up a production PostgreSQL database
- ✅ Configured environment variables securely
- ✅ Automated deployments from GitHub
- ✅ HTTPS enabled automatically

---

**Created:** October 25, 2024  
**For:** KuberJi Mandir, Pandukeshwar  
**By:** DevLo Assistant

🙏 **May your deployment bring success!**
