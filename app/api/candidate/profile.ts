"use server";

import { createResponse, ApiResponse } from "@/helpers/createResponse";
import { UserProfileType } from "@/helpers/PrismaTypes";
import { uploadImage } from "@/helpers/UploadImage";
import { auth } from "@/lib/auth";
import prismaDb from "@/lib/db";
import { AddProfileSchemaType } from "@/schemas/CandidateSchemas";
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

export async function getUserProfile(): Promise<
  ApiResponse<UserProfileType | undefined> // you can replace `any` with Prisma.UserGetPayload later
> {
  try {
    const userId = await getUserIdOrThrow();

    const existingUser = await prismaDb.user.findUnique({
      where: { id: userId },
      select: {
        displayUsername: true,
        bio: true,
        email: true,
        image: true,
        headline: true,
        username: true,
        location: true,
        candidateProfile: {
          select: {
            isOpenToWork: true,
            about: true,
            bannerImage: true,
            skills: true,
            portfolioUrl: true,
            resumeUrl: true,
            linkedinUrl: true,
            githubUrl: true,
            experience: {
              orderBy: { startDate: "desc" },
              take: 5,
            },
            education: {
              orderBy: { startDate: "desc" },
              take: 5,
            },
          },
        },
      },
    });

    if (!existingUser) {
      return createResponse(false, "User not found", undefined, {
        redirectUrl: "/signup",
      });
    }

    return createResponse(true, "User profile fetched!", existingUser);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return createResponse(false, "Unauthorized", undefined, {
        redirectUrl: "/signin",
      });
    }

    console.error("getUserProfile error:", error);
    throw new Error("Failed to fetch user profile");
  }
}

export async function UpdateUser(vals: userVals): Promise<ApiResponse> {
  try {
    const userId = vals.userId ?? (await getUserIdOrThrow());

    const existingUser = await prismaDb.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return createResponse(false, "User not found", undefined, {
        redirectUrl: "/signup",
      });
    }

    await prismaDb.user.update({
      where: { id: userId },
      data: clean({
        headline: vals.data.headline,
        bio: vals.data.bio,
        location: vals.data.location,
      }),
    });

    return createResponse(true, "User updated successfully");
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return createResponse(false, "Unauthorized", undefined, {
        redirectUrl: "/signin",
      });
    }

    console.error("UpdateUser error:", error);
    throw new Error("Failed to update user");
  }
}

// update for add profile
export async function updateAddProfile(
  data: AddProfileSchemaType,
): Promise<ApiResponse> {
  try {
    const userId = await getUserIdOrThrow();

    const githubUrl = data.links?.[0]?.url;
    const portfolioUrl = data.links?.[1]?.url;
    const linkedinUrl = data.links?.[2]?.url;
    const resumeUrl = data.links?.[3]?.url;

    let imageUrl: string | undefined = undefined;

    if (data.avatarImage) {
      const res = await uploadImage({
        file: data.avatarImage,
        imageTypes: "avatarImage",
        userId,
      });
      imageUrl = res.url;
    }

    await prismaDb.$transaction(async (tx) => {
      if (imageUrl) {
        await tx.user.update({
          where: { id: userId },
          data: {
            image: imageUrl,
          },
        });
      }

      await tx.candidateProfile.upsert({
        where: { userId },
        update: clean({
          skills: data.skills,
          about: data.about,
          githubUrl,
          portfolioUrl,
          linkedinUrl,
          resumeUrl,
        }),
        create: {
          userId,
          skills: data.skills ?? [],
          about: data.about ?? "",
          githubUrl,
          portfolioUrl,
          linkedinUrl,
          resumeUrl,
        },
      });
    });

    return createResponse(true, "Profile setup completed");
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return createResponse(false, "Unauthorized", undefined, {
        redirectUrl: "/signin",
      });
    }

    console.error("updateAddProfile error:", error);
    throw new Error("Failed to setup profile");
  }
}

// update for profile header

// delete profile education and experience
export async function deleteTimelineEntry(
  id: string | undefined,
  type: "Education" | "WorkExperience",
): Promise<ApiResponse> {
  try {
    if (!id) {
      return createResponse(false, "Id is required");
    }

    if (type === "Education") {
      await prismaDb.education.delete({
        where: { id },
      });
    } else if (type === "WorkExperience") {
      await prismaDb.workExperience.delete({
        where: { id },
      });
    }

    return createResponse(true, `${type} deleted`);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return createResponse(false, "Unauthorized", undefined, {
        redirectUrl: "/signin",
      });
    }

    console.error("deleteProfileEntry error:", error);
    throw new Error("Failed to delete entry");
  }
}
