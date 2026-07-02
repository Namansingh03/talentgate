// import redis from "./redis";
import prismaDb from "./db";
import resend from "./resend";
import { betterAuth } from "better-auth";
import CustomEmail from "@/emails/CustomEmailSend";
import { emailOTP, username } from "better-auth/plugins";
import VerificationEmail from "@/emails/VerificationEmail";
import { prismaAdapter } from "better-auth/adapters/prisma";
import SendVerificationOtp from "@/emails/SendVerificationOtp";

// const SESSION_PREFIX = "session:";
// const ONE_DAY = 60 * 60 * 24;

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prismaDb, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
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
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "talentgate <onboarding@resend.dev>",
        to: user.email,
        subject: "Hello world",
        react: CustomEmail({
          content: "Reset your password",
          title: `click on this button to reset your password`,
          url: url,
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
    autoSignInAfterVerification: true,
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
        defaultValue: "CANDIDATE",
        required: false,
      },
    },
  },
  plugins: [
    username({
      minUsernameLength: 5,
      maxUsernameLength: 50,
      usernameNormalization: false,
    }),
    emailOTP({
      resendStrategy: "rotate",
      async sendVerificationOTP({ email, otp, type }) {
        console.log("verification otp : ", otp);
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
            react: SendVerificationOtp({ otp, type: "forget-password" }),
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
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
      refreshCache: {
        updateAge: 60,
      },
    },
  },
  account: {
    storeAccountCookie: true,
    storeStateStrategy: "cookie",
  },
  // secondaryStorage: {
  //   async get(key: string) {
  //     const redisKey = SESSION_PREFIX + key;
  //     const cached = await redis.get(redisKey);
  //     if (cached) {
  //       console.log("SESSION HIT -> REDIS");
  //       return JSON.parse(cached);
  //     }
  //     console.log("SESSION MISS -> DATABASE");
  //     const session = await prismaDb.session.findFirst({
  //       where: {
  //         token: key,
  //       },
  //     });
  //     if (!session) return null;
  //     await redis.set(redisKey, JSON.stringify(session), "EX", ONE_DAY);
  //     return session;
  //   },
  //   async set(key: string, value, ttl?: number) {
  //     const redisKey = SESSION_PREFIX + key;
  //     await redis.set(redisKey, JSON.stringify(value), "EX", ttl || ONE_DAY);
  //   },
  //   async delete(key: string) {
  //     const redisKey = SESSION_PREFIX + key;
  //     await redis.del(redisKey);
  //   },
  // },
});
