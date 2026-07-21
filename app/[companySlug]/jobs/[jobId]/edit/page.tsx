import { getUserDetailsAndJob } from "@/src/features/jobs";
import CreateJobPage from "@/src/features/jobs/components/CreateJobs/CreateJob";

type PageProps = {
  params: {
    companySlug: string;
    jobId: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const { companySlug, jobId } = await params;

  if (!companySlug || !jobId) {
    throw new Error("something went wrong");
  }

  const res = await getUserDetailsAndJob({
    companySlug,
    jobId,
  });

  if (!res.success || !res.data) {
    console.log(res.message);
    return null;
  }

  const { jobDetails, userDetails } = res.data;

  if (!jobDetails.data || !userDetails.data) {
    console.log(jobDetails.message, userDetails.message);
    return null;
  }

  console.log("job details : ", jobDetails);

  return (
    <CreateJobPage
      jobId={jobId}
      job={jobDetails.data}
      admin={{
        email: userDetails.data.email,
        image: userDetails.data.image,
        name: userDetails.data.name,
        username: userDetails.data.username,
        role: userDetails.data.role,
      }}
      company={jobDetails.data.company}
      newJob={false}
    />
  );
};

export default Page;
