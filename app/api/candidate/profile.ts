"use server";

import { createResponse } from "@/helpers/createResponse";
import { auth } from "@/lib/auth";
import prismaDb from "@/lib/db";
import { UpdateUserInput } from "@/types/prismaTypes";
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

export async function GetUserProfile() {
  try {
    const userId = await getUserIdOrThrow();
    const user = await prismaDb.user.findFirst({
      where: { id: userId },
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

export async function UpdateProfile(data: UpdateUserInput) {
  try {
    const userId = await getUserIdOrThrow();

    const userData = clean(data.user ?? {});
    const profileData = clean(data.candidateProfile ?? {});

    const hasUser = Object.keys(userData).length > 0;
    const hasProfile = Object.keys(profileData).length > 0;

    if (!hasUser && !hasProfile) {
      return createResponse(false, "No fields provided to update");
    }

    console.log(userData, profileData);

    const updatedUser = await prismaDb.user.update({
      where: { id: userId },
      data: {
        ...userData,

        ...(hasProfile && {
          candidateProfile: {
            upsert: {
              create: {
                ...profileData,
              },
              update: {
                ...profileData,
              },
            },
          },
        }),
      },
      include: {
        candidateProfile: {
          include: {
            education: true,
            experience: true,
          },
        },
      },
    });

    return createResponse(true, "Profile updated successfully", updatedUser);
  } catch (error) {
    console.error("UpdateProfile error:", error);
    return createResponse(false, "Failed to update profile");
  }
}
