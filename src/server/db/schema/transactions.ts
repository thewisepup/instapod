import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  serial,
  integer,
  index,
} from "drizzle-orm/pg-core";

export const TRANSACTION_TYPE = [
  "podcast_generation",
  "free_tier",
  "credit_purchase",
  "misc",
] as const;
export type TransactionType = (typeof TRANSACTION_TYPE)[number];
export const transactionTypeEnum = pgEnum("transaction_type", TRANSACTION_TYPE);

export const TransactionType = {
  PODCAST_GENERATION: TRANSACTION_TYPE[0],
  FREE_TIER: TRANSACTION_TYPE[1],
  CREDIT_PURCHASE: TRANSACTION_TYPE[2],
  MISC: TRANSACTION_TYPE[3],
} as const;

export const transactions = pgTable(
  "transactions",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    transactionType: transactionTypeEnum("transaction_type").notNull(),
    amount: integer("amount").notNull(),
    description: text("description"),
    externalTransactionId: text("external_transaction_id"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("transactions_user_id_idx").on(table.userId)],
);
