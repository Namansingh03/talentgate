import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import resend from "./resend";
import prismaDb from "./db";
import CustomEmail from "@/emails/CustomEmailSend";
import VerificationEmail from "@/emails/VerificationEmail";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prismaDb, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerificationA: true,
    onExistingUserSignUp: async ({ user }) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Hello world",
        react: CustomEmail({
          content: "Someone is using your email",
          title: "Someone is trying to signup using your email",
          footerText: "If it was you ignore this email",
        }),
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Hello world",
        react: VerificationEmail({ name: user.name, verificationUrl: url }),
      });
    },
    sendOnSignUp: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },
});
