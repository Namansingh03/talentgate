import { Prisma } from "@/prisma/generated/client";

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
    title: true;
    isRemote: true;
    location: true;
    type: true;
    level: true;
    description: true;
    skills: true;
    createdAt: true;
    expiresAt: true;
  };
}>;
export type { CompanyType, JobsCardType };
