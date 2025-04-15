-- DROP INDEX "builds_search_vector_index";--> statement-breakpoint
CREATE INDEX "builds_name_and_description_search_index" ON "builds" USING gin (to_tsvector('english', "details"->>'name' || ' ' || "details"->>'description'));--> statement-breakpoint
ALTER TABLE "builds" DROP COLUMN "search_vector";