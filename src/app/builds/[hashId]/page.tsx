import "@/styles/traveler-colors.css";

import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Card } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import * as HoverCard from "@radix-ui/themes/components/hover-card";
import { Inset } from "@radix-ui/themes/components/inset";
import { ScrollArea } from "@radix-ui/themes/components/scroll-area";
import { Text } from "@radix-ui/themes/components/text";
import { IconCopy, IconThumbUp, IconUser } from "@tabler/icons-react";
import { type ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type FC } from "react";
import { type BreadcrumbList, type WithContext } from "schema-dts";

import { StatsDataList } from "@/components/builds/stats-data-list";
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
} from "@/lib/utils";

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

  return (
    <>
      <Flex direction="column" gap="3" pt="3">
        <Flex
          align={{ sm: "center" }}
          direction={{ initial: "column", sm: "row" }}
          gapX="9"
          gapY="3"
        >
          <Heading as="h2" size="6">
            {build.buildName}
          </Heading>
          <Flex gap="3" ml={{ sm: "auto" }}>
            <Button
              disabled
              highContrast
              className={styles.actionButton}
              color="gray"
              variant="ghost"
            >
              <IconThumbUp size={18} />
              Like (0)
            </Button>
            <Button
              asChild
              highContrast
              className={styles.actionButton}
              color="gray"
              variant="ghost"
            >
              <Link href={`${routes.cloneBuild.pathname}/${hashId}`}>
                <IconCopy size={18} />
                Clone
              </Link>
            </Button>
          </Flex>
        </Flex>

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

              <StatsDataList traveler={traveler} />
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
                const memory = allMemoryEntries.find(
                  ([key]) => key === id,
                )?.[1];
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
              <Text className={styles.buildDescription}>
                {build.description}
              </Text>
            </ScrollArea>
          </Flex>
        </Flex>
      </Flex>

      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: routes.builds.name,
                item: `${siteUrl}${routes.builds.pathname}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: build.buildName,
              },
            ],
          } satisfies WithContext<BreadcrumbList>),
        }}
        type="application/ld+json"
      />
    </>
  );
};

// allow builds to revalidate in runtime, but statically render all paths the first time they're visited
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params#all-paths-at-runtime
export const generateStaticParams = () => [];

const truncateDescription = (text: string, maxLength = 156) => {
  if (text.length <= maxLength) {
    return text;
  }
  const subString = text.slice(0, maxLength - 1);
  const lastSpace = subString.lastIndexOf(" ");
  return lastSpace > 0 ? subString.slice(0, lastSpace) + "…" : subString + "…";
};

export const generateMetadata = async (
  { params }: BuildDetailsProps,
  parent: ResolvingMetadata,
) => {
  const { hashId } = await params;
  const entry = await getBuildByHashId(hashId);
  const { description, openGraph } = await parent;
  const { images, ...openGraphWithoutImages } = openGraph ?? {};

  if (!entry) return;
  const { build, createdAt } = entry;

  return {
    title: `${build.buildName} - Details`,
    description: build.description
      ? truncateDescription(build.description)
      : description,
    openGraph: {
      ...openGraphWithoutImages,
      publishedTime: createdAt.toISOString(),
      url: `${routes.builds.pathname}/${hashId}`,
    },
  };
};

export default BuildDetails;
