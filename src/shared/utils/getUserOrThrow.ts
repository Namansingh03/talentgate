"use server";

import { auth } from "@/src/config/auth";
import { headers } from "next/headers";

export async function getUserIdOrThrow() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("UNAUTHORIZED");
  }

  return session.user;
}
