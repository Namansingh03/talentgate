import { auth } from "./lib/auth";
import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/user", "/company"];
const AUTH_ROUTES = ["/sign-in", "/sign-up"];

const ROLE_HOME: Record<string, string> = {
  candidate: "/user",
  employer: "/employer/dashboard",
  admin: "/company",
};

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl;

  const sessionCookie = getSessionCookie(request);
  const isAuthed = !!sessionCookie;

  if (isAuthed && authRoutes.includes(pathname)) {
  }
}
