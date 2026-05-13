import React from "react";
import { redirect } from "next/navigation";
import { getCompanyDetails } from "@/app/api/company/company";
import CompanyPage from "@/components/company/companyPage/CompanyPage";

export async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await getCompanyDetails(slug);

  if (!res.success) {
    if (res.redirectUrl) {
      redirect(res.redirectUrl);
    }
    throw new Error(res.message);
  }

  if (!res.data) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Error
      </div>
    );
  }

  return <CompanyPage data={res.data} />;
}
