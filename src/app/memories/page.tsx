import { Flex } from "@radix-ui/themes/components/flex";
import { Grid } from "@radix-ui/themes/components/grid";
import { type Metadata } from "next";
import { type SearchParams } from "nuqs/server";
import { type FC } from "react";

import { ItemCard } from "@/components/item-card";
import { Toolbar } from "@/components/memories/toolbar";
import {
  compareMemories,
  compareRarities,
  loadSearchParams,
} from "@/lib/utils";
import memories from "@public/data/memories.json";

const allRarities = [
  ...new Set(Object.values(memories).map(({ rarity }) => rarity)),
].toSorted(compareRarities);

const allTypes = [...new Set(Object.values(memories).map(({ type }) => type))];

const allTravelers = [
  ...new Set(Object.values(memories).map(({ traveler }) => traveler)),
]
  .filter(Boolean)
  .toSorted();

const allTags = [
  ...new Set(Object.values(memories).flatMap(({ tags }) => tags)),
].toSorted();

interface MemoriesProps {
  searchParams: Promise<SearchParams>;
}

const Memories: FC<MemoriesProps> = async ({ searchParams }) => {
  const { search, rarities, types, travelers, tags } =
    await loadSearchParams(searchParams);

  return (
    <Flex direction="column" gap="3" pt="3">
      <Toolbar
        allRarities={allRarities}
        allTags={allTags}
        allTravelers={allTravelers}
        allTypes={allTypes}
      />
      <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3">
        {Object.entries(memories)
          .toSorted(([, a], [, b]) => compareMemories(a, b))
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
                addedCharges,
                shortDescription,
                travelerMemoryLocation: _travelerMemoryLocation,
                ...memory
              },
            ]) => {
              const mutuallyExclusive = Object.values(memories)
                .filter(
                  ({ name, traveler, travelerMemoryLocation }) =>
                    name !== memory.name &&
                    traveler &&
                    traveler === memory.traveler &&
                    travelerMemoryLocation === _travelerMemoryLocation,
                )
                .map(({ name }) => name);

              return (
                <ItemCard
                  key={key}
                  {...memory}
                  mutuallyExclusive={mutuallyExclusive}
                />
              );
            },
          )}
      </Grid>
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Memories",
};

export default Memories;
