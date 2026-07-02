"use server";

import prismaDb from "@/lib/db";
import { createResponse } from "@/helpers/createResponse";
import { Job } from "@/app/generated/prisma/client";

export async function getJObById(jobId: string) {
  const isExists = await prismaDb.job.findFirst({
    where: { id: jobId },
  });

  if (!isExists) {
    return createResponse(false, "job does'nt exist with given id");
  }

  return createResponse(true, "job found successfully", isExists);
}

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

export async function deleteJob(id: string) {
  try {
    if (!id) {
      return createResponse(false, "no job id found");
    }

    const existing = await prismaDb.job.findUnique({
      where: { id },
    });

    if (!existing) {
      return createResponse(false, "no job found with the provided id");
    }

    await prismaDb.job.delete({
      where: {
        id,
      },
    });

    return createResponse(true, "job entry deleted successful");
  } catch (error) {
    console.log(error);
    return createResponse(
      false,
      "something went wrong while deleting job entry",
    );
  }
}
