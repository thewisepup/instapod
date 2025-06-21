import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

export const credits = pgTable("credits", {
  userId: text("user_id").primaryKey(),
  balance: integer("balance").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
