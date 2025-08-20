import { Box } from "@radix-ui/themes/components/box";
import { Card, type CardProps } from "@radix-ui/themes/components/card";
import { Em } from "@radix-ui/themes/components/em";
import { Flex } from "@radix-ui/themes/components/flex";
import { Grid } from "@radix-ui/themes/components/grid";
import { Heading } from "@radix-ui/themes/components/heading";
import { Inset } from "@radix-ui/themes/components/inset";
import * as Tabs from "@radix-ui/themes/components/tabs";
import { Text } from "@radix-ui/themes/components/text";
import { Tooltip } from "@radix-ui/themes/components/tooltip";
import Image from "next/image";
import { type FC } from "react";

import { type Memory } from "@/lib/memories";
import { type Traveler, generateTravelerStats } from "@/lib/travelers";
import iconStyles from "@/styles/icons.module.css";

import * as ItemCard from "../item-card";

import { MemoryCard } from "./memory-card";
import styles from "./traveler-card.module.css";

export type RootProps = CardProps & Pick<Traveler, "name" | "image">;
export const Root: FC<RootProps> = ({ name, image, children, ...props }) => (
  <Box asChild height="100%">
    <Card {...props}>
      <Flex align="center" direction="column" gap="3" {...props}>
        <Card size="5">
          <Inset side="all">
            <Image alt={name} src={image} width={128} />
          </Inset>
        </Card>
        <Heading as="h2" data-accent-color="" size="6">
          {name}
        </Heading>
        {children}
      </Flex>
    </Card>
  </Box>
);

export type ContentProps = Omit<Tabs.RootProps, "children"> &
  Omit<Traveler, "name" | "image" | "difficulty" | "color" | "id"> & {
    memories?: Memory[];
  };

export const Content: FC<ContentProps> = ({
  class: travelerClass,
  classIcon,
  health,
  armor,
  attackDamage,
  abilityPower,
  attackSpeed,
  memoryHaste,
  criticalStrikeChance,
  movementSpeed,
  statsGrowthPerLv,
  description,
  achievementDescription,
  achievementName,
  memories = [],
  constellations = [],
  ...props
}) => {
  const stats = generateTravelerStats({
    health,
    armor,
    attackDamage,
    abilityPower,
    attackSpeed,
    memoryHaste,
    criticalStrikeChance,
    movementSpeed,
    statsGrowthPerLv,
  });

  return (
    <Box asChild width="100%">
      <Tabs.Root defaultValue="stats" {...props}>
        <Tabs.List>
          <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
          <Tabs.Trigger value="memories">Memories</Tabs.Trigger>
          <Tabs.Trigger value="constellations">Constellations</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content asChild value="stats">
            <Flex direction="column" gap="3">
              <Flex asChild align="center" gap="2" justify="center">
                <Text as="div">
                  {classIcon && (
                    <Image alt={travelerClass} src={classIcon} width={18} />
                  )}
                  {travelerClass}
                </Text>
              </Flex>
              <Grid columns="4" gap="3">
                {stats.map(
                  ({ id, image, name, value, statGrowth, iconClassName }) => (
                    <Tooltip key={id} content={name}>
                      <Box asChild minWidth="52px">
                        <Card className={styles.stat}>
                          <Flex align="center" direction="column" gap="2">
                            <Image
                              alt={name}
                              className={iconClassName}
                              height={20}
                              src={image}
                            />
                            <Text>{value}</Text>
                          </Flex>

                          <Inset mt="2" side="bottom">
                            <Box asChild p="1">
                              <Text
                                align="center"
                                as="div"
                                className={styles.statGrowth}
                                color="gray"
                                size="1"
                              >
                                {statGrowth ? `${statGrowth} / lv` : "-"}
                              </Text>
                            </Box>
                          </Inset>
                        </Card>
                      </Box>
                    </Tooltip>
                  ),
                )}
              </Grid>
              <Text as="p" className={styles.paragraph}>
                {description}
              </Text>
              {achievementName && (
                <Text as="p" className={styles.paragraph} color="gray">
                  Unlock requirement -{" "}
                  <Text color="yellow">
                    <Em className={styles.em}>{achievementName}</Em>
                  </Text>
                  : {achievementDescription}
                </Text>
              )}
            </Flex>
          </Tabs.Content>

          <Tabs.Content asChild value="memories">
            <Flex direction="column" gap="3">
              {memories.map(
                ({
                  id,
                  name,
                  cooldownTime,
                  maxCharges,
                  rawDesc,
                  rawDescVars,
                  shortDescription,
                  type,
                  image,
                  achievementName,
                  achievementDescription,
                  mutuallyExclusive,
                }) => (
                  <MemoryCard
                    key={id}
                    achievementDescription={achievementDescription}
                    achievementName={achievementName}
                    cooldownTime={cooldownTime}
                    image={image}
                    maxCharges={maxCharges}
                    mutuallyExclusive={mutuallyExclusive}
                    name={name}
                    rawDesc={rawDesc}
                    rawDescVars={rawDescVars}
                    shortDescription={shortDescription}
                    type={type}
                  />
                ),
              )}
            </Flex>
          </Tabs.Content>

          <Tabs.Content asChild value="constellations">
            <Flex direction="column" gap="3">
              {constellations.length === 0 ? (
                <Text align="center" as="p" color="gray" my="9">
                  Coming Soon
                </Text>
              ) : (
                constellations.map(({ name, description, image }) => (
                  <Flex key={name} gap="3">
                    <Image
                      alt={name}
                      className={iconStyles.constellationIcon}
                      src={image}
                      width={48}
                    />
                    <div>
                      <Heading as="h3" size="4">
                        {name}
                      </Heading>
                      <ItemCard.Description color="gray" rawDescVars={[]}>
                        {description}
                      </ItemCard.Description>
                    </div>
                  </Flex>
                ))
              )}
            </Flex>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
};
