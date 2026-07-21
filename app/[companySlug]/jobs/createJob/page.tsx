import { getCompanyDetailsAndUserDetails } from "@/src/features/jobs";
import CreateJobPage from "@/src/features/jobs/components/CreateJobs/CreateJob";

type PageProps = {
  params: Promise<{
    companySlug: string;
  }>;
};

const Page = async ({ params }: PageProps) => {
  const { companySlug } = await params;

  if (!companySlug) {
    throw new Error("something went wrong");
  }

  const res = await getCompanyDetailsAndUserDetails(companySlug);

  if (!res.success || !res.data) {
    return;
  }

  const { companyDetails, userDetails } = res.data;

  if (!companyDetails.data || !userDetails.data) {
    return null;
  }
  return (
    <CreateJobPage
      jobId={undefined}
      job={null}
      admin={{
        email: userDetails.data.email,
        image: userDetails.data.image,
        name: userDetails.data.name,
        username: userDetails.data.username,
        role: userDetails.data.role,
      }}
      company={{
        location: companyDetails.data.location,
        name: companyDetails.data.name,
        slug: companySlug,
      }}
      newJob={true}
    />
  );
};

export default Page;
