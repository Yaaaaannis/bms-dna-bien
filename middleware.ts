import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allowlist
  const isWaitlist = pathname === '/waitlist';
  const isWaitlistApi = pathname.startsWith('/api/waitlist');
  const isStudio = pathname.startsWith('/studio');
  const isNextInternal = pathname.startsWith('/_next');
  const isStaticAsset =
    pathname === '/favicon.ico' ||
    pathname === '/logo.svg' ||
    pathname.startsWith('/images/') ||
    /\.(?:png|jpg|jpeg|gif|svg|webp|ico|mp4|mov|woff|woff2|otf|ttf|glb|gltf|bin)$/i.test(pathname);

  if (isWaitlist || isWaitlistApi || isStudio || isNextInternal || isStaticAsset) {
    return NextResponse.next();
  }

  // Redirect everything else to /waitlist
  const url = req.nextUrl.clone();
  url.pathname = '/waitlist';
  return NextResponse.redirect(url);
}

// Run on all paths
export const config = {
  matcher: '/:path*',
};


