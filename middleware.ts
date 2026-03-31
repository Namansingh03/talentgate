import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/verify-email")
  ) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const role = session.user.role;

  if (pathname.startsWith("/employer") && role !== "EMPLOYER") {
    return NextResponse.redirect(new URL("/candidate", req.url));
  }

  if (pathname.startsWith("/candidate") && role !== "CANDIDATE") {
    return NextResponse.redirect(new URL("/employer", req.url));
  }

  //   if (pathname.startsWith("/admin") && role !== "ADMIN") {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }

  if (pathname === "/") {
    if (role === "EMPLOYER") {
      return NextResponse.redirect(new URL("/employer", req.url));
    } else {
      return NextResponse.redirect(new URL("/candidate", req.url));
    }
  }

  return NextResponse.next();
}
