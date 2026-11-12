import { NextRequest, NextResponse } from 'next/server';

const protectedPaths = ['/dashboard', '/assistant', '/markets', '/pricing', '/profile', '/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = request.cookies.get('ribh_session')?.value;

  if (session !== 'authenticated') {
    const redirectUrl = new URL('/auth', request.url);
    redirectUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/assistant/:path*', '/markets/:path*', '/pricing/:path*', '/profile/:path*', '/admin/:path*']
};

