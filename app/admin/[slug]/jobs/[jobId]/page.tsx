"use server";

import React from "react";
import { getJObById } from "@/components/company/companyJobs/jobs";
import CreateJobPage from "@/components/company/companyJobs/CreateJob";

export default async function CreateJob({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;

  const res = await getJObById(jobId);

  if (res.success && res.data) {
    return <CreateJobPage job={res.data} />;
  }
  return <CreateJobPage job={null} />;
}
