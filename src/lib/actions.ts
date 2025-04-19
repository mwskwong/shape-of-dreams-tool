"use server";

import { revalidateTag } from "next/cache";
import { parse } from "valibot";

import { builds, db } from "./db";
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
