import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "LeulLMS<onboarding@resend.dev>",
          to: [email],
          subject: "Verify your email",
          html: `your verification code is <strong>${otp}</strong>. Please enter this code to continue.`,
        });
        // Implement the sendVerificationOTP method to send the OTP to the user's email address
      },
    }),
  ],
});
