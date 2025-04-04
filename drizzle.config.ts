import "dotenv/config";

import { defineConfig } from "drizzle-kit";

const drizzleConfig = defineConfig({
  schema: "./src/lib/db.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  casing: "snake_case",
});

export default drizzleConfig;
