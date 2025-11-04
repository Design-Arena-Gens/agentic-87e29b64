# EduPortal – AI‑Powered Education Platform

Multi‑portal education platform inspired by `udemy.com` with:
- Student, Tutor, Support, and Admin portals
- AI‑generated quizzes after each session
- Admin‑configurable AI provider/model
- Backend APIs with Prisma ORM and SQLite (local). Ready for hosted DB in prod
- Mobile apps (Expo) for Android and iOS (skeleton included)

## Tech
- Web: Next.js 14 (App Router), Tailwind CSS
- DB/ORM: Prisma + SQLite (dev). Use Postgres/MySQL in production
- Auth: Email/password with JWT (httpOnly cookie)
- AI: OpenAI‑compatible Chat Completions (configurable via Admin)
- Mobile: Expo React Native (Android + iOS)

## Local Setup
1) Install dependencies
```bash
npm install
```

2) Initialize database (creates `prisma/dev.db`) and seed admin
```bash
npx prisma migrate dev --name init
npm run prisma:seed
```
- Admin login: `admin@eduportal.local` / `Admin@12345`

3) Start dev server
```bash
npm run dev
# http://localhost:3000
```

## AI Configuration
In the Admin portal (`/admin`), set:
- API Base: OpenAI‑compatible endpoint (e.g., `https://api.openai.com/v1`)
- API Key
- Model Name (e.g., `gpt-4o-mini`)

These values are stored in DB and used by the quiz generator API.

## Portals
- `/student` – Browse courses, generate quizzes from session content
- `/tutor` – Create courses and sessions
- `/support` – Placeholder for support tools
- `/admin` – Configure AI provider/model

## Packaging (Zip with database)
```bash
npm run package
# Outputs build/education-portal.zip (includes prisma/dev.db)
```

## Production (Vercel)
1) Ensure a production database and set env vars in Vercel:
   - `DATABASE_URL` (if switching to hosted DB; update `schema.prisma` accordingly)
   - `JWT_SECRET`
   - Optional: `AI_API_BASE`, `AI_API_KEY`, `AI_MODEL` (overridden by Admin UI)

2) Deploy with CLI
```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-87e29b64
```

Verify:
```bash
curl https://agentic-87e29b64.vercel.app
```

## Mobile Apps (Expo)
Code is in `mobile/eduportal-app`.
```bash
cd mobile/eduportal-app
npm install
npm run start
# iOS: npm run ios   Android: npm run android
```
The mobile app calls the deployed web API at `https://agentic-87e29b64.vercel.app`.

## Scripts
- `npm run dev` – Next.js dev server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run prisma:migrate` – Create/update DB schema
- `npm run prisma:seed` – Seed admin + AI config
- `npm run package` – Zip project including SQLite DB

## Notes
- SQLite is for local use only. For Vercel, switch Prisma datasource to a hosted DB.
- AI quiz generation expects OpenAI‑compatible API.