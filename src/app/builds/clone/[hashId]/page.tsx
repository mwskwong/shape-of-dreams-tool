import { type ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type FC } from "react";
import { type BreadcrumbList, type WithContext } from "schema-dts";

import { BuildForm } from "@/components/builds/build-form";
import { getBuildByHashId } from "@/lib/queries";
import { routes, siteUrl } from "@/lib/site-config";

interface CloneBuildProps {
  params: Promise<{ hashId: string }>;
}

const CloneBuild: FC<CloneBuildProps> = async ({ params }) => {
  const { hashId } = await params;
  const build = await getBuildByHashId(hashId);

  if (!build) notFound();

  return (
    <>
      <BuildForm defaultValues={build.details} pt="3" />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: routes.builds.name,
                item: `${siteUrl}${routes.builds.pathname}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: `New Build from ${build.details.name}`,
              },
            ],
          } satisfies WithContext<BreadcrumbList>),
        }}
        type="application/ld+json"
      />
    </>
  );
};

export const generateMetadata = async (
  { params }: CloneBuildProps,
  parent: ResolvingMetadata,
) => {
  const { hashId } = await params;
  const build = await getBuildByHashId(hashId);
  const { openGraph } = await parent;

  if (!build) return;

  return {
    title: `New Build from ${build.details.name}`,
    openGraph: {
      ...openGraph,
      url: `${routes.cloneBuild.pathname}/${hashId}`,
    },
  };
};

// allow builds to revalidate in runtime, but statically render all paths the first time they're visited
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export const generateStaticParams = () => [];

export default CloneBuild;
