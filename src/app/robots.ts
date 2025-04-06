import { type MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-config";

const robots = () =>
  ({
    rules: {
      userAgent: "*",
      disallow: process.env.VERCEL_ENV === "production" ? undefined : "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }) satisfies MetadataRoute.Robots;

export default robots;
