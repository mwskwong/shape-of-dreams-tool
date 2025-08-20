import { type MetadataRoute } from "next";

import { getBuildsMetadata } from "@/lib/queries";
import { routes, siteUrl } from "@/lib/site-config";

const sitemap = async () => {
  const buildsMetadata = await getBuildsMetadata();
  return [
    ...Object.values(routes)
      .filter(({ name }) => name)
      .map(({ pathname }) => ({
        url: `${siteUrl}${pathname}`,
        lastModified: new Date(),
      })),
    ...buildsMetadata.flatMap(({ hashId, createdAt }) => [
      {
        url: `${siteUrl}${routes.builds.pathname}/${hashId}`,
        lastModified: createdAt,
      },
      {
        url: `${siteUrl}${routes.cloneBuild.pathname}/${hashId}`,
        lastModified: createdAt,
      },
    ]),
  ] satisfies MetadataRoute.Sitemap;
};

export default sitemap;
