import React from "react";
import { getCompanyDetails } from "@/actions/company/company";
import CompanyPage from "@/components/company/companyPage/CompanyPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await getCompanyDetails(slug);

  if (!res.success || !res.data) {
    throw new Error("Company not found");
  }

  return <CompanyPage data={res.data} />;
}
