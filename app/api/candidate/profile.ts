"use server";

import { createResponse } from "@/helpers/createResponse";
import { auth } from "@/lib/auth";
import prismaDb from "@/lib/db";
import { headers } from "next/headers";

export async function getUserIdOrThrow(): Promise<string> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  return session.user.id;
}

function clean<T extends object>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  );
}

interface userVals {
  userId?: string;
  data: {
    headline: string;
    bio: string;
    location: string;
  };
}

export async function UpdateUser(vals: userVals) {
  try {
    const { userId, data } = vals;

    if (!userId) {
      return createResponse(false, "userId not found", {
        redirectUrl: "/signin",
      });
    }

    const existingUser = await prismaDb.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return createResponse(false, "user not found with userId", {
        redirectUrl: "/signup",
      });
    }

    await prismaDb.user.update({
      where: {
        id: userId,
      },
      data: {
        headline: data.headline,
        bio: data.bio,
        location: data.location,
      },
    });

    return createResponse(true, "user updated successfully", existingUser.name);
  } catch (error) {
    console.log("user update error", error);
    return createResponse(false, "something went wrong while updating user");
  }
}
