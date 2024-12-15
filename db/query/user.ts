import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../schema/user";

export type NewUser = typeof users.$inferInsert;

export const createUser = async (user: NewUser) => {
  return db.insert(users).values(user).returning();
};

export const getUserByGhLogin = async (ghLogin: string) => {
  return db.select().from(users).where(eq(users.ghLogin, ghLogin)).limit(1);
};
