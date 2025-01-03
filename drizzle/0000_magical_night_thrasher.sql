CREATE TABLE IF NOT EXISTS "acme_sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "acme_users" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"user_name" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"hashed_password" varchar(255),
	"phone_number" varchar(10),
	"email" varchar(255),
	"avatar" varchar(255),
	"ward_number" varchar(2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_idx" ON "acme_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_email_idx" ON "acme_users" USING btree ("user_name");