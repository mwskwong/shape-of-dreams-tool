import { drizzle } from "drizzle-orm/neon-http";
import { index, integer, jsonb, pgTable, timestamp } from "drizzle-orm/pg-core";

export const db = drizzle({
  connection: process.env.DATABASE_URL ?? "",
  casing: "snake_case",
});

export const builds = pgTable(
  "builds",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    build: jsonb()
      .$type<{
        buildName: string;
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
  ({ likes, createdAt }) => [index().on(likes), index().on(createdAt)],
);
