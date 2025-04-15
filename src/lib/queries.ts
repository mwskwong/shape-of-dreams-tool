import { and, arrayContains, desc, eq, inArray, sql } from "drizzle-orm";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";

import { builds, db } from "./db";
import { hashIds } from "./utils";

export const getBuildsMetadata = async () => {
  "use cache";
  cacheLife("days");
  cacheTag("builds", "builds:list");

  const result = await db
    .select({ id: builds.id, createdAt: builds.createdAt })
    .from(builds);
  return result.map(({ id, createdAt }) => ({
    hashId: hashIds.encode(id),
    createdAt,
  }));
};

export const getBuildByHashId = async (hashId: string) => {
  "use cache";
  cacheLife("max");
  cacheTag("builds", `builds:${hashId}`);

  if (!hashIds.isValidId(hashId)) return;

  const id = hashIds.decode(hashId)[0];
  const build = await db
    .select()
    .from(builds)
    .where(eq(builds.id, id as number));

  return build[0];
};

export const getBuilds = async ({
  search,
  travelers,
  memories,
  essences,
  sort,
}: {
  search: string;
  travelers: string[];
  memories: string[];
  essences: string[];
  sort: "newest" | "mostLiked";
}) => {
  "use cache";
  cacheLife("days");
  cacheTag("builds", "builds:list");

  const conditions = [];
  if (search) {
    conditions.push(
      sql`to_tsvector('english', (${builds.details}->>'name') || ' ' || (${builds.details}->>'description')) @@ websearch_to_tsquery('english', ${search})`,
    );
  }

  if (travelers.length > 0) {
    conditions.push(
      inArray(sql`${builds.details}->'traveler'->>'id'`, travelers),
    );
  }

  if (memories.length > 0) {
    conditions.push(
      arrayContains(
        sql`jsonb_path_query_array(${builds.details}, '$.memories[*].id')`,
        memories,
      ),
    );
  }

  if (essences.length > 0) {
    conditions.push(
      arrayContains(
        sql`jsonb_path_query_array(${builds.details}, '$.memories[*].essences[*]')`,
        essences,
      ),
    );
  }

  const result = await db
    .select()
    .from(builds)
    .where(and(...conditions))
    .orderBy(sort === "newest" ? desc(builds.createdAt) : desc(builds.likes));
  return result.map(({ id, ...build }) => ({
    hashId: hashIds.encode(id),
    ...build,
  }));
};
