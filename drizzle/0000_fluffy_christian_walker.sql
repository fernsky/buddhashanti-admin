CREATE TABLE IF NOT EXISTS "acme_chapters" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"part_id" varchar(15) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_paragraphs" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"section_id" varchar(15) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_parts" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_sections" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"chapter_id" varchar(15) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_tables" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"data" json[] NOT NULL,
	"section_id" varchar(15) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_users" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"user_name" varchar(255) NOT NULL,
	"hashed_password" varchar(255),
	"avatar" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_idx" ON "acme_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_email_idx" ON "acme_users" USING btree ("user_name");