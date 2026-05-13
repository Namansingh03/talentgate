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

async function createCompany(data: CompanyFormValues) {
  try {
    const user = await getUserOrThrow();

    let bannerImageUrl: string | undefined;
    let logoImageUrl: string | undefined;

    if (data.banner) {
      const res = await uploadImage({
        file: data.banner,
        slug: "companyBannerImage",
        id: data.slug!,
      });

      if (!res.url) {
        return createResponse(false, "Banner image upload failed");
      }

      bannerImageUrl = res.url;
    }

    if (data.logo) {
      const res = await uploadImage({
        file: data.logo,
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
        ...data,

        banner: bannerImageUrl,
        logo: logoImageUrl,

        members: {
          create: {
            user: {
              connect: {
                id: user.id,
              },
            },
            role: "ADMIN",
          },
        },
      },

      include: {
        members: true,
      },
    });

    return createResponse(true, "Company created");
  } catch (error) {
    console.log(error);
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return createResponse(false, "Unauthorized", undefined, {
        redirectUrl: "/signin",
      });
    }
    throw new Error("Failed to create company");
  }
}

async function getCompanyDetails(slug: string) {
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

export { createCompany, getCompanyDetails };
