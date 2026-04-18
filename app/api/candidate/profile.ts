"use server";

import { createResponse } from "@/helpers/createResponse";
import prismaDb from "@/lib/db";
import { UpdateProfileInput } from "@/types/schemaTypes";

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

interface updateProfileProps {
  data: UpdateProfileInput;
  username: string;
}

export async function UpdateProfile({ data, username }: updateProfileProps) {
  try {
    const payload = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined),
    );
    console.log(payload);

    if (Object.keys(payload).length === 0) {
      return createResponse(false, "No fields provided to update");
    }

    const user = await prismaDb.user.findFirst({
      where: {
        name: username,
      },
    });

    if (!user) {
      return createResponse(false, "user not found", {
        redirectUrl: "/signin",
      });
    }

    const userId = user.id;

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
