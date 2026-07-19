"use server";

import prismaDb from "@/src/server/db/db";
import { createResponse } from "@/src/shared";

export async function getJObById(jobId: string) {
  const isExists = await prismaDb.job.findFirst({
    where: { id: jobId },
  });

  if (!isExists) {
    return createResponse(false, "job does'nt exist with given id");
  }

  return createResponse(true, "job found successfully", isExists);
}

const PAGE_SIZE = 10;

interface getJobsPaginationProps {
  cursor?: string;
  companySlug?: string;
}

export async function getJobsPagination({
  companySlug,
  cursor,
}: getJobsPaginationProps) {
  if (!companySlug) {
    return createResponse(false, "company not found");
  }

  const jobs = await prismaDb.job.findMany({
    where: {
      company: {
        slug: companySlug,
      },
    },

    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      location: true,
      type: true,
      status: true,
      category: true,
      level: true,
      id: true,
    },
    take: PAGE_SIZE,

    ...(cursor && {
      cursor: {
        id: cursor,
      },
      skip: 1,
    }),
  });

  return createResponse(true, "jobs fetched", {
    jobs,
    nextCursor: jobs.length === PAGE_SIZE ? jobs[jobs.length - 1].id : null,
  });
}
