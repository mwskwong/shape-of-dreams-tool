import { Flex } from "@radix-ui/themes/components/flex";
import { type FC, type PropsWithChildren, Suspense } from "react";
import { type BreadcrumbList, type WithContext } from "schema-dts";

import { EssencesToolbar } from "@/components/essences/essences-toolbar";
import { routes } from "@/lib/site-config";

const EssencesLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Flex direction="column" gap="3" pt="3">
      <Suspense>
        <EssencesToolbar />
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
              name: routes.essences.name,
            },
          ],
        } satisfies WithContext<BreadcrumbList>),
      }}
      type="application/ld+json"
    />
  </>
);

export default EssencesLayout;
