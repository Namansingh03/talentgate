"use server";

import prismaDb from "@/src/server/db/db";
import { createResponse } from "@/src/shared";
import { createJobTypeServer } from "../types/JobTypes";
import { getSessionRole } from "@/src/shared/utils/getSessionRole";

type createJobDetails = {
  jobDetails: createJobTypeServer;
  adminUsername?: string | null;
  companySlug?: string | null;
  newJob: boolean;
  jobId?: string;
};

export async function createJobAction({
  jobDetails,
  adminUsername,
  companySlug,
  newJob,
  jobId,
}: createJobDetails) {
  try {
    if (!adminUsername || !companySlug) {
      return createResponse(false, "username not found");
    }

    const isAuthorized = await getSessionRole("CANDIDATE");

    if (!isAuthorized.success) {
      return createResponse(false, isAuthorized.message);
    }

    if (!newJob) {
      if (!jobId) {
        return createResponse(false, "jobId not found");
      }

      await prismaDb.job.update({
        where: {
          id: jobId,
        },
        data: {
          ...jobDetails,
        },
      });

      return createResponse(true, "job updated successfully");
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
