import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { users } from "../schema/user";

export type NewUser = typeof users.$inferInsert;

export const createUser = async (user: NewUser) => {
  return db.insert(users).values(user).returning();
};

export const getUserByGhLogin = async (ghLogin: string) => {
  return db.select().from(users).where(eq(users.ghLogin, ghLogin)).limit(1);
};

// "id" | "claimables" | "exp" | "level" | "title"
export const setupNewUser = async ({
  id,
  ...data
}: {
  id: number;
  claimables: number;
  exp: number;
  level: number;
  title: string;
}) => {
  return db.update(users).set(data).where(eq(users.id, id));
};

export const addClaimables = async (id: number, claimables: number) => {
  return db
    .update(users)
    .set({
      claimables: sql`${users.claimables} + ${claimables}`,
    })
    .where(eq(users.id, id));
};

export const claimCoins = async (id: number, coins: number) => {
  return db.transaction(async (trx) => {
    const [{ claimables }] = await trx
      .select({ claimables: users.claimables })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    if (!claimables) {
      trx.rollback();
      throw new Error("No claimables found");
    }

    if (claimables < coins) {
      trx.rollback();
      throw new Error("Not enough claimables");
    }

    await trx
      .update(users)
      .set({
        claimables: sql`${users.claimables} - ${coins}`,
        coins: sql`${users.coins} + ${coins}`,
      })
      .where(eq(users.id, id));
  });
};
