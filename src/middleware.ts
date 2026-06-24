import { NextResponse } from "next/server";

/**
 * Admin-route hardening (defense-in-depth — NOT the primary access control).
 *
 * Sets `noindex` + `no-store` on every admin response so the admin surface is
 * never indexed by search engines or stored in shared/CDN caches, even if
 * robots.txt is ignored.
 *
 * IMPORTANT: this does NOT authenticate. The admin session lives on the
 * cross-origin backend (NEXT_PUBLIC_BACKEND_API) whose httpOnly cookie is not
 * sent to this origin, so middleware here cannot validate it. Real server-side
 * access control requires either (a) a same-site/parent-domain session cookie
 * this middleware can verify, or (b) routing the admin app behind the backend.
 * Until then, access control remains the client `useAdminSession` redirect plus
 * the backend's own authorization on every /admin/* API call.
 */
export function middleware() {
  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
  return res;
}

export const config = {
  matcher: [
    "/admin-portal/:path*",
    "/admin-dashboard/:path*",
    "/admin-users/:path*",
    "/admin-rides/:path*",
    "/admin-notifications/:path*",
  ],
};
