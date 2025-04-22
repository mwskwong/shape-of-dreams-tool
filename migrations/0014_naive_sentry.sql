ALTER TABLE "builds" ADD COLUMN "hidden" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX "builds_hidden_index" ON "builds" USING btree ("hidden");