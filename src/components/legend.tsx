import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import Image from "next/image";
import { type FC } from "react";

import styles from "./legend.module.css";

const entries = [
  { name: "Attack Damage", image: "/images/2.png" },
  { name: "Ability Power", image: "/images/1.png" },
  { name: "Upgradable Parameter", image: "/images/5.png" },
];

export type LegendProps = Omit<FlexProps, "children">;
export const Legend: FC = () => {
  return (
    <Flex gap="3">
      {entries.map(({ name, image }) => (
        <Text key={name} as="p">
          <Image
            alt={name}
            className={styles.sprite}
            height={16}
            src={image}
            width={16}
          />
          {name}
        </Text>
      ))}
    </Flex>
  );
};
