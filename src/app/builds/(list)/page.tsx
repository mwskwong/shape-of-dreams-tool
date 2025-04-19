import "@/styles/traveler-colors.css";

import { Box } from "@radix-ui/themes/components/box";
import { Card } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import { Grid } from "@radix-ui/themes/components/grid";
import { Heading } from "@radix-ui/themes/components/heading";
import * as HoverCard from "@radix-ui/themes/components/hover-card";
import { Inset } from "@radix-ui/themes/components/inset";
import { Separator } from "@radix-ui/themes/components/separator";
import { Text } from "@radix-ui/themes/components/text";
import { IconThumbUp } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { type SearchParams } from "nuqs/server";
import { type FC } from "react";

import * as ItemCard from "@/components/item-card";
import {
  allEssences,
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

import styles from "./page.module.css";

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

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
                        height={80}
                        src={`/images/${traveler.image}`}
                        width={80}
                      />
                    ) : (
                      <Box height="80px" width="80px" />
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
                                achievementName={memory.achievementName}
                                cooldownTime={memory.cooldownTime}
                                maxCharges={memory.maxCharges}
                                size="2"
                                type={memory.type}
                                achievementDescription={
                                  memory.achievementDescription
                                }
                                mutuallyExclusive={getMutuallyExclusiveMemories(
                                  memory,
                                )}
                              >
                                <ItemCard.Description
                                  rawDescVars={memory.rawDescVars}
                                  size="2"
                                >
                                  {memory.rawDesc}
                                </ItemCard.Description>
                              </ItemCard.Content>
                            </Flex>
                          </HoverCard.Content>
                        )}
                      </HoverCard.Root>

                      {essences.map((id, index) => {
                        const essence = allEssences.find(
                          (essence) => essence.id === id,
                        );

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
                                    achievementName={essence.achievementName}
                                    size="2"
                                    achievementDescription={
                                      essence.achievementDescription
                                    }
                                  >
                                    <ItemCard.Description
                                      leveling="quality"
                                      rawDescVars={essence.rawDescVars}
                                      size="2"
                                    >
                                      {essence.rawDesc}
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

                <Flex
                  align="center"
                  className={styles.buildCardMetadata}
                  gap="3"
                >
                  <Text color="gray" size="2">
                    {dateFormatter.format(build.createdAt)}
                  </Text>
                  <Separator orientation="vertical" />
                  <Flex asChild align="center" gap="2">
                    <Text color="gray" size="2">
                      <IconThumbUp size={18} />
                      <span>{build.likes} likes</span>
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
};

export default Builds;
