import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("🚫 MIDDLEWARE DISABLED - allowing all requests");
  console.log("📍 Path:", request.nextUrl.pathname);

  // Allow everything through - NO AUTHENTICATION CHECKS
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
