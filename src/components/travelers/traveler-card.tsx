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
import { clsx } from "clsx";
import Image from "next/image";
import { type FC } from "react";

import { sprites } from "@/lib/utils";

import * as ItemCard from "../item-card";

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

export interface RootProps extends CardProps {
  name: string;
  image: string;
}

export const Root: FC<RootProps> = ({
  name,
  image,
  className,
  children,
  ...props
}) => {
  return (
    <Card className={clsx(styles.card, className)} {...props}>
      <Flex align="center" direction="column" gap="3" {...props}>
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
        {children}
      </Flex>
    </Card>
  );
};

export interface ContentProps extends Omit<Tabs.RootProps, "children"> {
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
  achievement?: { name: string; description: string } | null;
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
    achievement?: { name: string; description: string } | null;
  }[];
  constellations?: {
    name: string;
    description: string;
    image: string;
  }[];
}

export const Content: FC<ContentProps> = ({
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
  achievement,
  memories = [],
  constellations = [],
  className,
  ...props
}) => {
  const stats = [
    {
      ...sprites.health,
      image: `/images/${sprites.health.image}`,
      value: health,
      statGrowth: statsGrowthPerLv.health,
    },
    {
      ...sprites.armor,
      image: `/images/${sprites.armor.image}`,
      value: armor,
      statGrowth: statsGrowthPerLv.armor,
    },
    {
      ...sprites.attackDamage,
      image: `/images/${sprites.attackDamage.image}`,
      value: attackDamage,
      statGrowth: statsGrowthPerLv.attackDamage,
    },
    {
      ...sprites.abilityPower,
      image: `/images/${sprites.abilityPower.image}`,
      value: abilityPower,
      statGrowth: statsGrowthPerLv.abilityPower,
    },
    {
      ...sprites.attackSpeed,
      image: `/images/${sprites.attackSpeed.image}`,
      value: attackSpeed.toFixed(2),
      statGrowth: statsGrowthPerLv.attackSpeed,
    },
    {
      ...sprites.memoryHaste,
      image: `/images/${sprites.memoryHaste.image}`,
      value: memoryHaste,
      statGrowth: statsGrowthPerLv.memoryHaste,
    },
    {
      image: "/images/texCrit.png",
      name: "Critical Strike Chance",
      value: criticalStrikeChance,
      statGrowth: statsGrowthPerLv.criticalStrikeChance,
      iconClassName: styles.critIcon,
      width: undefined,
      height: undefined,
    },
    {
      image: "/images/texMovement.png",
      name: "Movement Speed",
      value: movementSpeed,
      statGrowth: statsGrowthPerLv.movementSpeed,
      iconClassName: styles.movementSpeedIcon,
      width: undefined,
      height: undefined,
    },
  ];

  const classIcon = getClassIcon(travelerClass);

  return (
    <Tabs.Root
      className={clsx(styles.tabRoot, className)}
      defaultValue="stats"
      {...props}
    >
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
                  <Image
                    alt={travelerClass}
                    height={18}
                    src={classIcon}
                    width={18}
                  />
                )}
                {travelerClass}
              </Text>
            </Flex>
            <Grid columns="4" gap="3">
              {stats.map(
                ({
                  image,
                  name,
                  value,
                  statGrowth,
                  iconClassName,
                  width = 1,
                  height = 1,
                }) => (
                  <Tooltip key={name} content={name}>
                    <Card className={styles.stat}>
                      <Flex align="center" direction="column" gap="2">
                        <Image
                          alt={name}
                          className={iconClassName}
                          height={20}
                          src={image}
                          width={Math.round(20 * (width / height))}
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
                ),
              )}
            </Grid>
            <Text as="p" className={styles.paragraph} wrap="pretty">
              {description}
            </Text>
            {achievement && (
              <Text
                as="p"
                className={styles.paragraph}
                color="gray"
                wrap="pretty"
              >
                Unlock requirement -{" "}
                <Em className={styles.em}>{achievement.name}</Em>:{" "}
                {achievement.description}
              </Text>
            )}
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
              <Text align="center" as="p" color="gray" my="9" wrap="pretty">
                Coming Soon
              </Text>
            ) : (
              constellations.map(({ name, description, image }) => (
                <Flex key={name} gap="3">
                  <Image
                    alt={name}
                    className={styles.constellationIcon}
                    height={48}
                    src={`/images/${image}`}
                    width={48}
                  />
                  <div>
                    <Heading as="h3" size="4">
                      {name}
                    </Heading>
                    <ItemCard.Description color="gray">
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
  );
};
