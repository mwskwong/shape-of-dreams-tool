import { Grid } from "@radix-ui/themes/components/grid";
import { type ResolvingMetadata } from "next";
import { type FC } from "react";

import * as ItemCard from "@/components/item-card";
import { getEssences } from "@/lib/essences";
import { routes } from "@/lib/site-config";
import { loadItemSearchParams } from "@/lib/utils";

const essences = getEssences();

const Essences: FC<PageProps<"/essences">> = async ({ searchParams }) => {
  const { search, rarities } = await loadItemSearchParams(searchParams);

  return (
    <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3">
      {essences
        .filter(
          ({
            name,
            description,
            achievementName,
            achievementDescription,
            rarity,
          }) =>
            (search === "" ||
              name.toLowerCase().includes(search.toLowerCase()) ||
              description.toLowerCase().includes(search.toLowerCase()) ||
              achievementName
                .normalize("NFD") // cater for accented characters
                .replaceAll(/[\u0300-\u036F]/g, "")
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              achievementDescription
                .toLowerCase()
                .includes(search.toLowerCase())) &&
            (rarities.length === 0 || rarities.includes(rarity)),
        )
        .map(
          ({
            id,
            name,
            rarity,
            rarityColor,
            image,
            achievementName,
            achievementDescription,
            rawDesc,
            rawDescVars,
          }) => (
            <ItemCard.Root key={id}>
              <ItemCard.Header
                image={image}
                name={name}
                rarity={rarity}
                rarityColor={rarityColor}
              />
              <ItemCard.Content
                achievementDescription={achievementDescription}
                achievementName={achievementName}
              >
                <ItemCard.Description
                  leveling="quality"
                  rawDescVars={rawDescVars}
                >
                  {rawDesc}
                </ItemCard.Description>
              </ItemCard.Content>
            </ItemCard.Root>
          ),
        )}
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
