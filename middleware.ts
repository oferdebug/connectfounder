import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login", "/register", "/", "/favicon.ico"];
const staticPaths = ["/_next", "/static", "/images", "/icons"];

export function middleware(request: NextRequest) {
  console.log("Middleware executing for path:", request.nextUrl.pathname);

  // Check if the current path is public
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);
  const isStaticPath = staticPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );
  const isApiPath = request.nextUrl.pathname.startsWith("/api");

  // Get authentication cookies
  const token = request.cookies.get("token")?.value;
  const isAuthenticated =
    request.cookies.get("isAuthenticated")?.value === "true";

  console.log("Token present:", !!token);
  console.log("Auth cookie present:", isAuthenticated);

  // Allow API routes to handle their own auth
  if (isApiPath) {
    console.log("API route - allowing through");
    return NextResponse.next();
  }

  // Allow static files and assets
  if (isStaticPath) {
    return NextResponse.next();
  }

  // Allow public paths
  if (isPublicPath) {
    // If user is authenticated and tries to access login/register, redirect to dashboard
    if (
      isAuthenticated &&
      token &&
      (request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/register")
    ) {
      console.log(
        "Authenticated user accessing login/register - redirecting to dashboard"
      );
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    console.log("Public path - allowing through");
    return NextResponse.next();
  }

  // Protected routes - check if user is authenticated
  if (!isAuthenticated || !token) {
    console.log(
      "Unauthenticated user accessing protected route - redirecting to login"
    );
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access to protected routes for authenticated users
  console.log(
    "Authenticated user accessing protected route - allowing through"
  );
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - *.map (source maps)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.map$).*)",
  ],
};
