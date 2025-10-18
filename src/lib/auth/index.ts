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
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"],
        default: "USER",
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
