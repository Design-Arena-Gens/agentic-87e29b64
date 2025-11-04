import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './lib/jwt';
import { ProtectedPaths } from './lib/roles';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedEntry = Object.entries(ProtectedPaths).find(([prefix]) => pathname.startsWith(prefix));
  if (!protectedEntry) return NextResponse.next();

  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.redirect(new URL('/auth/login', req.url));

  const payload = verifyJwt(token);
  if (!payload) return NextResponse.redirect(new URL('/auth/login', req.url));

  const [, roles] = protectedEntry;
  if (!roles.includes(payload.role)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/student/:path*', '/tutor/:path*', '/support/:path*', '/admin/:path*'],
};
