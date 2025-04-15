import { Flex } from "@radix-ui/themes/components/flex";
import { type SearchParams } from "nuqs/server";
import { type FC } from "react";

import { getBuilds } from "@/lib/queries";
import { loadBuildSearchParams } from "@/lib/utils";

interface BuildsProps {
  searchParams: Promise<SearchParams>;
}

const Builds: FC<BuildsProps> = async ({ searchParams }) => {
  const parsedSearchParams = await loadBuildSearchParams(searchParams);
  const builds = await getBuilds(parsedSearchParams);

  return (
    <Flex direction="column" gap="3" pt="3">
      search result:
      <pre style={{ overflow: "auto" }}>
        <code>{JSON.stringify(builds, undefined, 2)}</code>
      </pre>
    </Flex>
  );
};

export default Builds;
