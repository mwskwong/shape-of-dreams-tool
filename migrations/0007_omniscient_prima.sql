-- ALTER TABLE "builds" ADD COLUMN "search_vector" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', "builds"."build"->>'buildName' || ' ' || "builds"."build"->>'description')) STORED NOT NULL;--> statement-breakpoint
ALTER TABLE "builds" ADD COLUMN "search_vector" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', ("builds"."build"->>'buildName')::text || ' ' || ("builds"."build"->>'description')::text)) STORED NOT NULL;--> statement-breakpoint
-- CREATE INDEX "builds_search_vector_index" ON "builds" USING gin ("search_vector");--> statement-breakpoint
CREATE INDEX "builds_build_index" ON "builds" USING gin ("build" jsonb_path_ops);