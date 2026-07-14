"use server";

import prismaDb from "@/src/server/db/db";
import { createResponse } from "@/src/shared";
import { Job } from "@/prisma/generated/browser";

export async function getJObById(jobId: string) {
  const isExists = await prismaDb.job.findFirst({
    where: { id: jobId },
  });

  if (!isExists) {
    return createResponse(false, "job does'nt exist with given id");
  }

  return createResponse(true, "job found successfully", isExists);
}
