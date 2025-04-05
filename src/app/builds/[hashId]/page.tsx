import "@/styles/traveler-colors.css";

import { Box } from "@radix-ui/themes/components/box";
import { Card } from "@radix-ui/themes/components/card";
import * as DataList from "@radix-ui/themes/components/data-list";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import * as HoverCard from "@radix-ui/themes/components/hover-card";
import { Inset } from "@radix-ui/themes/components/inset";
import { ScrollArea } from "@radix-ui/themes/components/scroll-area";
import { Text } from "@radix-ui/themes/components/text";
import { IconUser } from "@tabler/icons-react";
import { type ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { type FC } from "react";

import * as ItemCard from "@/components/item-card";
import {
  allEssenceEntries,
  allMemoryEntries,
  allTravelerEntries,
} from "@/lib/constants";
import { getBuildByHashId } from "@/lib/queries";
import { routes, siteUrl } from "@/lib/site-config";
import {
  getMutuallyExclusiveMemories,
  getRarityColor,
  getTravelerColor,
  sprites,
} from "@/lib/utils";
import iconStyles from "@/styles/icons.module.css";

import styles from "./page.module.css";

interface BuildDetailsProps {
  params: Promise<{ hashId: string }>;
}

const BuildDetails: FC<BuildDetailsProps> = async ({ params }) => {
  const { hashId } = await params;
  const entry = await getBuildByHashId(hashId);

  if (!entry) notFound();

  const { build } = entry;
  const traveler = allTravelerEntries.find(
    ([key]) => key === build.traveler.id,
  )?.[1];
  const stats = traveler && [
    {
      ...sprites.health,
      image: `/images/${sprites.health.image}`,
      value: traveler.health,
    },
    {
      ...sprites.armor,
      image: `/images/${sprites.armor.image}`,
      value: traveler.armor,
    },
    {
      ...sprites.attackDamage,
      image: `/images/${sprites.attackDamage.image}`,
      value: traveler.attackDamage,
    },
    {
      ...sprites.abilityPower,
      image: `/images/${sprites.abilityPower.image}`,
      value: traveler.abilityPower,
    },
    {
      ...sprites.attackSpeed,
      image: `/images/${sprites.attackSpeed.image}`,
      value: traveler.attackSpeed.toFixed(2),
    },
    {
      image: "/images/texMovement.png",
      name: "Movement Speed",
      value: traveler.movementSpeed,
      iconClassName: iconStyles.movementSpeedIcon,
      width: undefined,
      height: undefined,
    },
  ];

  return (
    <Flex direction="column" gap="3" pt="3">
      <Heading as="h2" size="6">
        {build.buildName}
      </Heading>

      <Flex
        direction={{ initial: "column", sm: "row" }}
        gapX="9"
        gapY="3"
        wrap="wrap"
      >
        <Flex direction="column" flexGrow={{ sm: "1", md: "0" }} gap="3">
          <Text as="p" size="2" weight="bold">
            Traveler & Starting Memories
          </Text>

          <Flex align="center" direction="column" gap="3" width="100%">
            <Flex align="center" direction="column" gap="2">
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
                    <Text asChild color="gray">
                      <Flex
                        align="center"
                        height="128px"
                        justify="center"
                        width="128px"
                      >
                        <IconUser />
                      </Flex>
                    </Text>
                  )}
                </Inset>
              </Card>
              <Text as="div" color={getTravelerColor(build.traveler.id)}>
                {traveler?.name ?? "Any"}
              </Text>
            </Flex>

            <Flex gap="3">
              {Object.entries(build.traveler.startingMemories).map(
                ([key, value]) => {
                  const memory = allMemoryEntries.find(
                    ([key]) => key === value,
                  )?.[1];

                  return (
                    <Flex
                      key={key}
                      align="center"
                      direction="column"
                      gap="2"
                      maxWidth="64px"
                    >
                      <HoverCard.Root>
                        <HoverCard.Trigger>
                          <Card>
                            <Inset side="all">
                              {memory ? (
                                <Image
                                  alt={memory.name}
                                  height={62}
                                  src={`/images/${memory.image}`}
                                  width={62}
                                />
                              ) : (
                                <Box height="62px" width="62px" />
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
                      <Text align="center" as="div" size="1">
                        {memory?.name ?? "Any"}
                      </Text>
                    </Flex>
                  );
                },
              )}
            </Flex>

            <DataList.Root>
              {stats?.map(
                ({
                  name,
                  image,
                  value,
                  width = 1,
                  height = 1,
                  iconClassName,
                }) => (
                  <DataList.Item key={name}>
                    <DataList.Label minWidth="200px">
                      <Flex align="center" gap="2">
                        <Image
                          alt={name}
                          className={iconClassName}
                          height={16}
                          src={image}
                          width={Math.round(16 * (width / height))}
                        />
                        {name}
                      </Flex>
                    </DataList.Label>
                    <DataList.Value>{value}</DataList.Value>
                  </DataList.Item>
                ),
              )}
            </DataList.Root>
          </Flex>
        </Flex>

        <Flex direction="column" flexGrow={{ sm: "1", md: "0" }} gap="3">
          <Text as="p" size="2" weight="bold">
            Memories and Essences
          </Text>

          <Flex
            align={{ initial: "center", sm: "start" }}
            direction="column"
            gap="3"
          >
            {build.memories.map(({ id, essences: essenceIds }, index) => {
              const memory = allMemoryEntries.find(([key]) => key === id)?.[1];
              const essences = essenceIds.map(
                (id) => allEssenceEntries.find(([key]) => key === id)?.[1],
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
                                height={78}
                                src={`/images/${memory.image}`}
                                width={78}
                              />
                            ) : (
                              <Box height="78px" width="78px" />
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

                    <Text align="center" as="div" size="2">
                      {memory?.name ?? "Any"}
                    </Text>
                  </Flex>

                  {essences.map((essence, index) => (
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

                      <Text align="center" as="div" size="1">
                        {essence?.name ?? "Any"}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              );
            })}
          </Flex>
        </Flex>

        <Flex
          className={styles.buildDescriptionContainer}
          direction="column"
          minWidth="249px"
        >
          <Text size="2" weight="bold">
            Build description
          </Text>
          <ScrollArea
            className={styles.buildDescriptionScrollArea}
            scrollbars="vertical"
          >
            <Text className={styles.buildDescription}>{build.description}</Text>
          </ScrollArea>
        </Flex>
      </Flex>
    </Flex>
  );
};

// allow builds to revalidate in runtime, but statically render all paths the first time they're visited
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export const generateStaticParams = () => [];

export const generateMetadata = async (
  { params }: BuildDetailsProps,
  parent: ResolvingMetadata,
) => {
  const { hashId } = await params;
  const entry = await getBuildByHashId(hashId);
  const { openGraph } = await parent;

  if (!entry) return;
  const { build, createdAt } = entry;

  return {
    title: `${build.buildName} - Details`,
    openGraph: {
      ...openGraph,
      publishedTime: createdAt.toISOString(),
      url: `/builds/${hashId}`,
      images: `https://image.thum.io/get/width/1200/crop/900/${siteUrl}${routes.builds.pathname}/${hashId}`,
    },
  };
};

export default BuildDetails;
