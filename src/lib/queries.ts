import { and, desc, eq, exists, sql } from "drizzle-orm";
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
  memories,
  essences,
  orderBy,
}: {
  search: string;
  memories: string[];
  essences: string[];
  orderBy: "newest" | "mostLiked";
}) => {
  "use cache";
  cacheLife("days");
  cacheTag("builds", "builds:list");

  const result = await db
    .select()
    .from(builds)
    .where(
      and(
        sql`${builds.searchVector} @@ to_tsquery('english', ${search})`,
        sql`jsonb_path_query_array(${builds.details}, '$.memories[*].id') @> ${JSON.stringify(memories)}::jsonb`,
        exists(
          db
            .select({ id: sql`1` })
            .from(
              sql`jsonb_array_elements(${builds.details}->'memories') AS memory`,
            )
            .where(sql`memory->'essences' @> ${JSON.stringify(essences)}`),
        ),
      ),
    )
    .orderBy(
      orderBy === "newest" ? desc(builds.createdAt) : desc(builds.likes),
    );
  return result.map(({ id, ...build }) => ({
    hashId: hashIds.encode(id),
    ...build,
  }));
};
