CREATE TYPE "public"."podcast_status" AS ENUM('GENERATING', 'READY', 'FAILED');--> statement-breakpoint
CREATE TABLE "podcasts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"status" "podcast_status" DEFAULT 'GENERATING' NOT NULL,
	"user_description" text NOT NULL,
	"title" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "podcasts" USING btree ("user_id");