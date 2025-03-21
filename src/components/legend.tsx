import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import Image from "next/image";
import { type FC } from "react";

import { spriteNames } from "@/lib/constants";

import styles from "./legend.module.css";

const entries = [
  { name: spriteNames[2], image: "/images/2.png" },
  { name: spriteNames[1], image: "/images/1.png" },
  { name: spriteNames[5], image: "/images/5.png" },
];

export type LegendProps = Omit<FlexProps, "children">;
export const Legend: FC = () => {
  return (
    <Flex gapX="5" gapY="3" wrap="wrap">
      {entries.map(({ name, image }) => (
        <Text key={name} as="p">
          <Image
            alt=""
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
