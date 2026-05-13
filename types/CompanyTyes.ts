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
  };
}>;

export type { CompanyType };
