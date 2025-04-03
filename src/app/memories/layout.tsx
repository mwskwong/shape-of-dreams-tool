import { Flex } from "@radix-ui/themes/components/flex";
import { type FC, type PropsWithChildren, Suspense } from "react";

import { MemoriesToolbar } from "@/components/memories/memories-toolbar";
import {
  allMemoryRarities,
  allMemoryTags,
  allMemoryTypes,
  allTravelers,
} from "@/lib/utils";

const MemoriesLayout: FC<PropsWithChildren> = ({ children }) => (
  <Flex direction="column" gap="3" pt="3">
    <Suspense>
      <MemoriesToolbar
        allRarities={allMemoryRarities}
        allTags={allMemoryTags}
        allTravelers={allTravelers}
        allTypes={allMemoryTypes}
      />
    </Suspense>
    {children}
  </Flex>
);

export default MemoriesLayout;
