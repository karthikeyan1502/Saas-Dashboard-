// Middleware for route protection (demo mode - allows all access)
// In production, integrate with NextAuth or your auth solution

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Demo mode: allow all routes
  // In production, add authentication checks here
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
