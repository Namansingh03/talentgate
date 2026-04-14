import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth"; // your auth helper

export async function proxy(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (pathname === "/") {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = session.user.role;

  if (pathname.startsWith("/candidate") && role !== "candidate") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname.startsWith("/employer") && role !== "employer") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
