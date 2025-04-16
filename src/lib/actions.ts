"use server";

import { revalidateTag } from "next/cache";
import { parse } from "valibot";

import { schema } from "./build-form";
import { builds, db } from "./db";
import { hashIds } from "./utils";

export const submitBuild = async (data: unknown) => {
  const details = parse(schema, data);
  const [{ id }] = await db
    .insert(builds)
    .values({ details })
    .returning({ id: builds.id });

  const hashId = hashIds.encode(id);
  revalidateTag("builds:list");
  revalidateTag(`builds:${hashId}`);

  return { hashId };
};
