import { Prisma } from "@/prisma/generated/browser";
import {
  Prisma as ClientPrisma,
  JobCategory,
  ExperienceLevel,
  JobStatus,
  JobType,
} from "@/prisma/generated/client";

type createJobTypeServer = Prisma.JobGetPayload<{
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

type createJobTypeClient = ClientPrisma.JobGetPayload<{
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

type jobViewCardType = {
  title: string;
  createdAt: Date;
  category: JobCategory;
  type: JobType;
  status: JobStatus;
  location: string;
  level: ExperienceLevel;
  id: string;
};

type viewJobCompany = ClientPrisma.CompanyGetPayload<{
  select: {
    banner: true;
    companyEmail: true;
    createdAt: true;
    location: true;
    logo: true;
    name: true;
    slug: true;
    isVerified: true;
  };
}>;

export type {
  createJobTypeServer,
  createJobTypeClient,
  jobViewCardType,
  viewJobCompany,
};
