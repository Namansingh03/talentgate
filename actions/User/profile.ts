"use server";

import { User } from "better-auth";
import { createResponse } from "@/helpers/createResponse";
import { uploadImage } from "@/helpers/UploadImage";
import { auth } from "@/lib/auth";
import prismaDb from "@/lib/db";
import {
  AddProfileSchemaType,
  educationSchema,
  experienceSchema,
  ProfileHeaderInput,
} from "@/schemas/CandidateSchemas";
import { headers } from "next/headers";
import { Prisma, Roles } from "@/app/generated/prisma/client";
import redis from "@/lib/redis";

export async function getUserIdOrThrow(): Promise<User> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("UNAUTHORIZED");
  }

  return session.user;
}

function clean<T extends object>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  );
}

export async function getUserProfile() {
  const user = await getUserIdOrThrow();

  const cacheKey = `user:${user.id}:profile`;

  const cached = await redis.get(cacheKey);

  if (cached) {
    return createResponse(true, "user profile fetched", JSON.parse(cached));
  }

  const existingUser = await prismaDb.user.findUnique({
    where: { id: user.id },
    select: {
      displayUsername: true,
      bio: true,
      email: true,
      image: true,
      name: true,
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

  await redis.set(cacheKey, JSON.stringify(existingUser), "EX", 1800);

  return createResponse(true, "User profile fetched!", existingUser);
}

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

// update for add profile
export async function updateAddProfile(data: AddProfileSchemaType) {
  try {
    const user = await getUserIdOrThrow();

    const githubUrl = data.links?.[0]?.url;
    const portfolioUrl = data.links?.[1]?.url;
    const linkedinUrl = data.links?.[2]?.url;
    const resumeUrl = data.links?.[3]?.url;

    let imageUrl: string | undefined;

    await prismaDb.$transaction(async (tx) => {
      if (imageUrl) {
        await tx.user.update({
          where: { id: user.id },
          data: {
            image: imageUrl,
          },
        });
      }

      await tx.candidateProfile.upsert({
        where: { userId: user.id },
        update: clean({
          skills: data.skills,
          about: data.about,
          githubUrl,
          portfolioUrl,
          linkedinUrl,
          resumeUrl,
        }),
        create: {
          userId: user.id,
          skills: data.skills ?? [],
          about: data.about ?? "",
          githubUrl,
          portfolioUrl,
          linkedinUrl,
          resumeUrl,
        },
      });
    });

    await auth.api.updateSession({
      body: {
        data: {
          imageUrl,
        },
      },
      headers: await headers(),
    });

    return createResponse(true, "Profile setup completed", user.name);
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

export async function UpdateProfileHeader(data: ProfileHeaderInput) {
  try {
    const user = await getUserIdOrThrow();

    const existingProfile = await prismaDb.candidateProfile.findUnique({
      where: { userId: user.id },
    });

    if (!existingProfile) {
      return createResponse(false, "Profile not found");
    }

    let avatarImageUrl: string | undefined;
    let bannerImageUrl: string | undefined;

    if (data.avatar) {
      const res = await uploadImage({
        file: data.avatar,
        slug: "avatarImage",
        id: user.id,
      });

      if (!res.url) {
        return createResponse(false, "Avatar upload failed");
      }

      avatarImageUrl = res.url;
    }

    if (data.banner) {
      const res = await uploadImage({
        file: data.banner,
        slug: "bannerImage",
        id: user.id,
      });

      if (!res.url) {
        return createResponse(false, "Banner upload failed");
      }

      bannerImageUrl = res.url;
    }

    await prismaDb.$transaction([
      prismaDb.user.update({
        where: { id: user.id },
        data: {
          name: data.displayName,
          headline: data.headline,
          location: data.location,

          ...(avatarImageUrl && { image: avatarImageUrl }),
        },
      }),

      prismaDb.candidateProfile.update({
        where: { userId: user.id },
        data: {
          isOpenToWork: data.isAvailable,
          ...(bannerImageUrl && { bannerImage: bannerImageUrl }),
        },
      }),
    ]);
    await redis.del(`user:${user.id}:profile`);

    return createResponse(true, "Profile updated successfully");
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return createResponse(false, "Unauthorized", {
        redirectUrl: "/signin",
      });
    }

    console.error("updateProfileHeader error:", error);
    throw new Error("Failed to update");
  }
}

export async function UpdateProfileSkills(skills: string[]) {
  try {
    const user = await getUserIdOrThrow();

    const existingProfile = await prismaDb.candidateProfile.findUnique({
      where: { userId: user.id },
    });

    if (!existingProfile) {
      return createResponse(false, "Profile not found");
    }

    await prismaDb.candidateProfile.update({
      where: {
        userId: user.id,
      },
      data: {
        skills,
      },
    });

    await redis.del(`user:${user.id}:profile`);
    return createResponse(true, "Profile updated successfully");
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return createResponse(false, "Unauthorized", {
        redirectUrl: "/signin",
      });
    }

    console.error("updateProfileHeader error:", error);
    throw new Error("Failed to update");
  }
}

type Input = {
  text: string;
  textType: "about" | "bio";
};

export async function UpdateProfileText({ text, textType }: Input) {
  try {
    const user = await getUserIdOrThrow();

    if (!user) {
      return createResponse(false, "Unauthorized", "/signin");
    }

    const value = text.trim() || null;

    if (textType === "bio") {
      await prismaDb.user.update({
        where: { id: user.id },
        data: { bio: value },
      });

      return createResponse(true, "Bio updated");
    }

    if (textType === "about") {
      const profile = await prismaDb.candidateProfile.findUnique({
        where: { userId: user.id },
      });

      if (!profile) {
        // create profile if missing (edge case)
        await prismaDb.candidateProfile.create({
          data: {
            userId: user.id,
            about: value,
          },
        });
        await redis.del(`user:${user.id}:profile`);

        return createResponse(true, "About added");
      }

      await prismaDb.candidateProfile.update({
        where: { userId: user.id },
        data: { about: value },
      });
      await redis.del(`user:${user.id}:profile`);

      return createResponse(true, "About updated");
    }

    return createResponse(false, "Invalid type");
  } catch (err) {
    console.error(err);
    return createResponse(false, "Something went wrong");
  }
}

type ExperienceInput = {
  experience: unknown;
  experienceId?: string;
};

export async function UpdateProfileExperience({
  experience,
  experienceId,
}: ExperienceInput) {
  try {
    const parsed = experienceSchema.safeParse(experience);

    if (!parsed.success) {
      return createResponse(false, parsed.error.message);
    }

    const user = await getUserIdOrThrow();
    if (!user) {
      return createResponse(false, "Unauthorized", "/signin");
    }

    const profile = await prismaDb.candidateProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return createResponse(false, "Profile not found");
    }

    const exp = parsed.data;

    const formatted = {
      company: exp.company,
      title: exp.title,
      location: exp.location?.trim() || null,
      description: exp.description?.trim() || null,
      startDate: exp.startDate,
      endDate: exp.isCurrent ? null : (exp.endDate ?? null),
      isCurrent: exp.isCurrent,
      profileId: profile.id,
    } satisfies Prisma.WorkExperienceUncheckedCreateInput;

    if (experienceId) {
      const result = await prismaDb.workExperience.updateMany({
        where: {
          id: experienceId,
          profileId: profile.id,
        },
        data: formatted,
      });

      if (result.count === 0) {
        return createResponse(false, "Experience not found");
      }

      return createResponse(true, "Experience updated");
    }

    await prismaDb.workExperience.create({
      data: {
        ...formatted,
        profileId: profile.id,
      },
    });
    await redis.del(`user:${user.id}:profile`);

    return createResponse(true, "Experience added");
  } catch (err) {
    console.error(err);
    return createResponse(false, "Something went wrong");
  }
}

type EducationInput = {
  education: unknown;
  educationId?: string;
};

export async function UpdateProfileEducation({
  education,
  educationId,
}: EducationInput) {
  try {
    const parsed = educationSchema.safeParse(education);

    if (!parsed.success) {
      return createResponse(false, parsed.error.message);
    }

    const user = await getUserIdOrThrow();
    if (!user) {
      return createResponse(false, "Unauthorized", "/signin");
    }

    const profile = await prismaDb.candidateProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return createResponse(false, "Profile not found");
    }

    const edu = parsed.data;

    const formatted = {
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate,
      endDate: edu.isCurrent ? null : (edu.endDate ?? null),
      isCurrent: edu.isCurrent,
      profileId: profile.id,
    } satisfies Prisma.EducationUncheckedCreateInput;

    if (educationId) {
      const result = await prismaDb.education.updateMany({
        where: {
          id: educationId,
          profileId: profile.id,
        },
        data: formatted,
      });

      if (result.count === 0) {
        return createResponse(false, "Education not found");
      }
      await redis.del(`user:${user.id}:profile`);

      return createResponse(true, "Education updated");
    }

    await prismaDb.education.create({
      data: {
        ...formatted,
        profileId: profile.id,
      },
    });
    await redis.del(`user:${user.id}:profile`);

    return createResponse(true, "Education added");
  } catch (err) {
    console.error(err);
    return createResponse(false, "Something went wrong");
  }
}

type UpdateProfileInput = {
  candidateProfile: {
    githubUrl?: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
    resumeUrl?: string;
  };
};

export async function UpdateProfileContacts(data: UpdateProfileInput) {
  try {
    const user = await getUserIdOrThrow();

    if (!user) {
      return createResponse(false, "Unauthorized", "/signin");
    }

    const profile = await prismaDb.candidateProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return createResponse(false, "Profile not found");
    }

    const links = data.candidateProfile;

    await prismaDb.candidateProfile.update({
      where: { userId: user.id },
      data: {
        githubUrl: links.githubUrl?.trim() || null,
        linkedinUrl: links.linkedinUrl?.trim() || null,
        portfolioUrl: links.portfolioUrl?.trim() || null,
        resumeUrl: links.resumeUrl?.trim() || null,
      },
    });
    await redis.del(`user:${user.id}:profile`);

    return createResponse(true, "Links updated successfully");
  } catch (error) {
    console.error(error);
    return createResponse(false, "Something went wrong");
  }
}

// delete profile education and experience
export async function deleteTimelineEntry(
  id: string | undefined,
  type: "Education" | "WorkExperience",
) {
  try {
    const user = await getUserIdOrThrow();

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
    await redis.del(`user:${user.id}:profile`);

    return createResponse(true, `${type} deleted`);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return createResponse(false, "Unauthorized", {
        redirectUrl: "/signin",
      });
    }

    console.error("deleteProfileEntry error:", error);
    throw new Error("Failed to delete entry");
  }
}
