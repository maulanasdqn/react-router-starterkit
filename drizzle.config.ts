import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './app/libs/database/schema.ts',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || '',
    authToken: process.env.TURSO_AUTH_TOKEN || '',
  },
});