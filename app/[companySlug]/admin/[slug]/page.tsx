import React from "react";
import { getCompanyDetails } from "@/actions/company/company";
import CompanyPage from "@/components/company/companyPage/CompanyPage";

async function CompanyProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await getCompanyDetails(slug);

  if (!res.success && !res.data) {
    throw new Error(res.message);
  }

  return <CompanyPage data={res.data!} />;
}

export default CompanyProfile;
