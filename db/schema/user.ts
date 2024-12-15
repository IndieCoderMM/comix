import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  ghLogin: varchar("gh_login", { length: 100 }).notNull().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  image: text("image").notNull(),
  initialContribution: integer("initial_contribution").default(0),
  coins: integer("coins").default(0),
});
