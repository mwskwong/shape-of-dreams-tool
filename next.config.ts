import NextBundleAnalyzer from "@next/bundle-analyzer";
import dedent from "dedent";
import { type NextConfig } from "next";

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const config = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2_678_400, // 31 days
  },
  // eslint-disable-next-line @typescript-eslint/require-await -- headers must return a promise
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Content-Security-Policy",
          value: dedent`
            default-src 'self';
            script-src 'self' 'unsafe-eval' 'unsafe-inline' va.vercel-scripts.com;
            style-src 'self' 'unsafe-inline';
            img-src 'self' blob: data:;
            font-src 'self';
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            frame-ancestors 'none';
            upgrade-insecure-requests;
          `.replaceAll("\n", ""),
        },
      ],
    },
  ],
  // eslint-disable-next-line @typescript-eslint/require-await
  redirects: async () => [
    {
      source: "/",
      destination: "/travelers",
      permanent: false,
    },
  ],
  logging: { fetches: { fullUrl: true } },
  outputFileTracingIncludes: {
    "/builds/\\[hashId\\]/opengraph-image": [
      "./node_modules/geist/dist/fonts/**/*",
    ],
  },
  experimental: {
    typedEnv: true,
    reactCompiler: true,
    optimizePackageImports: ["@radix-ui/themes", "radix-ui"],
  },
} satisfies NextConfig;

export default withBundleAnalyzer(config);
