import "@radix-ui/themes/tokens/colors/yellow.css";

import * as DataList from "@radix-ui/themes/components/data-list";
import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import { Tooltip } from "@radix-ui/themes/components/tooltip";
import { clsx } from "clsx";
import Image from "next/image";
import { type FC } from "react";

import { spriteMaxAspectRatio, sprites } from "@/lib/constants";
import iconStyles from "@/styles/icons.module.css";

import styles from "./stats-data-list.module.css";

export interface StatsDataListProps
  extends Omit<DataList.RootProps, "children"> {
  traveler?: {
    health: number;
    armor: number;
    attackDamage: number;
    abilityPower: number;
    attackSpeed: number;
    movementSpeed: number;
    statsGrowthPerLv: {
      health?: string | null;
      armor?: string | null;
      attackDamage?: string | null;
      abilityPower?: string | null;
      attackSpeed?: string | null;
      movementSpeed?: string | null;
    };
  };
}

export const StatsDataList: FC<StatsDataListProps> = ({
  traveler,
  ...props
}) => {
  const stats = traveler && [
    {
      ...sprites.health,
      image: `/images/${sprites.health.image}`,
      value: traveler.health,
      statGrowth: traveler.statsGrowthPerLv.health,
    },
    {
      ...sprites.armor,
      image: `/images/${sprites.armor.image}`,
      value: traveler.armor,
      statGrowth: traveler.statsGrowthPerLv.armor,
    },
    {
      ...sprites.attackDamage,
      image: `/images/${sprites.attackDamage.image}`,
      value: traveler.attackDamage,
      statGrowth: traveler.statsGrowthPerLv.attackDamage,
    },
    {
      ...sprites.abilityPower,
      image: `/images/${sprites.abilityPower.image}`,
      value: traveler.abilityPower,
      statGrowth: traveler.statsGrowthPerLv.abilityPower,
    },
    {
      ...sprites.attackSpeed,
      image: `/images/${sprites.attackSpeed.image}`,
      value: traveler.attackSpeed.toFixed(2),
      statGrowth: traveler.statsGrowthPerLv.attackSpeed,
    },
    {
      image: "/images/texMovement.png",
      name: "Movement Speed",
      value: traveler.movementSpeed,
      iconClassName: iconStyles.movementSpeedIcon,
      statGrowth: traveler.statsGrowthPerLv.movementSpeed,
    },
  ];

  return (
    <DataList.Root {...props}>
      {stats?.map(({ name, image, value, iconClassName, statGrowth }) => (
        <DataList.Item key={name}>
          <DataList.Label minWidth="200px">
            <Flex align="center" gap="2">
              <Image
                alt={name}
                className={clsx(iconStyles.sprite, iconClassName)}
                height={16}
                src={image}
                width={Math.round(16 * spriteMaxAspectRatio)}
              />
              {name}
            </Flex>
          </DataList.Label>
          <DataList.Value>
            {value}
            {statGrowth && (
              <Tooltip content="Stat grow / lv">
                <Flex asChild align="center">
                  <Text color="yellow" size="1">
                    <Image
                      alt={sprites.upgradableParameter.name}
                      className={styles.upgradableParamIcon}
                      height={14}
                      src={`/images/${sprites.upgradableParameter.image}`}
                      width={Math.round(
                        14 *
                          (sprites.upgradableParameter.width /
                            sprites.upgradableParameter.height),
                      )}
                    />
                    ({statGrowth})
                  </Text>
                </Flex>
              </Tooltip>
            )}
          </DataList.Value>
        </DataList.Item>
      ))}
    </DataList.Root>
  );
};
