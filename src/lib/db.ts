import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { index, integer, jsonb, pgTable, timestamp } from "drizzle-orm/pg-core";

export const db = drizzle({
  connection: process.env.DATABASE_URL ?? "",
  casing: "snake_case",
  logger: true,
});

export const builds = pgTable(
  "builds",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    details: jsonb()
      .$type<{
        name: string;
        traveler: {
          id: string;
          startingMemories: {
            q: string;
            r: string;
            identity: string;
            movement: string;
          };
        };
        memories: {
          id: string;
          essences: string[];
        }[];
        description: string;
      }>()
      .notNull(),
    likes: integer().notNull().default(0),
    createdAt: timestamp().notNull().defaultNow(),
  },
  ({ details, likes, createdAt }) => [
    index().on(likes),
    index().on(createdAt),
    index("builds_name_and_description_search_index").using(
      "gin",
      sql`to_tsvector('english', (${details}->>'name') || ' ' || (${details}->>'description'))`,
    ),
    index().using("gin", details.op("jsonb_path_ops")),
  ],
);
