import z from "zod";

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

export { TellUsMoreSchema };
