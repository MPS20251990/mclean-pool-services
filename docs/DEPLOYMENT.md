# Deployment Guide — McLean Pool Services

## Prerequisites
- GitHub account with repo access
- Netlify account (free tier works)
- Node.js 18+ (for local development)

## Initial Setup
1. Clone the repo: `git clone https://github.com/MPS20251990/mclean-pool-services.git`
2. Install Netlify CLI: `npm install -g netlify-cli`
3. Login: `netlify login`
4. Link site: `netlify init`

## Environment Variables
Set these in Netlify Dashboard > Site Settings > Environment Variables:
- `REVIEW_ADMIN_TOKEN` — Secret token for approving/rejecting reviews

## Form Notifications
1. Go to Netlify Dashboard > Forms > Form notifications
2. Add email notification for "contact-form" — send to Mcleanpoolservicesllc@gmail.com
3. Add email notification for "review-submission" — send to Mcleanpoolservicesllc@gmail.com

## Local Development
```bash
npm run dev
```
This starts the Netlify Dev server with serverless functions.

## Deploy
```bash
npm run deploy
```
Runs pre-deploy checks then deploys to production.

## Manual Deploy
Push to `main` branch — Netlify auto-deploys on push.

## Useful Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build:reviews` | Merge approved reviews |
| `npm run backup` | Backup data files |
| `npm run deploy` | Deploy to production |
