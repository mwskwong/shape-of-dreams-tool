import { Flex } from "@radix-ui/themes/components/flex";
import { type FC, type PropsWithChildren, Suspense } from "react";

import { MemoriesToolbar } from "@/components/memories/memories-toolbar";

const MemoriesLayout: FC<PropsWithChildren> = ({ children }) => (
  <Flex direction="column" gap="3" pt="3">
    <Suspense>
      <MemoriesToolbar />
    </Suspense>
    {children}
  </Flex>
);

export default MemoriesLayout;
