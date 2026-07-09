import React from "react";
import { getCompanyDetails } from "@/actions/company/company";
import CompanyPage from "@/components/company/companyPage/CompanyPage";

async function CompanyProfile({
  params,
}: {
  params: Promise<{ companySlug: string }>;
}) {
  const { companySlug } = await params;

  const res = await getCompanyDetails(companySlug);

  if (!res.success && !res.data) {
    throw new Error(res.message);
  }

  return <CompanyPage data={res.data!} />;
}

export default CompanyProfile;
