"use server";

import { randomUUID } from "node:crypto";

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

export const likeBuild = async (hashId: string) => {
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
};
