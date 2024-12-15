import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DB_URL as string;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

export const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client);
