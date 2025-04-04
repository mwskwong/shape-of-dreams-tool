import { type MetadataRoute } from "next";

const sitemap = () =>
  ["/", "/travelers", "/memories", "/essences", "/builds/create"].map(
    (path) => ({
      url: `${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""}${path}`,
      lastModified: new Date(),
    }),
  ) satisfies MetadataRoute.Sitemap;

export default sitemap;
