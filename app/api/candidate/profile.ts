"use server";

import { createResponse } from "@/helpers/createResponse";
import { auth } from "@/lib/auth";
import prismaDb from "@/lib/db";
import { UpdateProfileInput } from "@/types/schemaTypes";
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

export async function GetUserProfile(username: string) {
  try {
    const user = await prismaDb.user.findFirst({
      where: { name: username },
      include: {
        candidateProfile: {
          include: {
            education: true,
            experience: true,
          },
        },
      },
    });

    return createResponse(true, "profile found", user);
  } catch (error) {
    console.log(error);
    return createResponse(false, "something went wrong while fetching profile");
  }
}

export async function UpdateProfile(data: UpdateProfileInput) {
  try {
    const userId = await getUserIdOrThrow();

    const payload = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined),
    );

    if (Object.keys(payload).length === 0) {
      return createResponse(false, "No fields provided to update");
    }

    const updatedProfile = await prismaDb.candidateProfile.upsert({
      where: { userId },
      update: payload,
      create: {
        userId,
        ...payload,
      },
    });

    return createResponse(true, "Profile updated successfully", updatedProfile);
  } catch (error) {
    console.error("UpdateProfile error:", error);
    return createResponse(false, "Failed to update profile");
  }
}
