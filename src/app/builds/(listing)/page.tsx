import "@/styles/traveler-colors.css";

import { Avatar } from "@radix-ui/themes/components/avatar";
import { Box } from "@radix-ui/themes/components/box";
import { Card } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import { Grid } from "@radix-ui/themes/components/grid";
import { Heading } from "@radix-ui/themes/components/heading";
import { Text } from "@radix-ui/themes/components/text";
import Image from "next/image";
import Link from "next/link";
import { type SearchParams } from "nuqs/server";
import { type FC } from "react";

import {
  allEssenceEntries,
  allMemoryEntries,
  allTravelerEntries,
} from "@/lib/constants";
import { getBuilds } from "@/lib/queries";
import { routes } from "@/lib/site-config";
import { getTravelerColor, loadBuildSearchParams } from "@/lib/utils";

interface BuildsProps {
  searchParams: Promise<SearchParams>;
}

const Builds: FC<BuildsProps> = async ({ searchParams }) => {
  const parsedSearchParams = await loadBuildSearchParams(searchParams);
  const builds = await getBuilds(parsedSearchParams);

  return (
    <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3">
      {builds.map((build) => {
        const traveler = allTravelerEntries.find(
          ([id]) => id === build.details.traveler.id,
        )?.[1];

        return (
          <Card key={build.hashId} asChild>
            <Link href={`${routes.builds.pathname}/${build.hashId}`}>
              <Flex align="center" direction="column" gap="3">
                {traveler ? (
                  <Image
                    alt={traveler.name}
                    className={"rt-AvatarRoot rt-r-size-6"}
                    height={80}
                    src={`/images/${traveler.image}`}
                    width={80}
                  />
                ) : (
                  <Avatar color="gray" fallback="?" size="6" />
                )}
                <Flex align="center" direction="column">
                  <Heading as="h2" size="4">
                    {build.details.name}
                  </Heading>
                  <Text
                    color={
                      getTravelerColor(build.details.traveler.id) ?? "gray"
                    }
                  >
                    {traveler?.name ?? "Any Traveler"}
                  </Text>
                </Flex>

                {build.details.memories.map(({ id, essences }, index) => {
                  const memory = allMemoryEntries.find(
                    ([memoryId]) => memoryId === id,
                  )?.[1];

                  return (
                    <Flex key={index} align="center" gap="3">
                      {memory ? (
                        <Image
                          alt={memory.name}
                          className={"rt-AvatarRoot rt-r-size-4"}
                          height={48}
                          src={`/images/${memory.image}`}
                          width={48}
                        />
                      ) : (
                        <Avatar color="gray" fallback="?" size="4" />
                      )}

                      {essences.map((id, index) => {
                        const essence = allEssenceEntries.find(
                          ([essenceId]) => essenceId === id,
                        )?.[1];

                        if (!essence) return <Box key={index} width="32px" />;

                        return (
                          <Image
                            key={index}
                            alt={essence.name}
                            height={32}
                            src={`/images/${essence.image}`}
                            width={32}
                          />
                        );
                      })}
                    </Flex>
                  );
                })}
              </Flex>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
};

export default Builds;
