import { BOOST_EXP_FACTOR, REPO_COST } from "@/utils/constants";
import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { repos } from "../schema/repo";
import { users } from "../schema/user";

export type NewRepo = typeof repos.$inferInsert;

/**
 * Creating repo uses user's coins
 */
export const createRepo = async (repo: NewRepo) => {
  // return db.insert(repos).values(repo).returning();
  return db.transaction(async (trx) => {
    const [user] = await trx
      .select()
      .from(users)
      .where(eq(users.id, repo.ownerId))
      .limit(1);

    if (!user) {
      trx.rollback();
      throw new Error("User not found");
    }

    if (!user.coins || user.coins < REPO_COST) {
      trx.rollback();
      throw new Error("Not enough coins");
    }

    await trx
      .update(users)
      .set({ coins: sql`${users.coins} - ${REPO_COST}` })
      .where(eq(users.id, repo.ownerId));

    return trx.insert(repos).values(repo).returning();
  });
};

export const getAllRepos = async () => {
  return db.select().from(repos).orderBy(desc(repos.boost));
};

export const deleteRepoById = async (id: number, ownerId: number) => {
  return db
    .delete(repos)
    .where(and(eq(repos.id, id), eq(repos.ownerId, ownerId)))
    .returning();
};

export const getRepoByOwnerName = async (owner: string, name: string) => {
  return db
    .select()
    .from(repos)
    .where(and(eq(repos.owner, owner), eq(repos.name, name)))
    .limit(1);
};

/**
 * Decrease user's coins and increase user's exp
 * Increase repo's boost
 */
export const boostRepoById = async (
  userId: number,
  repoId: number,
  boost: number,
) => {
  return db.transaction(async (trx) => {
    const [user] = await trx
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      trx.rollback();
      throw new Error("User not found");
    }

    if (!user.coins || user.coins < boost) {
      trx.rollback();
      throw new Error("Not enough coins");
    }

    const [repo] = await trx
      .select()
      .from(repos)
      .where(eq(repos.id, repoId))
      .limit(1);

    if (!repo) {
      trx.rollback();
      throw new Error("Repo not found");
    }

    // TODO: Refine this formula
    const expGained = Math.round(boost * BOOST_EXP_FACTOR);

    await trx
      .update(users)
      .set({
        coins: sql`${users.coins} - ${boost}`,
        exp: sql`${users.exp} + ${expGained}`,
      })
      .where(eq(users.id, userId));
    return await trx
      .update(repos)
      .set({ boost: sql`${repos.boost} + ${boost}` })
      .returning();
  });
};
