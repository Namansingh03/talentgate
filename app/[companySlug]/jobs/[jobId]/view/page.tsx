"use server";

import { getJobViewDetails } from "@/src/features/jobs";
import ViewJob from "@/src/features/jobs/components/viewJobs/ViewJob";

type PageProps = {
  params: {
    companySlug: string;
    jobId: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const { jobId } = await params;

  const res = await getJobViewDetails(jobId);

  if (!res.success || !res.data) {
    return null;
  }

  return (
    <ViewJob
      job={{
        benefits: res.data.benefits,
        category: res.data.category,
        description: res.data.description,
        expiresAt: res.data.expiresAt,
        isRemote: res.data.isRemote,
        level: res.data.level,
        location: res.data.location,
        requirements: res.data.requirements,
        responsibilities: res.data.responsibilities,
        salaryCurrency: res.data.salaryCurrency,
        salaryMax: res.data.salaryMax,
        salaryMin: res.data.salaryMin,
        skills: res.data.skills,
        slug: res.data.slug,
        status: res.data.status,
        title: res.data.title,
        type: res.data.type,
      }}
      company={{
        location: res.data.company.location,
        banner: res.data.company.banner,
        companyEmail: res.data.company.companyEmail,
        createdAt: res.data.company.createdAt,
        isVerified: res.data.company.isVerified,
        logo: res.data.company.logo,
        name: res.data.company.name,
        slug: res.data.company.slug,
      }}
    />
  );
};

export default Page;
