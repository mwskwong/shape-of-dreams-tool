import { Grid } from "@radix-ui/themes/components/grid";
import { type ResolvingMetadata } from "next";
import { type SearchParams } from "nuqs/server";
import { type FC } from "react";

import * as ItemCard from "@/components/item-card";
import { allEssenceEntries } from "@/lib/constants";
import { routes } from "@/lib/site-config";
import { loadSearchParams } from "@/lib/utils";

interface EssencesProps {
  searchParams: Promise<SearchParams>;
}

const Essences: FC<EssencesProps> = async ({ searchParams }) => {
  const { search, rarities } = await loadSearchParams(searchParams);

  return (
    <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3">
      {allEssenceEntries
        .filter(
          ([, { name, description, rarity }]) =>
            (search === "" ||
              name.toLowerCase().includes(search.toLowerCase()) ||
              description.toLowerCase().includes(search.toLowerCase())) &&
            (rarities.length === 0 || rarities.includes(rarity)),
        )
        .map(([key, { name, rarity, image, achievement, description }]) => (
          <ItemCard.Root key={key}>
            <ItemCard.Header image={image} name={name} rarity={rarity} />
            <ItemCard.Content achievement={achievement}>
              <ItemCard.Description>{description}</ItemCard.Description>
            </ItemCard.Content>
          </ItemCard.Root>
        ))}
    </Grid>
  );
};

export const generateMetadata = async (
  _: unknown,
  parent: ResolvingMetadata,
) => {
  const { openGraph } = await parent;

  return {
    title: routes.essences.name,
    openGraph: {
      ...openGraph,
      url: routes.essences.pathname,
    },
  };
};

export default Essences;
