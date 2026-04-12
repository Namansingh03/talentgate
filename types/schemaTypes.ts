import { CandidateProfile } from "../app/generated/prisma/client";

export type UpdateProfileInput = Partial<
  Pick<
    CandidateProfile,
    | "bio"
    | "about"
    | "githubUrl"
    | "headline"
    | "isOpenToWork"
    | "linkedinUrl"
    | "location"
    | "portfolioUrl"
    | "resumeUrl"
    | "skills"
  >
>;
