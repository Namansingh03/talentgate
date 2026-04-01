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

export async function UpdateProfileProps(data: UpdateProfileInput) {
  try {
    const res = await getServerSession();

    if (!res.success || !res.data) {
      return createResponse(res.success, res.message);
    }

    const userId = res.data.id;

    const payload = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined),
    );

    if (Object.keys(payload).length === 0) {
      return createResponse(false, "No fields provided to update");
    }

    await prismaDb.candidateProfile.update({
      where: {
        userId,
      },
      data: payload,
    });

    return createResponse(true, "profile updated successfully", {
      redirectUrl: "/candidate/profile",
    });
  } catch (error) {
    console.log(error);
    return createResponse(false, "Something went wrong while updating profile");
  }
}
