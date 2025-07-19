import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

const publicPaths = ["/login", "/register", "/", "/favicon.ico"];
const staticPaths = ["/_next", "/static", "/images"];

export function middleware(request: NextRequest) {
  console.log("Middleware executing for path:", request.nextUrl.pathname);

  // Check if the current path is public
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);
  const isStaticPath = staticPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );
  const isApiPath = request.nextUrl.pathname.startsWith("/api");

  // Get token from cookie
  const token = request.cookies.get("token")?.value;
  console.log("Token present:", !!token);

  // Verify token if present
  const isValidToken = token ? verifyToken(token) : null;
  console.log("Token valid:", !!isValidToken);

  // Allow API routes to handle their own auth
  if (isApiPath) {
    return NextResponse.next();
  }

  // Allow public and static paths
  if (isPublicPath || isStaticPath) {
    // If user is authenticated and tries to access login/register, redirect to dashboard
    if (
      isValidToken &&
      (request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/register")
    ) {
      console.log("Authenticated user redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protected routes
  if (!isValidToken) {
    console.log("Unauthenticated user redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access to protected routes for authenticated users
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
