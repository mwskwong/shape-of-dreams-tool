import { type MetadataRoute } from "next";

import { getBuildsMetadata } from "@/lib/queries";

const sitemap = async () => {
  const buildsMetadata = await getBuildsMetadata();
  return [
    ...["/", "/travelers", "/memories", "/essences", "/builds/create"].map(
      (path) => ({
        url: `${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""}${path}`,
        lastModified: new Date(),
      }),
    ),
    ...buildsMetadata.map(({ hashId, createdAt }) => ({
      url: `${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""}/builds/${hashId}`,
      lastModified: createdAt,
    })),
  ] satisfies MetadataRoute.Sitemap;
};

export const dynamic = "force-dynamic";

export default sitemap;
