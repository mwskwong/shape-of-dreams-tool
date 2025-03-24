import { Flex } from "@radix-ui/themes/components/flex";
import { type FC, type PropsWithChildren, Suspense } from "react";

import { EssencesToolbar } from "@/components/essences/essences-toolbar";
import { compareRarities } from "@/lib/utils";
import essences from "@public/data/essences.json";

const allRarities = [
  ...new Set(Object.values(essences).map(({ rarity }) => rarity)),
].toSorted(compareRarities);

const EssencesLayout: FC<PropsWithChildren> = ({ children }) => (
  <Flex direction="column" gap="3" pt="3">
    <Suspense>
      <EssencesToolbar allRarities={allRarities} />
    </Suspense>
    {children}
  </Flex>
);

export default EssencesLayout;
