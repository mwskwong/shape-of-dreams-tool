import { Card, type CardProps } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import {
  Heading,
  type HeadingProps,
} from "@radix-ui/themes/components/heading";
import Image from "next/image";
import { type FC } from "react";

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
  statsGrowthOnLvUp: {
    health: string;
    attackDamage: string;
    abilityPower: string;
    armor?: string;
  };
  description: string;
  unlocked?: string;
  image: string;
}

export const TravelerCard: FC<TravelerCardProps> = ({
  color = "indigo",
  name,
  //   difficulty,
  //   health,
  //   attackDamage,
  //   attackSpeed,
  //   armor,
  //   statsGrowthOnLvUp,
  //   description,
  //   unlockBy,
  image,
}) => {
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
      </Flex>
    </Card>
  );
};
