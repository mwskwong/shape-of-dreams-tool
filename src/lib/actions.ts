"use server";

import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form/nextjs";
import { revalidateTag } from "next/cache";

import { builds, db } from "./db";
import { formOptions, schema } from "./form";
import { hashIds } from "./utils";

const serverValidate = createServerValidate({
  ...formOptions,
  onServerValidate: schema,
});

export const submitBuild = async (_: unknown, formData: FormData) => {
  try {
    for (const key in formData.keys()) {
      if (key.startsWith("$ACTION")) {
        formData.delete(key);
      }
    }

    const details = await serverValidate(formData, {
      arrays: ["memories.$.essences"],
    });

    const [{ id }] = await db
      .insert(builds)
      .values({ details })
      .returning({ id: builds.id });
    const hashId = hashIds.encode(id);

    revalidateTag("builds:list");
    revalidateTag(`builds:${hashId}`);

    return { hashId };
  } catch (error) {
    if (error instanceof ServerValidateError) {
      return { formState: error.formState };
    }

    throw error;
  }
};
