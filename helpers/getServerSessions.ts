"use server";

import { ApiResponse, createResponse } from "./createResponse";
import type { User } from "better-auth";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getServerSession(): Promise<ApiResponse<User | null>> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return createResponse(false, "Unauthorized request", null, {
      redirectUrl: "/",
    });
  }

  return createResponse(true, "user found", session.user);
}
