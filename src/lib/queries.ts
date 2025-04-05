import { eq } from "drizzle-orm";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";

import { builds, db } from "./db";
import { hashIds } from "./utils";

export const getBuildsMetadata = async () => {
  "use cache";
  cacheLife("days");

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
  cacheTag(`builds:${hashId}`);

  if (!hashIds.isValidId(hashId)) return;

  const id = hashIds.decode(hashId)[0];
  const build = await db
    .select()
    .from(builds)
    .where(eq(builds.id, id as number));

  return build[0];
};
