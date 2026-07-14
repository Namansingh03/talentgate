"use server";

import prismaDb from "@/src/server/db/db";
import { createResponse } from "@/src/shared";
import { Job } from "@/prisma/generated/browser";

type createJobType = {
  job: Job;
  companySlug: string;
};

export async function createJob({ companySlug, job }: createJobType) {
  try {
    const companyExists = await prismaDb.company.findFirst({
      where: { slug: companySlug },
    });

    if (!companyExists) {
      return createResponse(false, "company does'nt exists");
    }

    if (job.id) {
      await prismaDb.job.update({
        where: {
          id: job.id,
        },
        data: job,
      });

      return createResponse(true, "job entry updated successfully");
    }

    if (!job.id) {
      await prismaDb.company.update({
        where: {
          slug: companySlug,
        },
        data: {
          jobs: {
            create: {
              ...job,
            },
          },
        },
      });

      return createResponse(true, "job entry updated successfully");
    }
  } catch (error) {
    console.log("job creation error : ", error);
    return createResponse(false, "something went wrong while creating job");
  }
}
