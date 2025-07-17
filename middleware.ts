import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  // Check if the route requires authentication
  const isAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');
  const isPublicRoute = 
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/register' ||
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/static');

  // Get token from cookie
  const token = request.cookies.get('token')?.value;

  // Verify token
  const isValidToken = token ? verifyToken(token) : null;

  // Redirect to login if accessing protected route without valid token
  if (!isAuthRoute && !isPublicRoute && !isValidToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to dashboard if accessing auth routes with valid token
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && isValidToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
