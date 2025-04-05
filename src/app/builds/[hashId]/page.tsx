import "@/styles/traveler-colors.css";

import { Card } from "@radix-ui/themes/components/card";
import * as DataList from "@radix-ui/themes/components/data-list";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Inset } from "@radix-ui/themes/components/inset";
import { ScrollArea } from "@radix-ui/themes/components/scroll-area";
import { Text } from "@radix-ui/themes/components/text";
import { type ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { type FC } from "react";

import {
  allEssenceEntries,
  allMemoryEntries,
  allTravelerEntries,
} from "@/lib/constants";
import { getBuildByHashId } from "@/lib/queries";
import { getTravelerColor, sprites } from "@/lib/utils";
import iconStyles from "@/styles/icons.module.css";

import styles from "./page.module.css";

interface BuildProps {
  params: Promise<{ hashId: string }>;
}

const Build: FC<BuildProps> = async ({ params }) => {
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
                  {traveler && (
                    <Image
                      alt={traveler.name}
                      height={128}
                      src={`/images/${traveler.image}`}
                      width={128}
                    />
                  )}
                </Inset>
              </Card>
              <Text as="div" color={getTravelerColor(build.traveler.id)}>
                {traveler?.name}
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
                      <Card>
                        <Inset side="all">
                          {memory && (
                            <Image
                              alt={memory.name}
                              height={62}
                              src={`/images/${memory.image}`}
                              width={62}
                            />
                          )}
                        </Inset>
                      </Card>
                      <Text align="center" as="div" size="1">
                        {memory?.name}
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
            {build.memories.map(({ id, essences: essenceIds }) => {
              const memory = allMemoryEntries.find(([key]) => key === id)?.[1];
              const essences = allEssenceEntries.filter(([key]) =>
                essenceIds.includes(key),
              );

              return (
                <Flex key={id} gap="3">
                  <Flex
                    align="center"
                    direction="column"
                    gap="2"
                    maxWidth="80px"
                  >
                    <Card>
                      <Inset side="all">
                        {memory && (
                          <Image
                            alt={memory.name}
                            height={78}
                            src={`/images/${memory.image}`}
                            width={78}
                          />
                        )}
                      </Inset>
                    </Card>
                    <Text align="center" as="div" size="2">
                      {memory?.name}
                    </Text>
                  </Flex>

                  {essences.map(([key, { name, image }]) => (
                    <Flex
                      key={key}
                      align="center"
                      direction="column"
                      gap="2"
                      maxWidth="64px"
                    >
                      <Card>
                        <Image
                          alt={name}
                          height={40}
                          src={`/images/${image}`}
                          width={40}
                        />
                      </Card>
                      <Text align="center" as="div" size="1">
                        {name}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              );
            })}
          </Flex>
        </Flex>

        <Flex className={styles.buildDescriptionContainer} direction="column">
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
  { params }: BuildProps,
  parent: ResolvingMetadata,
) => {
  const { hashId } = await params;
  const entry = await getBuildByHashId(hashId);
  const { openGraph } = await parent;

  if (!entry) return;
  const { build, createdAt } = entry;

  return {
    title: build.buildName,
    openGraph: {
      ...openGraph,
      publishedTime: createdAt.toISOString(),
      url: `/builds/${hashId}`,
      images: `https://image.thum.io/get/width/1200/crop/900/https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""}/builds/${hashId}`,
    },
  };
};

export default Build;
