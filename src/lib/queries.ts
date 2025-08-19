import "server-only";

import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
  inArray,
  sql,
} from "drizzle-orm";
import { memoize } from "nextjs-better-unstable-cache";
import { type PickDeep } from "type-fest";

import { buildLikes, builds, db } from "./db";
import { type BuildDetails } from "./schemas";
import { hashIds } from "./utils";

export const getBuildsMetadata = memoize(
  async () => {
    const result = await db
      .select({ id: builds.id, createdAt: builds.createdAt })
      .from(builds);

    return result.map(({ id, createdAt }) => ({
      hashId: hashIds.encode(id),
      createdAt: createdAt.toISOString(), // Next.js cache only accepts primitives
    }));
  },
  {
    revalidateTags: ["builds", "builds:list"],
    log: ["dedupe", "datacache", "verbose"],
  },
);

export const getBuildByHashId = memoize(
  async (hashId: string) => {
    if (!hashIds.isValidId(hashId)) return;

    const id = hashIds.decode(hashId)[0] as number;
    const result = await db
      .select({ ...getTableColumns(builds), likes: count(buildLikes.userId) })
      .from(builds)
      .leftJoin(buildLikes, eq(builds.id, buildLikes.buildId))
      .where(eq(builds.id, id))
      .groupBy(builds.id);

    if (result.length === 0) return;

    const build = result[0];
    return {
      hashId,
      ...build,
      createdAt: build.createdAt.toISOString(), // Next.js cache only accepts primitives
    };
  },
  {
    duration: 60 * 60 * 24 * 7, // 1 week
    revalidateTags: (hashId) => ["builds", `builds:${hashId}`],
    log: ["dedupe", "datacache", "verbose"],
  },
);

export const getIsBuildLikedByUserId = memoize(
  async (buildHashId: string, userId: string) => {
    const buildId = hashIds.decode(buildHashId)[0] as number;
    const result = await db
      .select({ id: sql`1` })
      .from(buildLikes)
      .where(
        and(eq(buildLikes.buildId, buildId), eq(buildLikes.userId, userId)),
      );

    return result.length > 0;
  },
  {
    revalidateTags: (buildHashId, userId) => [
      "builds",
      `builds:${buildHashId}:${userId}:likes`,
    ],
    log: ["dedupe", "datacache", "verbose"],
  },
);

export const getBuilds = memoize(
  async ({
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
    sort: "newest" | "mostViewed" | "mostLiked";
    limit: number;
    offset: number;
  }) => {
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
        .select({
          id: builds.id,
          details: sql<
            PickDeep<BuildDetails, "name" | "traveler.id" | "memories">
          >`json_build_object(
            'name', ${builds.details} ->> 'name',
            'traveler', json_build_object('id', ${builds.details} -> 'traveler' ->> 'id'),
            'memories', ${builds.details} -> 'memories'
          )`,
          createdAt: builds.createdAt,
          views: builds.views,
          likes: count(buildLikes.userId),
        })
        .from(builds)
        .leftJoin(buildLikes, eq(builds.id, buildLikes.buildId))
        .where(condition)
        .groupBy(builds.id)
        .orderBy(({ id, createdAt, views, likes }) => {
          const orders = [];
          switch (sort) {
            case "mostViewed": {
              orders.push(desc(views));
              break;
            }
            case "mostLiked": {
              orders.push(desc(likes));
              break;
            }
            default: {
              orders.push(desc(createdAt));
            }
          }
          orders.push(id);

          return orders;
        })
        .limit(limit)
        .offset(offset),
      db.$count(builds, condition),
    ]);

    return {
      data: result.map(({ id, createdAt, ...build }) => ({
        hashId: hashIds.encode(id),
        ...build,
        createdAt: createdAt.toISOString(), // Next.js cache only accepts primitives
      })),
      total,
    };
  },
  {
    duration: 60 * 60 * 24 * 7, // 1 week
    revalidateTags: ["builds", "builds:list"],
    log: ["dedupe", "datacache", "verbose"],
  },
);
