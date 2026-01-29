# Deployment Guide

## Backend Deployment (Railway)

### Step 1: Railway Account Setup
1. Visit [railway.app](https://railway.app)
2. Click "Login with GitHub"
3. Authorize Railway

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `startupBenifit` repository
4. Select **backend** folder as root directory

### Step 3: Add MongoDB Database
1. Click "+ New" → "Database" → "Add MongoDB"
2. Railway will create a MongoDB instance
3. Copy the `MONGO_URL` from variables tab

### Step 4: Set Environment Variables
Go to Variables tab and add:
```
PORT=5000
MONGODB_URI=<paste MongoDB URL from Railway>
JWT_SECRET=<generate a strong random key>
JWT_EXPIRE=7d
NODE_ENV=production
FRONTEND_URL=<will add after Vercel deployment>
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 5: Deploy
- Railway will automatically deploy
- Wait 2-3 minutes
- Copy your backend URL: `https://your-app.up.railway.app`

---

## Frontend Deployment (Vercel)

### Step 1: Vercel Account Setup
1. Visit [vercel.com](https://vercel.com)
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel

### Step 2: Import Project
1. Click "Add New" → "Project"
2. Import `startupBenifit` repository
3. Configure project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### Step 3: Environment Variables
Click "Environment Variables" and add:
```
NEXT_PUBLIC_API_URL=<Your Railway backend URL>/api
```
Example: `https://your-app.up.railway.app/api`

### Step 4: Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Copy your frontend URL: `https://your-app.vercel.app`

---

## Final Step: Connect Frontend & Backend

### Update Backend CORS
1. Go to Railway dashboard
2. Open your backend project
3. Go to Variables tab
4. Update `FRONTEND_URL` variable:
   ```
   FRONTEND_URL=<Your Vercel frontend URL>
   ```
   Example: `https://your-app.vercel.app`
5. Redeploy (Railway will auto-redeploy on variable change)

---

## Testing Deployment

### Test Backend
Visit: `https://your-backend.railway.app/api/health`

Should return:
```json
{
  "success": true,
  "message": "API is running"
}
```

### Test Frontend
Visit: `https://your-frontend.vercel.app`
- Homepage should load
- Try registering a user
- Try logging in
- Browse deals
- Claim a deal

---

## Seed Database (Optional)

### Option 1: Run Seed Script Locally
```bash
cd backend
# Update .env with Railway MongoDB URL
node seed.js
```

### Option 2: Use Railway CLI
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Run seed
railway run node seed.js
```

---

## Auto-Deployment Setup (Already Configured!)

Both platforms auto-deploy on GitHub push:

```bash
# Make changes
git add .
git commit -m "Update"
git push origin main

# Railway & Vercel automatically deploy new changes
```

---

## Monitoring & Logs

### Railway
- Dashboard → Your Project → Deployments tab
- View build logs and runtime logs

### Vercel
- Dashboard → Your Project → Deployments
- Click on deployment to see logs

---

## Troubleshooting

### Backend not connecting to MongoDB
- Check `MONGODB_URI` in Railway variables
- Ensure MongoDB plugin is running

### Frontend API calls failing
- Check `NEXT_PUBLIC_API_URL` in Vercel
- Verify backend CORS `FRONTEND_URL` is correct
- Check Railway backend logs

### 500 Errors
- Check Railway logs for backend errors
- Verify all environment variables are set

---

## Costs

- **Railway:** Free tier includes $5 credit/month (sufficient for this project)
- **Vercel:** Free tier includes unlimited deployments
- **Total Cost:** FREE! 🎉

---

## Your Live URLs

After deployment, update these:

**Backend:** `https://_____.up.railway.app`

**Frontend:** `https://_____.vercel.app`

Share the frontend URL with anyone to access your app!
