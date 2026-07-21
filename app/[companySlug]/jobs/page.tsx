import React from "react";
import CompanyJobs from "@/src/features/jobs/components/JobPage/CompanyJobs";
import { getJobCardDetails } from "@/src/features/jobs";

type PageProps = {
  params: Promise<{
    companySlug: string;
  }>;
};

const Page = async ({ params }: PageProps) => {
  const { companySlug } = await params;

  const res = await getJobCardDetails(companySlug);

  if (!res.success) {
    throw new Error(res.message);
  }

  if (!res.data) {
    return null;
  }

  return <CompanyJobs initialData={res.data} />;
};

export default Page;
