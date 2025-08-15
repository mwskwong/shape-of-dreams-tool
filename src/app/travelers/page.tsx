import "@/styles/traveler-colors.css";

import { Grid } from "@radix-ui/themes/components/grid";
import { Theme } from "@radix-ui/themes/components/theme";
import { type ResolvingMetadata } from "next";
import { type FC } from "react";
import {
  type BreadcrumbList,
  type WebSite,
  type WithContext,
} from "schema-dts";

import * as TravelerCard from "@/components/travelers/traveler-card";
import { getMemories } from "@/lib/memories";
import { routes, siteName, siteUrl } from "@/lib/site-config";
import { getTravelers } from "@/lib/travelers";

const travelers = getTravelers();
const memories = getMemories();

const Travelers: FC = () => (
  <>
    <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3" pt="3">
      {travelers.map(({ id, name, image, color, ...traveler }) => (
        <Theme key={id} accentColor={color}>
          <TravelerCard.Root image={image} name={name}>
            <TravelerCard.Content
              {...traveler}
              memories={memories.filter(({ traveler }) => traveler === id)}
            />
          </TravelerCard.Root>
        </Theme>
      ))}
    </Grid>
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteName,
            url: siteUrl,
          } satisfies WithContext<WebSite>,
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: routes.travelers.name,
              },
            ],
          } satisfies WithContext<BreadcrumbList>,
        ]),
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
    title: routes.travelers.name,
    openGraph: {
      ...openGraph,
      url: routes.travelers.pathname,
    },
  };
};

export default Travelers;
