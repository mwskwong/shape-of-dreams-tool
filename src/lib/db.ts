import { type SQL, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import {
  customType,
  index,
  integer,
  jsonb,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";

export const db = drizzle({
  connection: process.env.DATABASE_URL ?? "",
  casing: "snake_case",
});

const tsvector = customType<{
  data: string;
}>({
  dataType: () => "tsvector",
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
    searchVector: tsvector()
      .notNull()
      .generatedAlwaysAs(
        (): SQL =>
          sql`to_tsvector('english', ${builds.build}->>'buildName' || ' ' || ${builds.build}->>'description')`,
      ),
  },
  ({ build, searchVector, likes, createdAt }) => [
    index().on(likes),
    index().on(createdAt),
    index().using("gin", searchVector),
    index().using("gin", build.op("jsonb_path_ops")),
  ],
);
