import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
  inArray,
  sql,
} from "drizzle-orm";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";

import { buildLikes, builds, db } from "./db";
import { hashIds } from "./utils";

export const getBuildsMetadata = async () => {
  "use cache";
  cacheLife("max");
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

  const id = hashIds.decode(hashId)[0] as number;
  const build = await db
    .select({ ...getTableColumns(builds), likes: count(buildLikes.userId) })
    .from(builds)
    .leftJoin(buildLikes, eq(builds.id, buildLikes.buildId))
    .where(eq(builds.id, id))
    .groupBy(builds.id);

  return build[0];
};

export const getIsBuildLikedByUserId = async (
  buildHashId: string,
  userId: string,
) => {
  "use cache";
  cacheLife("max");
  cacheTag("builds", `builds:${buildHashId}:${userId}:likes`);

  const buildId = hashIds.decode(buildHashId)[0] as number;
  const result = await db
    .select({ id: sql`1` })
    .from(buildLikes)
    .where(and(eq(buildLikes.buildId, buildId), eq(buildLikes.userId, userId)));

  return result.length > 0;
};

export const getBuilds = async ({
  search,
  travelers,
  memories,
  essences,
  sort,
  limit,
  offset,
}: {
  search: string;
  travelers: string[];
  memories: string[];
  essences: string[];
  sort: "newest" | "mostLiked";
  limit: number;
  offset: number;
}) => {
  "use cache";
  cacheLife("max");
  cacheTag("builds", "builds:list");

  const conditions = [eq(builds.hidden, false)];
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
      sql`jsonb_path_query_array(${builds.details}, '$.memories[*].id') @> ${JSON.stringify(memories)}`,
    );
  }

  if (essences.length > 0) {
    conditions.push(
      sql`jsonb_path_query_array(${builds.details}, '$.memories[*].essences[*]') @> ${JSON.stringify(essences)}`,
    );
  }

  const condition = and(...conditions);
  const [result, total] = await Promise.all([
    db
      .select({ ...getTableColumns(builds), likes: count(buildLikes.userId) })
      .from(builds)
      .leftJoin(buildLikes, eq(builds.id, buildLikes.buildId))
      .where(condition)
      .groupBy(builds.id)
      .orderBy(({ id, createdAt, likes }) => [
        sort === "newest" ? desc(createdAt) : desc(likes),
        id,
      ])
      .limit(limit)
      .offset(offset),
    db.$count(builds, condition),
  ]);

  return {
    data: result.map(({ id, ...build }) => ({
      hashId: hashIds.encode(id),
      ...build,
    })),
    total,
  };
};
