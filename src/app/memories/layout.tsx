import { Flex } from "@radix-ui/themes/components/flex";
import { type FC, type PropsWithChildren, Suspense } from "react";

import { MemoriesToolbar } from "@/components/memories/memories-toolbar";
import { compareRarities } from "@/lib/utils";
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

const EssencesLayout: FC<PropsWithChildren> = ({ children }) => (
  <Flex direction="column" gap="3" pt="3">
    <Suspense>
      <MemoriesToolbar
        allRarities={allRarities}
        allTags={allTags}
        allTravelers={allTravelers}
        allTypes={allTypes}
      />
    </Suspense>
    {children}
  </Flex>
);

export default EssencesLayout;
