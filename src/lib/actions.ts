"use server";

import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form/nextjs";
import Hashids from "hashids";

import { builds, db } from "./db";
import { formOptions, schema } from "./form";

const hashids = new Hashids(process.env.HASH_IDS_SALT, 6);

const serverValidate = createServerValidate({
  ...formOptions,
  onServerValidate: schema,
});

export const submitBuild = async (_: unknown, formData: FormData) => {
  try {
    console.log({ formData });
    const build = await serverValidate(formData, {
      arrays: ["memories.$.essences"],
    });
    const [{ id }] = await db
      .insert(builds)
      .values({ build })
      .returning({ id: builds.id });

    return { hashId: hashids.encode(id) };

    return { hashId: "" };
  } catch (error) {
    if (error instanceof ServerValidateError) {
      return { formState: error.formState };
    }

    throw error;
  }
};
