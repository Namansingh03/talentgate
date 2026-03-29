import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prismaDb from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prismaDb, {
    provider: "postgresql",
  }),
});
