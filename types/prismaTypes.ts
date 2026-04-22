import { Prisma } from "@/app/generated/prisma/client";

type UserWithProfile = Prisma.UserGetPayload<{
  include: {
    candidateProfile: {
      include: {
        education: true;
        experience: true;
      };
    };
  };
}>;

type UpdateUserInput = {
  user?: Prisma.UserUpdateInput;
  candidateProfile?: Prisma.CandidateProfileUpdateInput;
};

export type { UserWithProfile, UpdateUserInput };
