// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTable, pgTableCreator } from "drizzle-orm/pg-core";
import { uuid, text, timestamp } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ai-podcast_${name}`);

export const podcast = pgTable("podcast", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id").notNull(),
  title: text("title").notNull(),
  user_description: text("user_description"),
  status: text("status").notNull().default("GENERATING"),
  last_updated: timestamp("last_updated", { withTimezone: true }).defaultNow(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
