import z from "zod";

const TellUsMoreSchema = z.object({
  intent: z.enum(["candidate", "recruiter", "admin"]),
  headline: z.string().max(20).min(1, "Specialization is required").trim(),
  location: z.string(),
  bio: z
    .string()
    .max(100, "Only 200 characters are allowed")
    .min(1, "Bio is required"),
});

const linkSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Label is required")
    .max(50, "Label too long"),

  url: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")) // allow empty input
    .refine((val) => !val || /^https?:\/\/.+/.test(val), "Invalid URL"),
});

const AddProfileSchema = z.object({
  avatarImage: z.instanceof(File).optional(),

  skills: z
    .array(z.string().min(1, "Skill cannot be empty"))
    .min(1, "At least one skill is required")
    .max(15, "Maximum 15 skills allowed"),

  about: z.string().max(500, "About section must be under 500 characters"),

  links: z.array(linkSchema).max(4, "Maximum 5 links allowed").optional(),
});

const profileHeaderSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters").max(50),

  headline: z
    .string()
    .max(120, "Headline too long")
    .optional()
    .or(z.literal("")),

  location: z.string().max(80).optional().or(z.literal("")),

  isAvailable: z.boolean(),

  avatar: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Avatar must be under 2MB",
    })
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "Avatar must be an image",
    }),

  banner: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Banner must be under 5MB",
    })
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "Banner must be an image",
    }),
});

const educationSchema = z.object({
  school: z.string().min(2),
  degree: z.string().min(2),
  field: z.string().min(2),
  startDate: z.date(),
  endDate: z.date().optional().nullable(),
  isCurrent: z.boolean(),
});

const experienceSchema = z.object({
  company: z.string().min(2),
  title: z.string().min(2),
  location: z.string().min(2),
  startDate: z.date(),
  endDate: z.date().optional().nullable(),
  isCurrent: z.boolean(),
  description: z.string().max(200, "maximum 200 characters"),
});

export {
  profileHeaderSchema,
  educationSchema,
  experienceSchema,
  TellUsMoreSchema,
  AddProfileSchema,
};

export type TellUsMoreSchemaInput = z.infer<typeof TellUsMoreSchema>;
export type ProfileHeaderInput = z.infer<typeof profileHeaderSchema>;
export type EducationSchemaType = z.input<typeof educationSchema>;
export type ExperienceSchemaType = z.input<typeof experienceSchema>;
export type AddProfileSchemaType = z.input<typeof AddProfileSchema>;
