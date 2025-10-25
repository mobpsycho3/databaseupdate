# ✅ Deployment Checklist
## Quick Reference for KuberJi Mandir Deployment

Print this or keep it open while deploying!

---

## 🎯 PHASE 1: Pre-Deployment (5 minutes)

- [ ] Code is pushed to GitHub
- [ ] Decided on platform (Railway/Vercel/Netlify)
- [ ] Account created on chosen platform
- [ ] Terminal/command prompt ready for generating secrets

---

## 🔐 PHASE 2: Generate Secrets (2 minutes)

Open terminal and run **twice** to get 2 different secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Save these somewhere safe:**
- [ ] JWT_SECRET: `_______________________________`
- [ ] JWT_REFRESH_SECRET: `_______________________________`

---

## 🗄️ PHASE 3: Database Setup (5 minutes)

### Option A: Railway (Includes Database)
- [ ] Created Railway project
- [ ] Added PostgreSQL from Railway
- [ ] DATABASE_URL auto-created ✅

### Option B: Supabase (External Database)
- [ ] Created Supabase account
- [ ] Created new project
- [ ] Waited for provisioning (2 min)
- [ ] Copied DATABASE_URL from Settings → Database → Connection string
- [ ] Used **Transaction pooler** (port 6543)
- [ ] Replaced `[YOUR-PASSWORD]` with actual password
- [ ] DATABASE_URL saved: `_______________________________`

---

## 🚀 PHASE 4: Deploy Application (5 minutes)

### Railway
- [ ] Connected GitHub repository
- [ ] App service created
- [ ] Added environment variables (see below)
- [ ] Set custom build command (if needed)
- [ ] Deployed

### Vercel
- [ ] Imported GitHub repository
- [ ] Added environment variables (see below)
- [ ] Clicked Deploy
- [ ] Build completed successfully

### Netlify
- [ ] Connected GitHub repository
- [ ] Configured build settings
- [ ] Added environment variables (see below)
- [ ] Deployed site

---

## 📝 PHASE 5: Environment Variables (3 minutes)

Add these variables on your deployment platform:

### Railway:
- [ ] `DATABASE_URL` → Auto-created by Railway ✅
- [ ] `JWT_SECRET` → Paste generated secret #1
- [ ] `JWT_REFRESH_SECRET` → Paste generated secret #2
- [ ] `NODE_ENV` → Type: `production`

### Vercel/Netlify:
- [ ] `DATABASE_URL` → Paste Supabase connection string
- [ ] `JWT_SECRET` → Paste generated secret #1
- [ ] `JWT_REFRESH_SECRET` → Paste generated secret #2
- [ ] `NODE_ENV` → Type: `production`

---

## 🔍 PHASE 6: Verification (3 minutes)

### Basic Tests:
- [ ] Homepage loads: `https://your-app.vercel.app/`
- [ ] About page works: `https://your-app.vercel.app/about`
- [ ] Shop page works: `https://your-app.vercel.app/shop`
- [ ] Login page loads: `https://your-app.vercel.app/auth/login`

### API Tests (Optional):
- [ ] Register API works (use curl or Postman)
- [ ] Login API works

### Build Verification:
- [ ] Check build logs for "Prisma Client generated successfully"
- [ ] No errors in deployment logs
- [ ] All pages load without 500 errors

---

## 🐛 TROUBLESHOOTING CHECKLIST

If deployment failed, check:

- [ ] All 4 environment variables are set correctly
- [ ] DATABASE_URL is correct (test connection separately)
- [ ] JWT secrets are at least 32 characters long
- [ ] Build logs show Prisma generation completed
- [ ] Database is accessible (not paused/restricted)
- [ ] Using correct port for Supabase (6543 for pooler)
- [ ] Password in DATABASE_URL matches actual password
- [ ] No typos in environment variable names

---

## 📊 DEPLOYMENT STATUS

**Platform:** _______________

**Database:** _______________

**Live URL:** _______________

**Deployment Date:** _______________

**Status:** ⬜ Pending | ⬜ In Progress | ⬜ Success | ⬜ Failed

---

## 🎯 SUCCESS CRITERIA

All checkmarks means successful deployment:

- [ ] ✅ Build completed without errors
- [ ] ✅ Homepage loads correctly
- [ ] ✅ API endpoints respond
- [ ] ✅ Database connection works
- [ ] ✅ No errors in browser console
- [ ] ✅ HTTPS is enabled (automatic)
- [ ] ✅ Can create/login users

---

## 📞 EMERGENCY CONTACTS

**Platform Status Pages:**
- Vercel: https://www.vercel-status.com/
- Railway: https://status.railway.app/
- Netlify: https://www.netlifystatus.com/
- Supabase: https://status.supabase.com/

**Documentation:**
- Main guide: `STEP_BY_STEP_DEPLOYMENT.md`
- Quick deploy: `QUICK_DEPLOY.md`
- Troubleshooting: `DEPLOYMENT_FIX.md`

---

## 🔄 RE-DEPLOYMENT CHECKLIST

For deploying updates:

- [ ] Code changes committed locally
- [ ] All tests pass locally
- [ ] `npm run build` succeeds locally
- [ ] Pushed to GitHub: `git push origin main`
- [ ] Platform auto-deploys (wait 2-3 min)
- [ ] Verify changes on live site
- [ ] Check logs for any errors

---

## 📈 POST-DEPLOYMENT TODO

- [ ] Set up custom domain (optional)
- [ ] Configure database backups
- [ ] Add monitoring/analytics
- [ ] Set up error tracking (Sentry)
- [ ] Test all features end-to-end
- [ ] Share live URL with team
- [ ] Document any issues encountered

---

**Last Updated:** October 25, 2024  
**For:** KuberJi Mandir Temple Management System

🙏 **Print this checklist and check off as you go!**
