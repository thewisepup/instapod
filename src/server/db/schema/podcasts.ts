import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  index,
} from "drizzle-orm/pg-core";

export const PODCAST_STATUS = ["GENERATING", "READY", "FAILED"] as const;
export type PodcastStatus = (typeof PODCAST_STATUS)[number];
export const podcastStatusEnum = pgEnum("podcast_status", PODCAST_STATUS);

export const podcasts = pgTable(
  "podcasts",
  {
    id: uuid("id").primaryKey(),
    userId: text("user_id").notNull(),
    status: podcastStatusEnum("status").notNull().default("GENERATING"),
    userDescription: text("user_description").notNull(),
    title: text("title"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("user_id_idx").on(table.userId)],
);
