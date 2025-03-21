import { Box } from "@radix-ui/themes/components/box";
import { Card, type CardProps } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import {
  Heading,
  type HeadingProps,
} from "@radix-ui/themes/components/heading";
import { Inset } from "@radix-ui/themes/components/inset";
import * as Tabs from "@radix-ui/themes/components/tabs";
import { Text } from "@radix-ui/themes/components/text";
import { Tooltip } from "@radix-ui/themes/components/tooltip";
import {
  IconHeart,
  IconMenu3,
  IconShield,
  IconSparkles,
  IconSword,
} from "@tabler/icons-react";
import Image from "next/image";
import { type FC } from "react";

import styles from "./traveler-card.module.css";

export interface TravelerCardProps extends Omit<CardProps, "children"> {
  color: HeadingProps["color"];
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
}

export const TravelerCard: FC<TravelerCardProps> = ({
  color = "indigo",
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
}) => {
  const stats = [
    {
      Icon: IconHeart,
      name: "Health",
      value: health,
      statGrowth: statsGrowthPerLv.health,
    },
    {
      Icon: IconSword,
      name: "Attack Damage",
      value: attackDamage,
      statGrowth: statsGrowthPerLv.attackDamage,
    },
    {
      Icon: IconSparkles,
      name: "Ability Power",
      value: abilityPower,
      statGrowth: statsGrowthPerLv.abilityPower,
    },
    { Icon: IconMenu3, name: "Attack Speed", value: attackSpeed.toFixed(2) },
    armor && {
      Icon: IconShield,
      name: "Armor",
      value: armor,
      statGrowth: statsGrowthPerLv.armor,
    },
  ].filter(Boolean);

  return (
    <Card>
      <Flex align="center" direction="column" gap="3">
        <Image
          alt={name}
          className="rt-AvatarRoot rt-r-size-8"
          height={128}
          src={`/images/${image}`}
          width={128}
        />
        <Heading as="h2" color={color} size="5">
          {name}
        </Heading>

        <Tabs.Root className={styles.tabRoot} defaultValue="stats">
          <Tabs.List color={color}>
            <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
            <Tabs.Trigger value="memories">Memories</Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content asChild value="stats">
              <Flex direction="column" gap="3">
                <Text align="center" as="p">
                  {travelerClass}
                </Text>
                <Flex gap="3" justify="center" wrap="wrap">
                  {stats.map(({ Icon, name, value, statGrowth }) => (
                    <Card key={name} className={styles.stat}>
                      <Tooltip content={name}>
                        <Flex align="center" direction="column" gap="2" pb="2">
                          <Icon size={20} />
                          <Text>{value}</Text>
                        </Flex>
                      </Tooltip>
                      <Tooltip content="Stat growth / lv">
                        <Inset className={styles.statGrowth} side="bottom">
                          <Text align="center" as="div" color="gray" size="1">
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
                <Text as="p" className={styles.paragraph}>
                  {description}
                </Text>
              </Flex>
            </Tabs.Content>

            <Tabs.Content value="memories">
              <Text size="2">Access and update your documents.</Text>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Flex>
    </Card>
  );
};
