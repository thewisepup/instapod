CREATE TYPE "public"."transaction_type" AS ENUM('podcast_generation', 'free_tier', 'credit_purchase', 'misc');--> statement-breakpoint
CREATE TABLE "credits" (
	"user_id" text PRIMARY KEY NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"transaction_type" "transaction_type" NOT NULL,
	"amount" integer NOT NULL,
	"description" text,
	"external_transaction_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX "user_id_idx";--> statement-breakpoint
ALTER TABLE "podcasts" ADD COLUMN "credits_cost" integer NOT NULL;--> statement-breakpoint
CREATE INDEX "transactions_user_id_idx" ON "transactions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "podcasts_user_id_idx" ON "podcasts" USING btree ("user_id");