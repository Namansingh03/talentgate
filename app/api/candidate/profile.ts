"use server";

import { createResponse } from "@/helpers/createResponse";
import prismaDb from "@/lib/db";
import { UpdateProfileInput } from "@/types/schemaTypes";
import { cacheLife } from "next/cache";

export async function GetUserProfile(userId: string) {
  "use cache";
  cacheLife("hours");
  try {
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

interface updateProfileProps {
  data: UpdateProfileInput;
  userId: string;
}

export async function UpdateProfile({ data, userId }: updateProfileProps) {
  try {
    const payload = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined),
    );
    console.log(payload);

    if (Object.keys(payload).length === 0) {
      return createResponse(false, "No fields provided to update");
    }

    await prismaDb.candidateProfile.upsert({
      where: {
        userId,
      },
      update: payload,
      create: {
        userId,
        ...payload,
      },
    });

    return createResponse(true, "profile updated successfully", {
      redirectUrl: "/candidate/profile",
    });
  } catch (error) {
    console.log(error);
    return createResponse(false, "Something went wrong while updating profile");
  }
}
