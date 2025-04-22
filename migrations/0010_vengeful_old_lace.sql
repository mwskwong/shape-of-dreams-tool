ALTER TABLE "builds" drop column "search_vector";--> statement-breakpoint
UPDATE builds SET details = (details - 'buildName') || jsonb_build_object('name', details->'buildName');
ALTER TABLE "builds" ADD COLUMN "search_vector" "tsvector" GENERATED ALWAYS AS (to_tsvector('english', ("builds"."details"->>'name')::text || ' ' || ("builds"."details"->>'description')::text)) STORED NOT NULL;