# 🚀 Quick Deploy - 3 Steps to Production

## ⚡ Super Fast Deployment

### 1️⃣ Set Environment Variables

On your deployment platform, add these **3 required variables**:

```bash
DATABASE_URL="postgresql://user:pass@host:5432/db?schema=public"
JWT_SECRET="generate-a-random-32-character-string"
JWT_REFRESH_SECRET="generate-another-random-32-character-string"
```

**Generate secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### 2️⃣ Choose Your Platform

#### **Vercel** (Easiest)
```bash
vercel env add DATABASE_URL
vercel env add JWT_SECRET  
vercel env add JWT_REFRESH_SECRET
vercel --prod
```

#### **Railway** (Has Free Database)
```bash
railway add postgresql  # Automatic DATABASE_URL!
railway variables set JWT_SECRET="your-secret"
railway variables set JWT_REFRESH_SECRET="your-secret"
railway up
```

#### **Netlify**
Add variables in Dashboard → Site Settings → Environment
Push to Git (auto-deploys)

#### **Render**
Add variables in Dashboard → Environment
Push to Git (auto-deploys)

---

### 3️⃣ Deploy!

**That's it!** ✨

Your build script automatically:
1. Generates Prisma Client
2. Builds Next.js app
3. Deploys to production

---

## 🔍 Verify Deployment

Visit these URLs after deployment:

- ✅ Homepage: `https://yourdomain.com/`
- ✅ About: `https://yourdomain.com/about`
- ✅ Shop: `https://yourdomain.com/shop`
- ✅ Login: `https://yourdomain.com/auth/login`

Test API:
```bash
curl https://yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@temple.com","password":"demo123"}'
```

---

## 📚 More Help?

- **Detailed Guide:** See `DEPLOYMENT_GUIDE.md`
- **Fix Issues:** See `DEPLOYMENT_FIX.md`
- **Setup Database:** See `SUPABASE_SETUP_GUIDE.md`

---

## ⚠️ Common Mistakes

❌ Forgetting to set DATABASE_URL
❌ Using development DATABASE_URL in production
❌ JWT secrets too short (min 32 chars)
❌ Database not accessible from deployment platform

✅ Double-check all 3 environment variables are set!

---

**Deploy Time:** ~5 minutes
**Difficulty:** ⭐⭐☆☆☆ (Easy)

🙏 **Happy Deploying!**
