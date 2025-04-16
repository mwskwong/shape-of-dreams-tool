import "@/styles/traveler-colors.css";

import { Box } from "@radix-ui/themes/components/box";
import { Card } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import { Grid } from "@radix-ui/themes/components/grid";
import { Heading } from "@radix-ui/themes/components/heading";
import * as HoverCard from "@radix-ui/themes/components/hover-card";
import { Inset } from "@radix-ui/themes/components/inset";
import { Text } from "@radix-ui/themes/components/text";
import Image from "next/image";
import Link from "next/link";
import { type SearchParams } from "nuqs/server";
import { type FC } from "react";

import * as ItemCard from "@/components/item-card";
import {
  allEssenceEntries,
  allMemoryEntries,
  allTravelerEntries,
} from "@/lib/constants";
import { getBuilds } from "@/lib/queries";
import { routes } from "@/lib/site-config";
import {
  getMutuallyExclusiveMemories,
  getTravelerColor,
  loadBuildSearchParams,
} from "@/lib/utils";

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
                <Card>
                  <Inset side="all">
                    {traveler ? (
                      <Image
                        alt={traveler.name}
                        height={128}
                        src={`/images/${traveler.image}`}
                        width={128}
                      />
                    ) : (
                      <Box height="128px" width="128px" />
                    )}
                  </Inset>
                </Card>
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
                      <HoverCard.Root>
                        <HoverCard.Trigger>
                          <Card>
                            <Inset side="all">
                              {memory ? (
                                <Image
                                  alt={memory.name}
                                  height={64}
                                  src={`/images/${memory.image}`}
                                  width={64}
                                />
                              ) : (
                                <Box height="64px" width="64px" />
                              )}
                            </Inset>
                          </Card>
                        </HoverCard.Trigger>

                        {memory && (
                          <HoverCard.Content>
                            <Flex direction="column" gap="3">
                              <ItemCard.Header
                                image={memory.image}
                                name={memory.name}
                                rarity={memory.rarity}
                                size="2"
                              />
                              <ItemCard.Content
                                achievement={memory.achievement}
                                cooldownTime={memory.cooldownTime}
                                maxCharges={memory.maxCharges}
                                size="2"
                                type={memory.type}
                                mutuallyExclusive={getMutuallyExclusiveMemories(
                                  memory,
                                )}
                              >
                                <ItemCard.Description size="2">
                                  {memory.description}
                                </ItemCard.Description>
                              </ItemCard.Content>
                            </Flex>
                          </HoverCard.Content>
                        )}
                      </HoverCard.Root>

                      {essences.map((id, index) => {
                        const essence = allEssenceEntries.find(
                          ([essenceId]) => essenceId === id,
                        )?.[1];

                        return (
                          <HoverCard.Root key={index}>
                            <HoverCard.Trigger>
                              <Card>
                                {essence ? (
                                  <Image
                                    alt={essence.name}
                                    height={24}
                                    src={`/images/${essence.image}`}
                                    width={24}
                                  />
                                ) : (
                                  <Box height="24px" width="24px" />
                                )}
                              </Card>
                            </HoverCard.Trigger>

                            {essence && (
                              <HoverCard.Content>
                                <Flex direction="column" gap="3">
                                  <ItemCard.Header
                                    image={essence.image}
                                    name={essence.name}
                                    rarity={essence.rarity}
                                    size="2"
                                  />
                                  <ItemCard.Content
                                    achievement={essence.achievement}
                                    size="2"
                                  >
                                    <ItemCard.Description size="2">
                                      {essence.description}
                                    </ItemCard.Description>
                                  </ItemCard.Content>
                                </Flex>
                              </HoverCard.Content>
                            )}
                          </HoverCard.Root>
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
