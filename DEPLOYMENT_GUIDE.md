# 🚀 Deployment Guide - KuberJi Mandir Temple Management System

This guide covers deploying the KuberJi Mandir application to various platforms.

---

## 📋 Pre-Deployment Checklist

- [ ] Database setup complete (PostgreSQL/Supabase)
- [ ] Environment variables configured
- [ ] Prisma migrations run
- [ ] Database seeded (optional)
- [ ] Build tested locally

---

## 🔧 Required Environment Variables

**⚠️ CRITICAL:** Set these environment variables on your deployment platform BEFORE deployment:

```bash
# Database (REQUIRED)
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"

# JWT Secrets (REQUIRED)
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"
JWT_REFRESH_SECRET="your-super-secret-refresh-token-key-minimum-32-characters"

# Environment
NODE_ENV="production"

# App URL
NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# Payment Gateway (if using payments)
RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"

# Email (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

---

## 🌐 Platform-Specific Deployment Instructions

### 1️⃣ **Vercel** (Recommended)

#### Step 1: Install Vercel CLI (optional)
```bash
npm i -g vercel
```

#### Step 2: Connect to Vercel
```bash
vercel login
vercel link
```

#### Step 3: Set Environment Variables
Go to your project on Vercel Dashboard → Settings → Environment Variables

Add all variables from the checklist above.

#### Step 4: Configure Build Settings
In `vercel.json` (create if not exists):
```json
{
  "buildCommand": "prisma generate && prisma migrate deploy && next build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["bom1"]
}
```

#### Step 5: Deploy
```bash
vercel --prod
```

**Important Notes:**
- Vercel automatically runs `npm install` which triggers our `postinstall` script
- The build command includes `prisma generate` before building
- Make sure DATABASE_URL is set in environment variables

---

### 2️⃣ **Netlify**

#### Step 1: Create `netlify.toml`
```toml
[build]
  command = "prisma generate && prisma migrate deploy && npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### Step 2: Set Environment Variables
In Netlify Dashboard → Site Settings → Build & Deploy → Environment Variables

Add all variables from the checklist above.

#### Step 3: Deploy
Push to your Git repository or use Netlify CLI:
```bash
netlify deploy --prod
```

---

### 3️⃣ **Railway**

#### Step 1: Install Railway CLI
```bash
npm i -g @railway/cli
railway login
```

#### Step 2: Initialize Project
```bash
railway init
```

#### Step 3: Add PostgreSQL
```bash
railway add postgresql
```

Railway automatically sets `DATABASE_URL` for you!

#### Step 4: Set Other Environment Variables
```bash
railway variables set JWT_SECRET="your-secret"
railway variables set JWT_REFRESH_SECRET="your-refresh-secret"
railway variables set NODE_ENV="production"
```

#### Step 5: Deploy
```bash
railway up
```

---

### 4️⃣ **Render**

#### Step 1: Create `render.yaml` (optional)
```yaml
services:
  - type: web
    name: kuberji-temple
    env: node
    buildCommand: npm install && prisma generate && prisma migrate deploy && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        generateValue: true
      - key: JWT_REFRESH_SECRET
        generateValue: true
```

#### Step 2: Create PostgreSQL Database
In Render Dashboard → New → PostgreSQL

Copy the **Internal Database URL**

#### Step 3: Set Environment Variables
In your Web Service → Environment → Add all variables

#### Step 4: Deploy
Connect your GitHub repository and deploy!

---

### 5️⃣ **DigitalOcean App Platform**

#### Step 1: Connect Repository
Connect your GitHub/GitLab repository

#### Step 2: Configure Build
- **Build Command:** `npm install && prisma generate && prisma migrate deploy && npm run build`
- **Run Command:** `npm start`

#### Step 3: Add PostgreSQL Database
Add a managed PostgreSQL database from DigitalOcean

#### Step 4: Set Environment Variables
Add all variables in the Environment section

---

### 6️⃣ **AWS (EC2 + RDS)**

#### Step 1: Setup RDS PostgreSQL
1. Create PostgreSQL instance in RDS
2. Note down connection details

#### Step 2: Setup EC2 Instance
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone <your-repo-url>
cd <repo-name>

# Install dependencies
npm install

# Set up environment variables
nano .env
# Add all required variables

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Build the app
npm run build

# Start with PM2
pm2 start npm --name "kuberji-temple" -- start
pm2 save
pm2 startup
```

---

## 🔍 Troubleshooting Common Deployment Errors

### Error: "Prisma Client did not initialize"
**Solution:**
1. Ensure `DATABASE_URL` is set in environment variables
2. Make sure build script includes `prisma generate`
3. Check build logs to verify Prisma generation succeeded

```bash
# Build script should be:
"build": "prisma generate && next build"
```

### Error: "Missing required environment variable: DATABASE_URL"
**Solution:**
1. Add `DATABASE_URL` to your deployment platform's environment variables
2. Ensure it's available during build time (not just runtime)
3. For Prisma, use the full connection string format

### Error: "Can't reach database server"
**Solution:**
1. Check if database is publicly accessible
2. Verify connection string format
3. Check firewall rules
4. For Supabase: Use the "Connection Pooling" string for production

### Error: "Build times out"
**Solution:**
1. Increase build timeout in platform settings
2. Use a smaller/faster build machine
3. Consider caching node_modules

---

## 🗄️ Database Migration on Deployment

### First Deployment
```bash
# Run this after setting up DATABASE_URL
npx prisma migrate deploy
npx prisma db seed  # Optional: seed data
```

### Subsequent Deployments
```bash
# Only if schema changes
npx prisma migrate deploy
```

### Build Script with Auto-Migration
```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

**⚠️ Warning:** Only use `migrate deploy` in production. Never use `migrate dev`.

---

## 🔐 Security Checklist

- [ ] All secrets are stored as environment variables
- [ ] `.env` file is in `.gitignore`
- [ ] JWT secrets are at least 32 characters
- [ ] Database has strong password
- [ ] HTTPS is enabled (SSL/TLS)
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled (future)
- [ ] Database backups are scheduled

---

## 📊 Post-Deployment Testing

### Test Authentication
```bash
curl -X POST https://yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123","phone":"1234567890"}'
```

### Test Database Connection
Check logs to ensure Prisma can connect to the database.

### Test Pages
Visit:
- Homepage: `https://yourdomain.com/`
- About: `https://yourdomain.com/about`
- Shop: `https://yourdomain.com/shop`
- Login: `https://yourdomain.com/auth/login`

---

## 🎯 Performance Optimization

### Enable Caching
Add to `next.config.mjs`:
```javascript
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
}
```

### Database Connection Pooling
For production, use Supabase connection pooling or PgBouncer:
```bash
DATABASE_URL="postgresql://user:pass@host:6543/db?pgbouncer=true"
```

---

## 📱 Monitoring

### Set Up Error Tracking
Consider adding Sentry:
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Database Monitoring
Monitor your database:
- Connection pool usage
- Slow queries
- Database size

---

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npx prisma generate
      - run: npm run build
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 📞 Support

If you encounter issues:
1. Check build logs carefully
2. Verify all environment variables are set
3. Test database connection separately
4. Review the troubleshooting section above

---

## ✅ Quick Deployment Commands

### Vercel
```bash
vercel env pull .env.local
npm install
npx prisma generate
npx prisma migrate deploy
vercel --prod
```

### Railway
```bash
railway link
railway up
```

### Render
```bash
# Just push to GitHub - automatic deployment
git push origin main
```

---

**Last Updated:** October 25, 2024
**Version:** 1.0.0

🙏 **For KuberJi Mandir, Pandukeshwar**
