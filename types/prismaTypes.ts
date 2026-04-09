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

export type { UserWithProfile };
