"use server";

import { ApiResponse, createResponse } from "@/helpers/createResponse";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { User } from "better-auth";
import prismaDb from "@/lib/db";
import { UpdateProfileInput } from "@/types/schemaTypes";

async function getServerSession(): Promise<ApiResponse<User | null>> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return createResponse(false, "Unauthorized request", null, {
      redirectUrl: "/",
    });
  }

  return createResponse(true, "user found", session.user);
}

export async function GetUserProfile() {
  try {
    const res = await getServerSession();

    if (!res.success || !res.data) {
      return createResponse(res.success, res.message);
    }

    const userId = res.data.id;

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

export async function UpdateProfileProps(data: UpdateProfileInput) {
  try {
    console.log(data);
    const res = await getServerSession();

    if (!res.success || !res.data) {
      return createResponse(res.success, res.message);
    }

    const userId = res.data.id;

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
