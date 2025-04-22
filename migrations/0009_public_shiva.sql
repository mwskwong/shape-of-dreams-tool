ALTER TABLE "builds" RENAME COLUMN "build" TO "details";--> statement-breakpoint
DROP INDEX "builds_build_index";--> statement-breakpoint
ALTER TABLE "builds" drop column "search_vector";--> statement-breakpoint
ALTER TABLE "builds" ADD COLUMN "search_vector" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', ("builds"."details"->>'buildName')::text || ' ' || ("builds"."details"->>'description')::text)) STORED NOT NULL;--> statement-breakpoint
CREATE INDEX "builds_details_index" ON "builds" USING gin ("details" jsonb_path_ops);