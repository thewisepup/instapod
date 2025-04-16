ALTER TABLE "podcasts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "podcasts" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "podcasts" ALTER COLUMN "updated_at" DROP NOT NULL;