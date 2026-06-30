import CompanyJobs from "@/components/company/companyJobs/CompanyJobs";

export default async function JobsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CompanyJobs />;
}
