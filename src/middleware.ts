import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken && !refreshToken) {
    if (pathname !== '/signin' && pathname !== '/signup') {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  } else {
    if (pathname === '/signin' || pathname === '/signup') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/', '/dashboard', '/signin', '/signup'],
};
