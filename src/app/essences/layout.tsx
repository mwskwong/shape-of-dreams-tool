import { Flex } from "@radix-ui/themes/components/flex";
import { type FC, type PropsWithChildren, Suspense } from "react";

import { EssencesToolbar } from "@/components/essences/essences-toolbar";
import { allEssenceRarities } from "@/lib/utils";

const EssencesLayout: FC<PropsWithChildren> = ({ children }) => (
  <Flex direction="column" gap="3" pt="3">
    <Suspense>
      <EssencesToolbar allRarities={allEssenceRarities} />
    </Suspense>
    {children}
  </Flex>
);

export default EssencesLayout;
