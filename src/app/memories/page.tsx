import { Grid } from "@radix-ui/themes/components/grid";
import { type ResolvingMetadata } from "next";
import { type SearchParams } from "nuqs/server";
import { type FC } from "react";

import * as ItemCard from "@/components/item-card";
import { allMemoryEntries } from "@/lib/constants";
import { routes } from "@/lib/site-config";
import {
  getMutuallyExclusiveMemories,
  loadItemSearchParams,
} from "@/lib/utils";

interface MemoriesProps {
  searchParams: Promise<SearchParams>;
}

const Memories: FC<MemoriesProps> = async ({ searchParams }) => {
  const { search, rarities, types, travelers, tags } =
    await loadItemSearchParams(searchParams);

  return (
    <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3">
      {allMemoryEntries
        .filter(
          ([
            ,
            {
              name,
              description,
              shortDescription,
              rarity,
              type,
              traveler,
              achievementName,
              achievementDescription,
              tags: _tags,
            },
          ]) =>
            (search === "" ||
              name.toLowerCase().includes(search.toLowerCase()) ||
              description.toLowerCase().includes(search.toLowerCase()) ||
              Boolean(
                shortDescription?.toLowerCase().includes(search.toLowerCase()),
              ) ||
              achievementName
                .normalize("NFD") // cater for accented characters
                .replaceAll(/[\u0300-\u036F]/g, "")
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              achievementDescription
                .toLowerCase()
                .includes(search.toLowerCase())) &&
            (rarities.length === 0 || rarities.includes(rarity)) &&
            (types.length === 0 || types.includes(type)) &&
            (travelers.length === 0 || travelers.includes(traveler)) &&
            tags.every((tag) => (_tags as string[]).includes(tag)),
        )
        .map(
          ([
            key,
            {
              name,
              rarity,
              traveler,
              tags,
              image,
              cooldownTime,
              maxCharges,
              type,
              achievementDescription,
              achievementName,
              rawDesc,
              rawDescVars,
              travelerMemoryLocation,
            },
          ]) => (
            <ItemCard.Root key={key} tags={tags}>
              <ItemCard.Header
                image={image}
                name={name}
                rarity={rarity}
                traveler={traveler}
              />
              <ItemCard.Content
                achievementDescription={achievementDescription}
                achievementName={achievementName}
                cooldownTime={cooldownTime}
                maxCharges={maxCharges}
                type={type}
                mutuallyExclusive={getMutuallyExclusiveMemories({
                  name,
                  rarity,
                  traveler,
                  travelerMemoryLocation,
                })}
              >
                <ItemCard.Description rawDescVars={rawDescVars}>
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
    title: routes.memories.name,
    openGraph: {
      ...openGraph,
      url: routes.memories.pathname,
    },
  };
};

export default Memories;
