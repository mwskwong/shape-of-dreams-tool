"use client";

import { Box } from "@radix-ui/themes/components/box";
import { Card, type CardProps } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Inset } from "@radix-ui/themes/components/inset";
import * as Tabs from "@radix-ui/themes/components/tabs";
import { Text } from "@radix-ui/themes/components/text";
import { Theme, type ThemeProps } from "@radix-ui/themes/components/theme";
import { Tooltip } from "@radix-ui/themes/components/tooltip";
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
  attackDamage: number;
  abilityPower: number;
  attackSpeed: number;
  armor?: number;
  statsGrowthPerLv: {
    health?: string;
    attackDamage?: string;
    attackSpeed?: string;
    abilityPower?: string;
    armor?: string;
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
  color,
  name,
  class: travelerClass,
  health,
  attackDamage,
  abilityPower,
  attackSpeed,
  armor,
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
    armor && {
      image: "/images/5.png",
      name: "Armor",
      value: armor,
      statGrowth: statsGrowthPerLv.armor,
    },
  ].filter(Boolean);

  const classIcon = getClassIcon(travelerClass);

  return (
    <Card {...props}>
      <Theme accentColor={color}>
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
                  <Flex gap="3" justify="center" wrap="wrap">
                    {stats.map(({ image, name, value, statGrowth }) => (
                      <Card key={name} className={styles.stat}>
                        <Tooltip content={name}>
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
                        </Tooltip>
                        <Tooltip content="Stat growth / lv">
                          <Inset mt="2" side="bottom">
                            <Text
                              align="center"
                              as="div"
                              className={styles.statGrowth}
                              color="gray"
                              size="1"
                            >
                              {statGrowth ?? "-"}
                            </Text>
                          </Inset>
                        </Tooltip>
                      </Card>
                    ))}
                  </Flex>
                  {unlockBy && (
                    <Text as="p" className={styles.paragraph} color="gray">
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
                  {constellations.map(({ name, description, image }) => (
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
                  ))}
                </Flex>
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Flex>
      </Theme>
    </Card>
  );
};
