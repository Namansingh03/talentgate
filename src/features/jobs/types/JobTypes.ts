import { Prisma } from "@/prisma/generated/browser";

type createJobType = Prisma.JobGetPayload<{
  select: {
    benefits: true;
    category: true;
    description: true;
    expiresAt: true;
    isRemote: true;
    level: true;
    location: true;
    requirements: true;
    responsibilities: true;
    salaryCurrency: true;
    salaryMax: true;
    salaryMin: true;
    skills: true;
    slug: true;
    status: true;
    title: true;
    type: true;
  };
}>;

export type { createJobType };
