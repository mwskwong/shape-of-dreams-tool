import { type MetadataRoute } from "next";

import { getBuildsMetadata } from "@/lib/queries";
import { siteUrl } from "@/lib/site-config";

const routes = [
  "/",
  "/travelers",
  "/memories",
  "/essences",
  "/builds",
] as const;

const sitemap = async () => {
  const buildsMetadata = await getBuildsMetadata();
  return [
    ...routes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })),
    ...buildsMetadata.flatMap(({ hashId, createdAt }) => [
      {
        url: `${siteUrl}/builds/${hashId}`,
        lastModified: createdAt,
      },
      {
        url: `${siteUrl}/builds/clone/${hashId}`,
        lastModified: createdAt,
      },
    ]),
  ] satisfies MetadataRoute.Sitemap;
};

export default sitemap;
