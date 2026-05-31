import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin")) {
    if (pathname === "/api/admin/login") {
      return updateSession(request);
    }

    const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (!(await verifyAdminSessionToken(sessionToken))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return updateSession(request);
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (!(await verifyAdminSessionToken(sessionToken))) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
