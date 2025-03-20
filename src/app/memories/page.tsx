import { Flex } from "@radix-ui/themes/components/flex";
import { Grid } from "@radix-ui/themes/components/grid";
import { type Metadata } from "next";
import { type SearchParams } from "nuqs/server";
import { type FC } from "react";

import { ItemCard } from "@/components/item-card";
import { Legend } from "@/components/legend";
import { Toolbar } from "@/components/memories/toolbar";
import { compareRarities, loadSearchParams } from "@/lib/utils";
import memories from "@public/data/memories.json";

interface MemoriesProps {
  searchParams: Promise<SearchParams>;
}

const Memories: FC<MemoriesProps> = async ({ searchParams }) => {
  const { search, rarities, types, travelers, tags } =
    await loadSearchParams(searchParams);

  return (
    <Flex direction="column" gap="3" pt="3">
      <Toolbar />
      <Legend />
      <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3">
        {Object.entries(memories)
          .toSorted(
            ([, a], [, b]) =>
              compareRarities(a.rarity, b.rarity) ||
              a.traveler.localeCompare(b.traveler) ||
              a.name.localeCompare(b.name),
          )
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
                tags: _tags,
              },
            ]) =>
              (search === "" ||
                name.toLowerCase().includes(search.toLowerCase()) ||
                description.toLowerCase().includes(search.toLowerCase()) ||
                shortDescription
                  ?.toLowerCase()
                  .includes(search.toLowerCase())) &&
              (rarities.length === 0 || rarities.includes(rarity)) &&
              (types.length === 0 || types.includes(type)) &&
              (travelers.length === 0 || travelers.includes(traveler)) &&
              tags.every((tag) => (_tags as string[]).includes(tag)),
          )
          .map(([key, memory]) => (
            <ItemCard key={key} {...memory} />
          ))}
      </Grid>
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Memories",
};

export default Memories;
