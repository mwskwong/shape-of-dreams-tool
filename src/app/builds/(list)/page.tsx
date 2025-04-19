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

import { Pagination } from "@/components/builds/pagination";
import * as ItemCard from "@/components/item-card";
import { allEssences, allMemories, allTravelers } from "@/lib/constants";
import { getBuilds } from "@/lib/queries";
import { routes } from "@/lib/site-config";
import {
  getMutuallyExclusiveMemories,
  getRarityColor,
  getTravelerColor,
  loadBuildSearchParams,
} from "@/lib/utils";

import styles from "./page.module.css";

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });
const pageSize = 12;

interface BuildsProps {
  searchParams: Promise<SearchParams>;
}

const Builds: FC<BuildsProps> = async ({ searchParams }) => {
  const { page, ...parsedSearchParams } =
    await loadBuildSearchParams(searchParams);
  const { builds, count } = await getBuilds({
    ...parsedSearchParams,
    limit: pageSize,
    offset: (page - 1) * 12,
  });

  return (
    <Flex direction="column" gap="6">
      <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="3">
        {builds.map((build) => {
          const traveler = allTravelers.find(
            ({ id }) => id === build.details.traveler.id,
          );

          return (
            <Card key={build.hashId} asChild>
              <Link href={`${routes.builds.pathname}/${build.hashId}`}>
                <Flex align="center" direction="column" gap="3" height="100%">
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
                      as="p"
                      color={
                        getTravelerColor(build.details.traveler.id) ?? "gray"
                      }
                    >
                      {traveler?.name ?? "Any Traveler"}
                    </Text>
                  </Flex>

                  {build.details.memories.map(({ id, essences }, index) => {
                    const memory = allMemories.find(
                      (memory) => memory.id === id,
                    );

                    return (
                      <Flex key={index} gap="3">
                        <Flex
                          align="center"
                          direction="column"
                          gap="2"
                          maxWidth="80px"
                        >
                          <HoverCard.Root>
                            <HoverCard.Trigger>
                              <Card>
                                <Inset side="all">
                                  {memory ? (
                                    <Image
                                      alt={memory.name}
                                      height={80}
                                      src={`/images/${memory.image}`}
                                      width={80}
                                    />
                                  ) : (
                                    <Box height="80px" width="80px" />
                                  )}
                                </Inset>
                              </Card>
                            </HoverCard.Trigger>

                            {memory && (
                              <HoverCard.Content>
                                <Flex direction="column" gap="3">
                                  <Text
                                    color={getRarityColor(memory.rarity)}
                                    size="2"
                                  >
                                    {memory.rarity}
                                  </Text>
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

                          <Text align="center" as="div" size="2">
                            {memory?.name ?? "Any"}
                          </Text>
                        </Flex>

                        {essences.map((id, index) => {
                          const essence = allEssences.find(
                            (essence) => essence.id === id,
                          );

                          return (
                            <Flex
                              key={index}
                              align="center"
                              direction="column"
                              gap="2"
                              maxWidth="64px"
                            >
                              <HoverCard.Root>
                                <HoverCard.Trigger>
                                  <Card>
                                    {essence ? (
                                      <Image
                                        alt={essence.name}
                                        height={40}
                                        src={`/images/${essence.image}`}
                                        width={40}
                                      />
                                    ) : (
                                      <Box height="40px" width="40px" />
                                    )}
                                  </Card>
                                </HoverCard.Trigger>

                                {essence && (
                                  <HoverCard.Content>
                                    <Flex direction="column" gap="3">
                                      <Text
                                        color={getRarityColor(essence.rarity)}
                                        size="2"
                                      >
                                        {essence.rarity}
                                      </Text>
                                      <ItemCard.Content
                                        size="2"
                                        achievementDescription={
                                          essence.achievementDescription
                                        }
                                        achievementName={
                                          essence.achievementName
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

                              <Text align="center" as="div" size="1">
                                {essence?.name ?? "Any"}
                              </Text>
                            </Flex>
                          );
                        })}
                      </Flex>
                    );
                  })}

                  <Flex
                    align="center"
                    className={styles.buildCardMetadata}
                    gap="3"
                    mt="auto"
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
      <Pagination mx="auto" pages={Math.max(Math.ceil(count / pageSize), 1)} />
    </Flex>
  );
};

export default Builds;
