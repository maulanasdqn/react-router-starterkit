import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/client";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    github: {
      clientId: import.meta.env.VITE_GITHUB_CLIENT_ID || "",
      clientSecret: import.meta.env.VITE_GITHUB_CLIENT_SECRET || "",
    },
  },
  trustedOrigins: ["http://localhost:5173", "http://localhost:3000"],
});


