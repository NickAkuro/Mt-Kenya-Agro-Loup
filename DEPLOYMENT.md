# Deployment Guide (Render + Vercel)

## Environments

| Scope    | Branch   | Backend envs                                                                 | Frontend envs                               |
|----------|----------|-------------------------------------------------------------------------------|---------------------------------------------|
| Staging  | staging  | `NODE_ENV=staging`, `MONGODB_URI=<atlas-staging>`, `ALLOWED_ORIGIN=https://<staging-frontend>`, `PORT` (Render) | `VITE_API_URL=https://<staging-backend>`    |
| Prod     | main     | `NODE_ENV=production`, `MONGODB_URI=<atlas-prod>`, `ALLOWED_ORIGIN=https://<prod-frontend>`, `PORT` (Render)    | `VITE_API_URL=https://<prod-backend>`       |

## Backend (Render)
1) Create MongoDB Atlas cluster(s); get staging and prod URIs.
2) On Render: New Web Service → connect this repo → root: `backend`.
3) Build command: `npm install` (Render uses deploy build step).
4) Start command: `npm start`.
5) Environment variables per environment (see table).
6) Health check: `GET /health` (used by uptime monitors).
7) Deployment hooks (for GitHub Actions):
   - Prod: `RENDER_BACKEND_DEPLOY_HOOK`
   - Staging: `RENDER_BACKEND_STAGING_DEPLOY_HOOK`

## Frontend (Vercel)
1) Import project → set root to `frontend`.
2) Build command: `npm run build`; output: `dist`.
3) Env vars per environment (see table).
4) Enable auto-deploy on `main` (prod) and `staging` (preview). For custom domain, add domain in Vercel (HTTPS auto).
5) Vercel tokens/IDs for GitHub Actions:
   - Prod: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
   - Staging: `VERCEL_STAGING_TOKEN`, `VERCEL_STAGING_ORG_ID`, `VERCEL_STAGING_PROJECT_ID`

## Local Production Smoke Test
- Backend: `cd backend && npm install && npm run dev` (or `npm start` with `.env`).
- Frontend: `cd frontend && npm install && npm run build && npm run preview`.
- Visit http://localhost:4173 with `VITE_API_URL=http://localhost:5000`.

## Monitoring Suggestions
- UptimeRobot/BetterStack ping `https://<backend>/health` and frontend root.
- Logs: Render dashboard; add Sentry/Logtail later if needed.
