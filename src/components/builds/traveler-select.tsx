import { Card, type CardProps } from "@radix-ui/themes/components/card";
import * as Dialog from "@radix-ui/themes/components/dialog";
import { Flex } from "@radix-ui/themes/components/flex";
import { Inset } from "@radix-ui/themes/components/inset";
import * as RadioCards from "@radix-ui/themes/components/radio-cards";
import { Text } from "@radix-ui/themes/components/text";
import { clsx } from "clsx";
import Image from "next/image";
import { type ComponentProps, type FC } from "react";

import travelers from "@public/data/travelers.json";

import styles from "./traveler-select.module.css";

export interface TravelerSelectProps
  extends Omit<CardProps, "asChild" | "children" | "onChange"> {
  name: ComponentProps<"button">["name"];
  value: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
}

export const TravelerSelect: FC<TravelerSelectProps> = ({
  name,
  value,
  errorMessage,
  onChange,
  className,
  ...props
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Card asChild className={clsx(styles.card, className)} {...props}>
          <button name={name}>
            {value ? (
              <Inset side="all">
                <Image
                  alt={value}
                  height={96}
                  src={`/images/${value}.png`}
                  width={96}
                />
              </Inset>
            ) : (
              <Text align="center" as="p">
                Any Traveler
              </Text>
            )}
          </button>
        </Card>
      </Dialog.Trigger>
      <Dialog.Content>
        <Flex>
          <Inset className={styles.inset} p="current" side="left">
            <RadioCards.Root className={styles.radioGroupRoot} columns="1">
              {Object.entries(travelers).map(([key, traveler]) => (
                <RadioCards.Item key={key} value={key}>
                  <Image
                    alt={traveler.name}
                    className="rt-AvatarRoot rt-r-size-3"
                    height={40}
                    src={`/images/${traveler.image}`}
                    width={40}
                  />
                  {traveler.name}
                </RadioCards.Item>
              ))}
            </RadioCards.Root>
          </Inset>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
