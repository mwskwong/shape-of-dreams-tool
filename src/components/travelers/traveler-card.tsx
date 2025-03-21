import { Card, type CardProps } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import {
  Heading,
  type HeadingProps,
} from "@radix-ui/themes/components/heading";
import { Inset } from "@radix-ui/themes/components/inset";
import { Text } from "@radix-ui/themes/components/text";
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
  color?: HeadingProps["color"];
  name: string;
  difficulty: string;
  class: string;
  health: number;
  attackDamage: number;
  abilityPower: number;
  attackSpeed: number;
  armor?: number;
  statsGrowthPerLv: {
    health: string;
    attackDamage: string;
    abilityPower: string;
    armor?: string;
  };
  description: string;
  unlockBy?: string;
  image: string;
}

export const TravelerCard: FC<TravelerCardProps> = ({
  color = "indigo",
  name,
  difficulty,
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
        <Text align="center" as="p">
          {travelerClass} · {difficulty}
        </Text>
        <Flex gap="3" justify="center" wrap="wrap">
          {stats.map(({ Icon, name, value, statGrowth }) => (
            <Card key={name} className={styles.stat}>
              <Flex
                align="center"
                direction="column"
                gap="2"
                minWidth="56px"
                pb="2"
              >
                <Icon size={20} />
                <Text>{value}</Text>
              </Flex>
              <Inset
                className={styles.statGrowth}
                clip="padding-box"
                side="bottom"
              >
                <Text align="center" as="div" size="1">
                  {statGrowth ? `${statGrowth} / lv` : "-"}
                </Text>
              </Inset>
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
    </Card>
  );
};
