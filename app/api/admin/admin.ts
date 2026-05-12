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

    const formattedData = clean(data);

    const { banner, logo, ...companyData } = formattedData;

    let bannerImageUrl: string | undefined;
    let logoImageUrl: string | undefined;

    if (banner) {
      const res = await uploadImage({
        file: banner,
        slug: "companyBannerImage",
        id: companyData.slug!,
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
        id: companyData.slug!,
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

export { createCompany };
