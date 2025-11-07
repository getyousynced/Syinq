# SYINQ Admin Dashboard (Next.js + Tailwind + shadcn/ui)

Light-theme admin dashboard aligned with SYINQ's site style.
- Secure login at `/admin/[slug]/login` (configure `NEXT_PUBLIC_ADMIN_LOGIN_SLUG`)
- Protected dashboard at `/admin/dashboard`
- Mock data now; drop-in real API later
- 30s timeout helper ready in `lib/api.ts`

## Quickstart
```bash
npm install
cp .env.local.example .env.local
# (optional) edit NEXT_PUBLIC_ADMIN_LOGIN_SLUG
npm run dev
```

Open: http://localhost:3000/admin/access/login

## Swap to real APIs
- Replace AdminAPI functions in `lib/api.ts` with real endpoints:
  - POST `${API_BASE}/api/admin/login`
  - GET  `${API_BASE}/api/admin/universities`
  - POST `${API_BASE}/api/admin/accept/:id`
  - POST `${API_BASE}/api/admin/reject/:id`
- Prefer httpOnly auth cookie from backend (set-cookie) instead of client-side cookie.

## Structure
```
app/
  admin/[slug]/login/page.tsx  # secure login
  admin/dashboard/page.tsx     # dashboard
  admin/layout.tsx             # header wrapper
components/
  layout/Header.tsx, Sidebar.tsx
  ui/button.tsx, card.tsx, input.tsx, badge.tsx, tabs.tsx
lib/
  api.ts (timeout + placeholders)
  mock.ts (fake data)
middleware.ts  # route security
```
