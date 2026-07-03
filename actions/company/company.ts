"use server";
import prismaDb from "@/lib/db";
import { auth } from "@/lib/auth";
import { User } from "better-auth";
import { headers } from "next/headers";
import { uploadImage } from "@/helpers/UploadImage";
import { createResponse } from "@/helpers/createResponse";
import { CompanyFormValues } from "@/schemas/companySchema";

export async function getUserOrThrow(): Promise<User> {
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
    Object.entries(obj).filter(([, v]) => v != null),
  ) as Partial<T>;
}

export async function getCompanySlug(username?: string | null) {
  if (!username) {
    return createResponse(false, "username not found");
  }

  const company = await prismaDb.company.findFirst({
    where: {
      members: {
        every: {
          user: {
            username,
            role: "ADMIN",
          },
        },
      },
    },
    select: {
      slug: true,
    },
  });

  if (!company) {
    return createResponse(false, "company not found");
  }

  return createResponse(true, " company found", company.slug);
}

export async function createCompany(data: CompanyFormValues) {
  try {
    const user = await getUserOrThrow();
    const { banner, logo, description, ...companyData } = data;
    let bannerImageUrl: string | undefined;
    let logoImageUrl: string | undefined;

    const existingSlug = await prismaDb.company.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingSlug) {
      return createResponse(false, "Company already exist with same slug");
    }

    if (banner) {
      const res = await uploadImage({
        file: banner,
        slug: "companyBannerImage",
        id: data.slug!,
      });

      if (!res.url) {
        return createResponse(false, "Banner image upload failed");
      }

      bannerImageUrl = res.url;
    }

    if (logo) {
      const res = await uploadImage({
        file: logo,
        slug: "companyLogoImage",
        id: data.slug!,
      });

      if (!res.url) {
        return createResponse(false, "Logo image upload failed");
      }

      logoImageUrl = res.url;
    }

    await prismaDb.company.create({
      data: {
        ...companyData,

        banner: bannerImageUrl,
        logo: logoImageUrl,
        description,

        members: {
          create: {
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        },
      },

      include: {
        members: true,
      },
    });

    return createResponse(true, "Company created");
  } catch (error) {
    console.error(error);
    return createResponse(false, "Failed to create company");
  }
}

export async function getCompanyDetails(slug: string) {
  try {
    if (!slug) {
      return createResponse(false, "company not found", undefined, {
        redirectUrl: "/signup",
      });
    }

    const res = await prismaDb.company.findUnique({
      where: {
        slug,
      },
      select: {
        banner: true,
        createdAt: true,
        description: true,
        industry: true,
        isVerified: true,
        linkedin: true,
        location: true,
        logo: true,
        members: true,
        name: true,
        size: true,
        website: true,
        slug: true,
        jobs: {
          where: {
            status: "ACTIVE",
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!res) {
      return createResponse(false, "company not found", undefined);
    }

    return createResponse(true, "company details found", res);
  } catch (error) {
    console.log(error);

    return createResponse(
      false,
      "something went wrong while fetching company details",
      undefined,
    );
  }
}

export async function getCompanyFromUser() {
  const user = await getUserOrThrow();

  const isExisting = await prismaDb.company.findFirst({
    where: {
      members: {
        every: {
          userId: user.id,
        },
      },
    },
    select: {
      banner: true,
      createdAt: true,
      description: true,
      industry: true,
      isVerified: true,
      linkedin: true,
      location: true,
      logo: true,
      members: true,
      name: true,
      size: true,
      website: true,
      slug: true,
      jobs: {
        where: {
          status: "ACTIVE",
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!isExisting) {
    return createResponse(false, "company not found");
  }

  return createResponse(true, "company details fetched", isExisting);
}
