import { getCompanyDetails } from "@/app/api/company/company";
import CompanyPage from "@/components/company/companyPage/CompanyPage";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await getCompanyDetails(slug);

  if (!res.success || !res.data) {
    if (res.redirectUrl) {
      redirect(res.redirectUrl);
    }
    throw new Error(res.message);
  }

  return <CompanyPage data={res.data} />;
}
