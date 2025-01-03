ALTER TABLE "acme_chapters" RENAME COLUMN "name" TO "title_en";--> statement-breakpoint
ALTER TABLE "acme_paragraphs" RENAME COLUMN "name" TO "content_en";--> statement-breakpoint
ALTER TABLE "acme_parts" RENAME COLUMN "name" TO "title_en";--> statement-breakpoint
ALTER TABLE "acme_sections" RENAME COLUMN "name" TO "title_en";--> statement-breakpoint
ALTER TABLE "acme_tables" RENAME COLUMN "name" TO "title_en";--> statement-breakpoint
ALTER TABLE "acme_chapters" ADD COLUMN "title_ne" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "acme_paragraphs" ADD COLUMN "content_ne" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "acme_parts" ADD COLUMN "title_ne" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "acme_sections" ADD COLUMN "title_ne" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "acme_tables" ADD COLUMN "title_ne" varchar(255) NOT NULL;