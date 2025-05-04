CREATE TABLE "build_likes" (
	"build_id" integer,
	"user_id" uuid NOT NULL,
	CONSTRAINT "build_likes_build_id_user_id_pk" PRIMARY KEY("build_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "build_likes" ADD CONSTRAINT "build_likes_build_id_builds_id_fk" FOREIGN KEY ("build_id") REFERENCES "public"."builds"("id") ON DELETE no action ON UPDATE no action;