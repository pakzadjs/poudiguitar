import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;

  if (pathname.startWith("/profile")) {
  }

  if (pathname.startWith("/admin")) {
  }
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
