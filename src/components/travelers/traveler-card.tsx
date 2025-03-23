"use client";

import { Box } from "@radix-ui/themes/components/box";
import { Card, type CardProps } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import { Grid } from "@radix-ui/themes/components/grid";
import { Heading } from "@radix-ui/themes/components/heading";
import { Inset } from "@radix-ui/themes/components/inset";
import * as Tabs from "@radix-ui/themes/components/tabs";
import { Text } from "@radix-ui/themes/components/text";
import { Theme, type ThemeProps } from "@radix-ui/themes/components/theme";
import { Tooltip } from "@radix-ui/themes/components/tooltip";
import { clsx } from "clsx";
import Image from "next/image";
import { type FC } from "react";

import { ItemDescription } from "../item-card";

import { MemoryCard } from "./memory-card";
import styles from "./traveler-card.module.css";

const getClassIcon = (travelerClass: string) => {
  if (travelerClass.toLowerCase().includes("attacker")) {
    return "/images/iconAttacker.png";
  }

  if (travelerClass.toLowerCase().includes("mage")) {
    return "/images/iconSpellCaster.png";
  }

  if (travelerClass.toLowerCase().includes("tank")) {
    return "/images/iconTank.png";
  }

  if (travelerClass.toLowerCase().includes("support")) {
    return "/images/iconSupporter.png";
  }
};

export interface TravelerCardProps extends Omit<CardProps, "children"> {
  color: ThemeProps["accentColor"];
  name: string;
  class: string;
  health: number;
  armor: number;
  attackDamage: number;
  abilityPower: number;
  attackSpeed: number;
  memoryHaste: number;
  criticalStrikeChance: number;
  movementSpeed: number;
  statsGrowthPerLv: {
    health?: string;
    armor?: string;
    attackDamage?: string;
    attackSpeed?: string;
    abilityPower?: string;
    memoryHaste?: string;
    criticalStrikeChance?: string;
    movementSpeed?: string;
  };
  description: string;
  unlockBy?: string;
  image: string;
  memories?: {
    name: string;
    cooldownTime?: number;
    maxCharges?: number;
    description: string;
    shortDescription?: string | null;
    type?: string;
    tags?: string[];
    image: string;
    unlockBy?: string;
    mutuallyExclusive?: string[];
  }[];
  constellations?: {
    name: string;
    description: string;
    image: string;
  }[];
}

export const TravelerCard: FC<TravelerCardProps> = ({
  className,
  color,
  name,
  class: travelerClass,
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
  unlockBy,
  image,
  memories = [],
  constellations = [],
  ...props
}) => {
  const stats = [
    {
      image: "/images/5.png",
      name: "Health",
      value: health,
      statGrowth: statsGrowthPerLv.health,
    },
    {
      image: "/images/5.png",
      name: "Armor",
      value: armor,
      statGrowth: statsGrowthPerLv.armor,
    },
    {
      image: "/images/2.png",
      name: "Attack Damage",
      value: attackDamage,
      statGrowth: statsGrowthPerLv.attackDamage,
    },
    {
      image: "/images/1.png",
      name: "Ability Power",
      value: abilityPower,
      statGrowth: statsGrowthPerLv.abilityPower,
    },
    {
      image: "/images/5.png",
      name: "Attack Speed",
      value: attackSpeed.toFixed(2),
    },
    {
      image: "/images/5.png",
      name: "Memory Haste",
      value: memoryHaste,
      statGrowth: statsGrowthPerLv.memoryHaste,
    },
    {
      image: "/images/5.png",
      name: "Critical Strike Chance",
      value: criticalStrikeChance,
      statGrowth: statsGrowthPerLv.criticalStrikeChance,
    },
    {
      image: "/images/5.png",
      name: "Movement Speed",
      value: movementSpeed,
      statGrowth: statsGrowthPerLv.movementSpeed,
    },
  ].filter(Boolean);

  const classIcon = getClassIcon(travelerClass);

  return (
    <Theme accentColor={color}>
      <Card className={clsx(styles.card, className)} {...props}>
        <Flex align="center" direction="column" gap="3">
          <Image
            alt={name}
            className="rt-AvatarRoot rt-r-size-8"
            height={128}
            src={`/images/${image}`}
            width={128}
          />
          <Heading as="h2" data-accent-color="" size="6">
            {name}
          </Heading>

          <Tabs.Root className={styles.tabRoot} defaultValue="stats">
            <Tabs.List>
              <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
              <Tabs.Trigger value="memories">Memories</Tabs.Trigger>
              <Tabs.Trigger value="constellations">Constellations</Tabs.Trigger>
            </Tabs.List>

            <Box pt="3">
              <Tabs.Content asChild value="stats">
                <Flex direction="column" gap="3">
                  <Flex asChild align="center" justify="center">
                    <Text as="div">
                      {classIcon && (
                        <Image
                          alt={travelerClass}
                          className={styles.classIcon}
                          height={18}
                          src={classIcon}
                          width={18}
                        />
                      )}
                      {travelerClass}
                    </Text>
                  </Flex>
                  <Grid columns="4" gap="3">
                    {stats.map(({ image, name, value, statGrowth }) => (
                      <Tooltip key={name} content={name}>
                        <Card className={styles.stat}>
                          <Flex align="center" direction="column" gap="2">
                            <Image
                              alt={name}
                              className={styles.icon}
                              height={24}
                              src={image}
                              width={24}
                            />
                            <Text>{value}</Text>
                          </Flex>

                          <Inset mt="2" side="bottom">
                            <Text
                              align="center"
                              as="div"
                              className={styles.statGrowth}
                              color="gray"
                              size="1"
                            >
                              {statGrowth ? `${statGrowth} / lv` : "-"}
                            </Text>
                          </Inset>
                        </Card>
                      </Tooltip>
                    ))}
                  </Grid>
                  {unlockBy && (
                    <Text
                      as="p"
                      className={styles.paragraph}
                      color="gray"
                      wrap="pretty"
                    >
                      Unlock by: {unlockBy}
                    </Text>
                  )}
                  <Text as="p" className={styles.paragraph} wrap="pretty">
                    {description}
                  </Text>
                </Flex>
              </Tabs.Content>

              <Tabs.Content asChild value="memories">
                <Flex direction="column" gap="3">
                  {memories.map((memory) => (
                    <MemoryCard key={memory.name} {...memory} />
                  ))}
                </Flex>
              </Tabs.Content>

              <Tabs.Content asChild value="constellations">
                <Flex direction="column" gap="3">
                  {constellations.length === 0 ? (
                    <Text
                      align="center"
                      as="p"
                      color="gray"
                      m="9"
                      wrap="pretty"
                    >
                      Coming Soon
                    </Text>
                  ) : (
                    constellations.map(({ name, description, image }) => (
                      <Flex key={name} gap="3">
                        {
                          <Image
                            alt={name}
                            height={48}
                            src={`/images/${image}`}
                            width={48}
                            className={
                              color &&
                              styles[
                                `constellationFilter${color.charAt(0).toUpperCase() + color.slice(1)}`
                              ]
                            }
                          />
                        }
                        <div>
                          <Heading as="h3" size="4">
                            {name}
                          </Heading>
                          <ItemDescription color="gray">
                            {description}
                          </ItemDescription>
                        </div>
                      </Flex>
                    ))
                  )}
                </Flex>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Flex>
      </Card>
    </Theme>
  );
};
