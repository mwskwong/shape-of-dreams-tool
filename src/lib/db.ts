import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { type BuildDetails } from "./schemas";

export const db = drizzle({
  connection: process.env.DATABASE_URL ?? "",
  casing: "snake_case",
  logger: true,
});

export const builds = pgTable(
  "builds",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    details: jsonb().$type<BuildDetails>().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    hidden: boolean().notNull().default(false),
  },
  ({ details, createdAt, hidden }) => [
    index().on(createdAt),
    index("builds_name_and_description_search_index").using(
      "gin",
      sql`to_tsvector('english', (${details}->>'name') || ' ' || (${details}->>'description'))`,
    ),
    index().using("gin", details.op("jsonb_path_ops")),
    index().on(hidden),
  ],
);

export const buildLikes = pgTable(
  "build_likes",
  {
    buildId: integer().references(() => builds.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    userId: uuid().notNull(),
  },
  ({ buildId, userId }) => [primaryKey({ columns: [buildId, userId] })],
);
