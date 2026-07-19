"use server";

import prismaDb from "@/src/server/db/db";
import { createResponse } from "@/src/shared";
import { createJobType } from "../types/JobTypes";

type createJobDetails = {
  jobDetails: createJobType;
  adminUsername?: string | null;
  companySlug?: string | null;
};

export async function createJobAction({
  jobDetails,
  adminUsername,
  companySlug,
}: createJobDetails) {
  try {
    if (!adminUsername || !companySlug) {
      return createResponse(false, "username not found");
    }

    const isAuthorized = await prismaDb.user.findFirst({
      where: {
        username: adminUsername,
        memberships: {
          some: {
            company: {
              slug: companySlug,
            },
          },
        },
      },
      select: {
        role: true,
      },
    });

    if (isAuthorized?.role === "CANDIDATE" && !isAuthorized) {
      return createResponse(false, "not authorized");
    }

    await prismaDb.company.update({
      where: {
        slug: companySlug,
      },
      data: {
        jobs: {
          create: {
            ...jobDetails,
          },
        },
      },
    });

    return createResponse(true, "job created successfully");
  } catch (error) {
    console.log("job creation error : ", error);
    return createResponse(false, "something went wrong while creating job");
  }
}
