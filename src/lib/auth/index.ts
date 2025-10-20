import { UserRole } from '@/generated/prisma';
import { prisma } from './../prisma/index';
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from 'better-auth/next-js';
import { admin } from 'better-auth/plugins';
import { ac, roles } from './permissions';
import { sendEmailAction } from '@/actions/auth/email-send';

export const auth = betterAuth({
  database:
    prismaAdapter(prisma, {
      provider: "postgresql",
    }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignIn: true,
    expiresIn: 60 * 60 * 24, // 24 hours
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmailAction({
        to: user.email,
        subject: "Verify your email address",
        meta: {
          description: "Email verification for your account",
          link: String(url),
        }
      });
    }
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const adminEmails = process.env.ADMIN_EMAILS?.split(";") || [];
          if (adminEmails.includes(user.email)) {
            user.role = "ADMIN";
          }
          return { data: user };
        }
      }
    }
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"],
        default: "USER",
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
  },
  plugins: [
    nextCookies(),
    admin({
      defaultRole: UserRole.USER,
      adminRoles: [UserRole.ADMIN],
      ac,
      roles
    }),
  ],

});
