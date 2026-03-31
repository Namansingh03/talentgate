import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import resend from "./resend";
import prismaDb from "./db";
import CustomEmail from "@/emails/CustomEmailSend";
import VerificationEmail from "@/emails/VerificationEmail";
import { emailOTP, username } from "better-auth/plugins";
import SendVerificationOtp from "@/emails/SendVerificationOtp";

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
        from: "talentgate <onboarding@resend.dev>",
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
        from: "talentgate <onboarding@resend.dev>",
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
      prompt: "select_account consent",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
      },
    },
  },
  plugins: [
    username({
      minUsernameLength: 5,
      maxUsernameLength: 50,
      displayUsernameValidator: (displayUsername) => {
        return /^[a-zA-Z0-9_-]+$/.test(displayUsername);
      },
      usernameNormalization: false,
    }),
    emailOTP({
      resendStrategy: "rotate",
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          void resend.emails.send({
            from: "talentgate <onboarding@resend.dev>",
            to: email,
            subject: "Hello world",
            react: SendVerificationOtp({ otp, type: "email-verification" }),
          });
        } else if (type === "forget-password") {
          void resend.emails.send({
            from: "talentgate <onboarding@resend.dev>",
            to: email,
            subject: "Hello world",
            react: SendVerificationOtp({ otp, type: "forgot-password" }),
          });
        }
      },
      allowedAttempts: 5,
      expiresIn: 600,
      otpLength: 6,
      rateLimit: {
        max: 5,
        window: 60,
      },
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },
});
