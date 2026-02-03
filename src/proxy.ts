import { type NextRequest, NextResponse } from "next/server";

/**
 * Next.js proxy - runs on Node.js runtime before page render.
 *
 * Currently a pass-through, but configured to run on all non-static routes.
 * Use this for auth checks, redirects, header manipulation, A/B testing, etc.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */
export const proxy = (_request: NextRequest): NextResponse => {
  return NextResponse.next();
};

export const config = {
  // Skip proxy for Next.js internals, API routes, and public folder
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
