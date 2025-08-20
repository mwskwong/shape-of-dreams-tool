import { Flex } from "@radix-ui/themes/components/flex";
import { type FC, Suspense } from "react";
import { type BreadcrumbList, type WithContext } from "schema-dts";

import { MemoriesToolbar } from "@/components/memories/memories-toolbar";
import { routes } from "@/lib/site-config";

const MemoriesLayout: FC<LayoutProps<"/memories">> = ({ children }) => (
  <>
    <Flex direction="column" gap="3" pt="3">
      <Suspense>
        <MemoriesToolbar />
      </Suspense>
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
              name: routes.memories.name,
            },
          ],
        } satisfies WithContext<BreadcrumbList>),
      }}
      type="application/ld+json"
    />
  </>
);

export default MemoriesLayout;
