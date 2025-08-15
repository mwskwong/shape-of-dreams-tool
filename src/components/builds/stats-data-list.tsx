import "@radix-ui/themes/tokens/colors/yellow.css";

import * as DataList from "@radix-ui/themes/components/data-list";
import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import { Tooltip } from "@radix-ui/themes/components/tooltip";
import Image from "next/image";
import { type FC } from "react";

import { spriteMaxAspectRatio, sprites } from "@/lib/sprites";
import { type Traveler, generateTravelerStats } from "@/lib/travelers";

import styles from "./stats-data-list.module.css";

export interface StatsDataListProps
  extends Omit<DataList.RootProps, "children"> {
  traveler?: Traveler;
}

export const StatsDataList: FC<StatsDataListProps> = ({
  traveler,
  ...props
}) => {
  const stats =
    traveler && generateTravelerStats(traveler, { hideSecondaryStats: true });

  return (
    <DataList.Root {...props}>
      {stats?.map(({ name, image, value, iconClassName, statGrowth }) => (
        <DataList.Item key={name}>
          <DataList.Label minWidth="200px">
            <Flex align="center" gap="2">
              <Flex
                justify="center"
                width={`${Math.round(16 * spriteMaxAspectRatio)}px`}
              >
                <Image
                  alt={name}
                  className={iconClassName}
                  height={16}
                  src={image}
                />
              </Flex>
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
                      src={sprites.upgradableParameter.image}
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
