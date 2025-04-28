ALTER TABLE "build_likes" DROP CONSTRAINT "build_likes_build_id_builds_id_fk";
--> statement-breakpoint
ALTER TABLE "build_likes" ADD CONSTRAINT "build_likes_build_id_builds_id_fk" FOREIGN KEY ("build_id") REFERENCES "public"."builds"("id") ON DELETE cascade ON UPDATE cascade;