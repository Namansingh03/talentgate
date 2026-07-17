import { z } from "zod";

export const JobCategoryEnum = z.enum([
  "ENGINEERING",
  "DESIGN",
  "MARKETING",
  "SALES",
  "FINANCE",
  "HR",
  "OPERATIONS",
  "PRODUCT",
  "DATA",
  "DEVOPS",
  "OTHER",
]);

export const JobStatusEnum = z.enum(["DRAFT", "ACTIVE", "CLOSED", "EXPIRED"]);

export const JobExperienceLevelEnum = z.enum([
  "INTERN",
  "JUNIOR",
  "MID",
  "SENIOR",
  "LEAD",
]);

export const JobTypeEnum = z.enum([
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
  "FREELANCE",
]);

export const JobSchema = z.object({
  benefits: z.array(z.string()).min(1, "min 1 benefit is required"),
  category: JobCategoryEnum,
  description: z.string(),
  expiresAt: z.date().nullable(),
  isRemote: z.boolean().default(false),
  JobExperienceLevel: JobExperienceLevelEnum,
  location: z.string(),
  requirements: z.array(z.string()).min(1, "min 1 requirement is required"),
  responsibilities: z
    .array(z.string())
    .min(1, "min 1 responsibility is required"),
  salaryCurrency: z.string(),
  salaryMin: z.coerce.number().positive().min(10).nullable().default(100000),
  salaryMax: z.coerce.number().positive().nullable().default(160000),
  skillsRequired: z.array(z.string()),
  slug: z.string(),
  jobStatus: JobStatusEnum,
  title: z.string(),
  jobType: JobTypeEnum,
});

export type JobFormValues = z.infer<typeof JobSchema>;
