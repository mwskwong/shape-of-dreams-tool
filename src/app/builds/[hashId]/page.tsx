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
import { IconCopy } from "@tabler/icons-react";
import { type ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type FC } from "react";
import { type BreadcrumbList, type WithContext } from "schema-dts";

import { LikeButton } from "@/components/builds/like-button";
import { StatsDataList } from "@/components/builds/stats-data-list";
import * as ItemCard from "@/components/item-card";
import { allEssences, allMemories, allTravelers } from "@/lib/constants";
import { getBuildByHashId, getIsBuildLikedByUserId } from "@/lib/queries";
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
  const [{ hashId }, cookieStore] = await Promise.all([params, cookies()]);
  const userId = cookieStore.get("userId")?.value;
  const [build, liked] = await Promise.all([
    getBuildByHashId(hashId),
    userId ? getIsBuildLikedByUserId(hashId, userId) : false,
  ]);

  if (!build) notFound();

  const traveler = allTravelers.find(
    ({ id }) => id === build.details.traveler.id,
  );

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
            {build.details.name}
          </Heading>
          <Flex gap="3" ml={{ sm: "auto" }}>
            <Box asChild flexGrow={{ initial: "1", sm: "0" }}>
              <LikeButton
                highContrast
                color="gray"
                liked={liked}
                likes={build.likes}
                variant="ghost"
              />
            </Box>
            <Box asChild flexGrow={{ initial: "1", sm: "0" }}>
              <Button asChild highContrast color="gray" variant="ghost">
                <Link href={`${routes.cloneBuild.pathname}/${hashId}`}>
                  <IconCopy size={18} />
                  Clone
                </Link>
              </Button>
            </Box>
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
                <Card size="5">
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
                <Text
                  as="p"
                  color={getTravelerColor(build.details.traveler.id)}
                >
                  {traveler?.name ?? "Any"}
                </Text>
              </Flex>

              <Flex gap="3">
                {Object.entries(build.details.traveler.startingMemories).map(
                  ([key, value]) => {
                    const memory = allMemories.find(({ id }) => id === value);

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
              {build.details.memories.map(
                ({ id, essences: essenceIds }, index) => {
                  const memory = allMemories.find((memory) => memory.id === id);
                  const essences = essenceIds.map((id) =>
                    allEssences.find((essence) => essence.id === id),
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
                            <Card size="3">
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

                          <Text align="center" as="div" size="1">
                            {essence?.name ?? "Any"}
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                  );
                },
              )}
            </Flex>
          </Flex>

          <Flex direction="column" flexBasis="0%" flexGrow="1" minWidth="249px">
            <Text size="2" weight="bold">
              Build description
            </Text>
            <Box asChild height={{ md: "500px" }} mt="1">
              <ScrollArea scrollbars="vertical" type="auto">
                <Text as="p" className={styles.buildDescription}>
                  {build.details.description || "No description provided."}
                </Text>
              </ScrollArea>
            </Box>
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
                name: build.details.name,
              },
            ],
          } satisfies WithContext<BreadcrumbList>),
        }}
        type="application/ld+json"
      />
    </>
  );
};

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
  const build = await getBuildByHashId(hashId);
  const { description, openGraph } = await parent;
  const { images, ...openGraphWithoutImages } = openGraph ?? {};

  if (!build) return;

  return {
    title: `${build.details.name} - Details`,
    description: build.details.description
      ? truncateDescription(build.details.description)
      : description,
    openGraph: {
      ...openGraphWithoutImages,
      publishedTime: build.createdAt.toISOString(),
      url: `${routes.builds.pathname}/${hashId}`,
    },
  };
};

export default BuildDetails;
