DO $$ BEGIN
 CREATE TYPE "public"."roles" AS ENUM('enumerator', 'supervisor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint