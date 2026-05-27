import { Prisma } from "@/app/generated/prisma/client";

type CompanyType = Prisma.CompanyGetPayload<{
  select: {
    banner: true;
    createdAt: true;
    description: true;
    industry: true;
    isVerified: true;
    linkedin: true;
    location: true;
    logo: true;
    members: true;
    name: true;
    size: true;
    website: true;
    slug: true;
    jobs: {
      where: {
        status: "ACTIVE";
      };
      orderBy: { createdAt: "desc" };
    };
  };
}>;

type JobsCardType = Prisma.JobGetPayload<{
  select: {
    category: true;
    // company: true;
    createdAt: true;
    description: true;
    expiresAt: true;
    isRemote: true;
    level: true;
    location: true;
    skills: true;
    type: true;
    title: true;
  };
}>;

export type { CompanyType, JobsCardType };
