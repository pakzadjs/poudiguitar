import { NextResponse } from "next/server";
import middlewareAuth from "./utils/middlewareAuth";

export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/profile")) {
    const user = await middlewareAuth(req);
    if (!user) return NextResponse.redirect(new URL("/auth", url));
  }

  if (pathname.startsWith("/admin")) {
    const user = await middlewareAuth(req);
    if (!user) return NextResponse.redirect(new URL("/auth", url));
    if (user && user.role !== "ADMIN") return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/auth")) {
    const user = await middlewareAuth(req);
    if (user) return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/complete-profile")) {
    const user = await middlewareAuth(req);
    if (user?.isActive) return NextResponse.redirect(new URL("/profile", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/auth", "/complete-profile"],
};
