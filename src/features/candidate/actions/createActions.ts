"use server";

import { createResponse } from "@/src/shared";
import { uploadImage } from "@/src/shared";
import prismaDb from "@/src/server/db/db";
import redis from "@/src/server/redis/redis";
import { Roles } from "@/prisma/generated/enums";

interface userVals {
  userId?: string;
  data: {
    image?: File | undefined;
    headline: string;
    bio: string;
    location: string;
    role: string;
  };
}

export async function createUser(vals: userVals) {
  try {
    const { userId, data } = vals;

    if (!userId) {
      return createResponse(false, "userId not found", {
        redirectUrl: "/signin",
      });
    }

    const existingUser = await prismaDb.user.findUnique({
      where: { id: userId },
      select: {
        image: true,
      },
    });

    if (!existingUser) {
      return createResponse(false, "User not found");
    }

    let imageUrl: string | undefined;

    if (data.image) {
      const upload = await uploadImage({
        file: data.image,
        slug: "avatarImage",
        id: userId,
      });

      if (!upload.url) {
        return createResponse(false, "Image upload failed");
      }

      imageUrl = upload.url;
    }

    await redis.del(`user:${userId}`);

    await prismaDb.user.update({
      where: { id: userId },
      data: {
        headline: data.headline,
        bio: data.bio,
        location: data.location,
        image: imageUrl,
        role: data.role.toUpperCase() as Roles,
      },
    });

    return createResponse(true, "User updated successfully");
  } catch (error) {
    console.error("UpdateUser error:", error);

    return createResponse(false, "Failed to update user");
  }
}
