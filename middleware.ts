import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin_token")?.value;
  const loginSlug = process.env.NEXT_PUBLIC_ADMIN_LOGIN_SLUG || "access";

  // Protect dashboard (requires token)
  if (pathname.startsWith("/admin/dashboard")) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = `/admin/${loginSlug}/login`;
      return NextResponse.redirect(url);
    }
  }

  // Lock down login route to the configured slug only
  if (pathname.startsWith("/admin/") && pathname.endsWith("/login")) {
    const parts = pathname.split("/").filter(Boolean); // ["admin", "{slug}", "login"]
    const slug = parts[1];
    if (slug !== loginSlug) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // If already logged in, redirect to dashboard
    if (token) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
