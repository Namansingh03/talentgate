"use server";

import prismaDb from "@/src/server/db/db";
import { uploadImage } from "@/src/shared/utils/UploadImage";
import { createResponse } from "@/src/shared/utils/createResponse";
import { CompanyFormValues } from "@/src/features/company/schemas/companySchema";
import { getUserIdOrThrow } from "@/src/shared/utils/getUserOrThrow";

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
  const user = await getUserIdOrThrow();

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
