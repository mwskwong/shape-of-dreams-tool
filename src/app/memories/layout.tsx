import { type ResolvingMetadata } from "next";
import { Suspense } from "react";
import { type BreadcrumbList, type WithContext } from "schema-dts";

import { MemoriesToolbar } from "@/components/memories/memories-toolbar";

const MemoriesLayout = ({ children }: LayoutProps<"/memories">) => (
  <>
    <div className="flex flex-col gap-4 py-4">
      <Suspense>
        <MemoriesToolbar />
      </Suspense>
      {children}
    </div>
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Memories",
            },
          ],
        } satisfies WithContext<BreadcrumbList>),
      }}
      type="application/ld+json"
    />
  </>
);

export const generateMetadata = async (
  _: PageProps<"/memories">,
  parent: ResolvingMetadata,
) => {
  const { openGraph } = await parent;

  return {
    title: "Memories",
    openGraph: {
      ...openGraph,
      url: "/memories",
    },
  };
};

export default MemoriesLayout;
