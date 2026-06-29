import { getCompanyFromUser } from "@/actions/company/company";
import CompanyPage from "@/components/company/companyPage/CompanyPage";
import React from "react";

async function page() {
  const res = await getCompanyFromUser();

  if (!res.success && !res.data) {
    throw new Error(res.message);
  }

  return <CompanyPage data={res.data!} />;
}

export default page;
