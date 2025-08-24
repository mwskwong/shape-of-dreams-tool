import { Suspense } from "react";
import { type BreadcrumbList, type WithContext } from "schema-dts";

import { EssencesToolbar } from "@/components/essences/essences-toolbar";

const EssencesLayout = ({ children }: LayoutProps<"/essences">) => (
  <>
    <div className="flex flex-col gap-4 py-4">
      <Suspense>
        <EssencesToolbar />
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
              name: "Essences",
            },
          ],
        } satisfies WithContext<BreadcrumbList>),
      }}
      type="application/ld+json"
    />
  </>
);

export default EssencesLayout;
