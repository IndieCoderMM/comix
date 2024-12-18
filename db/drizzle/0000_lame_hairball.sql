CREATE TABLE "repos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "repos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"owner" varchar(100) NOT NULL,
	"owner_id" integer NOT NULL,
	"link" varchar(255) NOT NULL,
	"boost" integer DEFAULT 0,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1),
	"gh_login" varchar(100) NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"coins" integer DEFAULT 0,
	"claimables" integer DEFAULT 0,
	"sign_up_reward_claimed" boolean DEFAULT false,
	"level" integer DEFAULT 1,
	"exp" integer DEFAULT 0,
	"title" varchar(100) DEFAULT 'Beginner',
	"repo_count" integer DEFAULT 0,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_gh_login_unique" UNIQUE("gh_login")
);
--> statement-breakpoint
ALTER TABLE "repos" ADD CONSTRAINT "repos_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "name_idx" ON "repos" USING btree ("name");--> statement-breakpoint
CREATE INDEX "gh_login_idx" ON "users" USING btree ("gh_login");