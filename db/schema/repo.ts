import { relations } from "drizzle-orm";
import { index, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helper";
import { users } from "./user";

export const repos = pgTable(
  "repos",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    owner: varchar("owner", { length: 100 }).notNull(),
    ownerId: integer("owner_id")
      .notNull()
      .references(() => users.id),
    link: varchar("link", { length: 255 }).notNull(),
    boost: integer("boost").default(0),
    ...timestamps,
  },
  (table) => [index("name_idx").on(table.name)],
);

export const repoRelations = relations(repos, ({ one }) => ({
  owner: one(users, {
    fields: [repos.ownerId],
    references: [users.id],
  }),
}));
