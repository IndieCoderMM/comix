CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"gh_login" varchar(100) NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"initial_contribution" integer DEFAULT 0,
	"coins" integer DEFAULT 0,
	CONSTRAINT "users_gh_login_unique" UNIQUE("gh_login")
);
