"use server";

import { randomUUID } from "node:crypto";

import { and, eq, sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { parse } from "valibot";

import { buildLikes, builds, db } from "./db";
import { buildDetailsSchema } from "./schemas";
import { hashIds } from "./utils";

export const submitBuild = async (data: unknown) => {
  const details = parse(buildDetailsSchema, data);
  const [{ id }] = await db
    .insert(builds)
    .values({ details })
    .returning({ id: builds.id });

  const hashId = hashIds.encode(id);
  revalidateTag("builds:list");
  revalidateTag(`builds:${hashId}`);

  return { hashId };
};

export const likeBuildByHashId = async (hashId: string) => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value ?? randomUUID();
  cookieStore.set("userId", userId, {
    maxAge: 365 * 24 * 60 * 60, // 1 yr
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });

  const buildId = hashIds.decode(hashId)[0] as number;
  await db.insert(buildLikes).values({ buildId, userId });

  revalidateTag("builds:list");
  revalidateTag(`builds:${hashId}`);
  revalidateTag(`builds:${hashId}:${userId}:likes`);
};

export const unlikeBuildByHashId = async (hashId: string) => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!userId) return;

  cookieStore.set("userId", userId, {
    maxAge: 365 * 24 * 60 * 60, // 1 yr
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });

  const buildId = hashIds.decode(hashId)[0] as number;
  await db
    .delete(buildLikes)
    .where(and(eq(buildLikes.buildId, buildId), eq(buildLikes.userId, userId)));

  revalidateTag("builds:list");
  revalidateTag(`builds:${hashId}`);
  revalidateTag(`builds:${hashId}:${userId}:likes`);
};

export const viewBuildByHashId = async (hashId: string) => {
  const id = hashIds.decode(hashId)[0] as number;
  await db
    .update(builds)
    .set({ views: sql`${builds.views} + 1` })
    .where(eq(builds.id, id));
};
