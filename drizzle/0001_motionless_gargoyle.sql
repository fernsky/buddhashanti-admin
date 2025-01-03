DO $$ BEGIN
 CREATE TYPE "public"."domain" AS ENUM('municipality', 'ward');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'editor', 'viewer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "acme_users" ADD COLUMN "role" "role" DEFAULT 'viewer' NOT NULL;--> statement-breakpoint
ALTER TABLE "acme_users" ADD COLUMN "domain" "domain" DEFAULT 'municipality' NOT NULL;--> statement-breakpoint
ALTER TABLE "acme_users" ADD COLUMN "ward_number" varchar(2);