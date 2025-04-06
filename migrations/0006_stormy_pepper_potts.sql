DROP INDEX "builds_likes_index";--> statement-breakpoint
DROP INDEX "builds_created_at_index";--> statement-breakpoint
CREATE INDEX "builds_likes_index" ON "builds" USING btree ("likes");--> statement-breakpoint
CREATE INDEX "builds_created_at_index" ON "builds" USING btree ("created_at");