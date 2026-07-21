"use server";

import { auth } from "@/src/config/auth";
import { headers } from "next/headers";
import { createResponse } from "./createResponse";
import prismaDb from "@/src/server/db/db";
import { Roles } from "@/prisma/generated/enums";

export async function getSessionRole(role: Roles) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return createResponse(false, "session not found");
  }

  const user = await prismaDb.user.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      role: true,
    },
  });

  if (!user) {
    return createResponse(false, "User not found");
  }

  if (user.role === role) {
    return createResponse(false, "unauthorized");
  }

  return createResponse(true, "authorized");
}
