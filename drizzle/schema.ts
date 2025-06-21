import { pgTable, index, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const podcastStatus = pgEnum("podcast_status", ['GENERATING', 'READY', 'FAILED'])


export const podcasts = pgTable("podcasts", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	status: podcastStatus().default('GENERATING').notNull(),
	userDescription: text("user_description").notNull(),
	title: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	index("user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
]);
