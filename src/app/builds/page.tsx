import { Flex } from "@radix-ui/themes/components/flex";
import { type ResolvingMetadata } from "next";
import { type FC } from "react";

import { BuildsToolbar } from "@/components/builds/builds-toolbar";
import { routes } from "@/lib/site-config";

const Builds: FC = () => {
  return (
    <Flex direction="column" gap="3" pt="3">
      <BuildsToolbar />
    </Flex>
  );
};

export const generateMetadata = async (
  _: unknown,
  parent: ResolvingMetadata,
) => {
  const { openGraph } = await parent;

  return {
    title: routes.builds.name,
    openGraph: {
      ...openGraph,
      url: routes.newBuild.pathname,
    },
  };
};

export default Builds;
