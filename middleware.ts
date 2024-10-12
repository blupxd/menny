import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Ako korisnik pokušava da pristupi /dashboard ali nije prijavljen, preusmeri ga na /login
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Ako je korisnik prijavljen i pokušava da pristupi /login ili /register, preusmeri ga na /dashboard
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

// Definišemo koje rute se štite middleware-om
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
