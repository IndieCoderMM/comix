import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema",
  out: "./db/drizzle",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
