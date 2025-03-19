import { Box } from "@radix-ui/themes/components/box";
import { Grid } from "@radix-ui/themes/components/grid";
import { type SearchParams } from "nuqs/server";
import { type FC } from "react";

import { ItemCard } from "@/components/item-card";
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
    <Box py="3">
      <Toolbar />
      <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3" mt="3">
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
              (tags.length === 0 || _tags.some((tag) => tags.includes(tag))),
          )
          .map(([key, memory]) => (
            <ItemCard key={key} {...memory} />
          ))}
      </Grid>
    </Box>
  );
};

export default Memories;
