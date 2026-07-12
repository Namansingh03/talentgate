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
  benefits: z.string().nullable(),
  category: JobCategoryEnum,
  description: z.string(),
  expiresAt: z.date().nullable(),
  isRemote: z.boolean().default(false).optional(),
  JobExperienceLevel: JobExperienceLevelEnum,
  location: z.string(),
  requirements: z.string().nullable(), //todo make this bullet form
  responsibilities: z.string().nullable(), //todo make this bullet form
  salaryCurrency: z.string(),
  salaryMin: z.number().min(10).nullable(),
  salaryMax: z.number().nullable(),
  skillsRequired: z.array(z.string()),
  slug: z.string(),
  jobStatus: JobStatusEnum,
  title: z.string(),
  jobType: JobTypeEnum,
});

export type JobFormValues = z.infer<typeof JobSchema>;
