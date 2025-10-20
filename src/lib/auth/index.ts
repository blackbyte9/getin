import { prisma } from './../prisma/index';
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  database:
    prismaAdapter(prisma, {
      provider: "postgresql",
    }),

  emailAndPassword: {
    enabled: true,
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
  ],

});
