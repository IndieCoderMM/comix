import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import { repos } from "./repo";

export const users = pgTable(
  "users",
  {
    id: integer("id")
      .primaryKey()
      .generatedAlwaysAsIdentity({ startWith: 1000 }),
    ghLogin: varchar("gh_login", { length: 100 }).notNull().unique(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    image: text("image").notNull(),
    coins: integer("coins").default(0),
    claimables: integer("claimables").default(0),
    signUpRewardClaimed: boolean("sign_up_reward_claimed").default(false),
    level: integer("level").default(1),
    exp: integer("exp").default(0),
    title: varchar("title", { length: 100 }).default("Beginner"),
    repoCount: integer("repo_count").default(0),
    ...timestamps,
  },
  (table) => [index("gh_login_idx").on(table.ghLogin)],
);

export const userRelations = relations(users, ({ many }) => ({
  repos: many(repos),
}));
