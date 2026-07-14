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

export type { CompanyType };
