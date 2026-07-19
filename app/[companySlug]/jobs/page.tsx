"use server";

import React from "react";
import CompanyJobs from "@/src/features/jobs/components/JobPage/CompanyJobs";
import { getJobsPagination } from "@/src/features/jobs";

type PageProps = {
  params: Promise<{
    companySlug: string;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { companySlug } = await params;

  const res = await getJobsPagination({ companySlug });

  if (!res.success || !res.data) {
    throw new Error(res.message);
  }

  return <CompanyJobs />;
};

export default page;
