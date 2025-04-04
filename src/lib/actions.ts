"use server";

import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form/nextjs";

import { builds, db } from "./db";
import { formOptions, schema } from "./form";
import { hashids } from "./utils";

const serverValidate = createServerValidate({
  ...formOptions,
  onServerValidate: schema,
});

export const submitBuild = async (_: unknown, formData: FormData) => {
  try {
    const build = await serverValidate(formData, {
      arrays: ["memories.$.essences"],
    });

    for (const key in build) {
      if (key.startsWith("$ACTION")) {
        // @ts-expect-error -- delete action keys
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete build[key];
      }
    }

    const [{ id }] = await db
      .insert(builds)
      .values({ build })
      .returning({ id: builds.id });

    return { hashId: hashids.encode(id) };
  } catch (error) {
    if (error instanceof ServerValidateError) {
      return { formState: error.formState };
    }

    throw error;
  }
};
