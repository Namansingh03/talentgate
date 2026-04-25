import z, { nullable } from "zod";

const TellUsMoreSchema = z.object({
  headline: z.string().max(20).min(1, "Specialization is required").trim(),
  skills: z.array(z.string()).min(1, "At least one skills is required"),
  about: z
    .string()
    .max(500, "Only 500 characters are allowed")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(100, "Only 200 characters are allowed")
    .min(1, "Bio is required"),
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

export { profileHeaderSchema, educationSchema };
export type ProfileHeaderInput = z.infer<typeof profileHeaderSchema>;
export type EducationSchemaType = z.input<typeof educationSchema>;
