const getSiteUrl = () => {
  if (
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production" &&
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  const previewOrigin =
    process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL;
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" && previewOrigin) {
    return `https://${previewOrigin}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const siteUrl = getSiteUrl();

export const routes = {
  travelers: { name: "Travelers", pathname: "/travelers" },
  memories: { name: "Memories", pathname: "/memories" },
  essences: { name: "Essences", pathname: "/essences" },
  builds: { name: undefined, pathname: "/builds" },
  builder: { name: "Builder", pathname: "/builds/create" },
};
