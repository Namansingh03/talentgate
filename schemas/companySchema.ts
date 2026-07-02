import { z } from "zod";
import {
  JobType,
  JobCategory,
  ExperienceLevel,
  JobStatus,
} from "@/app/generated/prisma/client";

export const CompanySizeEnum = z.enum([
  "STARTUP",
  "SMALL",
  "MEDIUM",
  "LARGE",
  "ENTERPRISE",
]);

export const companySchema = z.object({
  name: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100),

  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(100)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    ),

  logo: z.file().nullable(),

  banner: z.file().nullable(),

  website: z.string().url("Website must be a valid URL"),

  linkedin: z.string().url("LinkedIn URL must be valid"),

  description: z.any().optional(),

  industry: z.string().min(2, "Industry is required").max(100),

  size: CompanySizeEnum,

  location: z.string().min(2, "Location is required").max(200),

  companyEmail: z.email(),
});

export const JobSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  requirements: z.string(), // this needs to be bullets
  responsibilities: z.string(), // this needs to be bullets
  benefits: z.string(), // this needs to be bullets
  location: z.string(),
  isRemote: z.boolean().default(false),
  type: z.enum(JobType),
  level: z.enum(ExperienceLevel),
  category: z.enum(JobCategory),
  skills: z.array(z.string()),
  salaryMin: z.number(),
  salaryMax: z.number(),
  salaryCurrency: z.string(),
  status: z.enum(JobStatus),
  expiresAt: z.date(),
});

export type CompanyFormValues = z.infer<typeof companySchema>;
export type jobFormValues = z.infer<typeof JobSchema>;
