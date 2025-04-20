import { Button } from "@radix-ui/themes/components/button";
import { Flex } from "@radix-ui/themes/components/flex";
import { type ResolvingMetadata } from "next";
import Link from "next/link";
import { type FC, type PropsWithChildren, Suspense } from "react";
import { type BreadcrumbList, type WithContext } from "schema-dts";

import { BuildsToolbar } from "@/components/builds/builds-toolbar";
import { routes } from "@/lib/site-config";

const BuildsLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Flex direction="column" gap="3" pt="3">
      <Flex
        align={{ sm: "start" }}
        direction={{ initial: "column", sm: "row" }}
        gapX="9"
        gapY="3"
        justify="between"
      >
        <Suspense>
          <BuildsToolbar />
        </Suspense>
        <Button asChild>
          <Link href={routes.newBuild.pathname}>Create your build</Link>
        </Button>
      </Flex>
      {children}
    </Flex>
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
    title: routes.builds.name,
    openGraph: {
      ...openGraph,
      url: routes.newBuild.pathname,
    },
  };
};

export default BuildsLayout;
