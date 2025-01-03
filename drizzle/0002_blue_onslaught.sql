CREATE TABLE IF NOT EXISTS "acme_wards" (
	"ward_number" integer PRIMARY KEY NOT NULL,
	"ward_area_code" integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ward_number_idx" ON "acme_wards" USING btree ("ward_number");