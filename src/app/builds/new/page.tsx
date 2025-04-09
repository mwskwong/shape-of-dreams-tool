import { type ResolvingMetadata } from "next";
import { type FC } from "react";
import { type BreadcrumbList, type WithContext } from "schema-dts";

import { BuildForm } from "@/components/builds/build-form";
import { routes } from "@/lib/site-config";

const NewBuild: FC = () => (
  <>
    <BuildForm pt="3" />
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
              item: routes.builds.pathname,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: routes.newBuild.name,
            },
          ],
        } satisfies WithContext<BreadcrumbList>),
      }}
      type="application/ld+json"
    />
  </>
);

export const generateMetadata = async (
  _: unknown,
  parent: ResolvingMetadata,
) => {
  const { openGraph } = await parent;

  return {
    title: "Create New Build",
    openGraph: {
      ...openGraph,
      url: routes.newBuild.pathname,
    },
  };
};

export default NewBuild;
