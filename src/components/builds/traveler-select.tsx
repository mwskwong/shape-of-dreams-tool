import "@radix-ui/themes/tokens/colors/orange.css";
import "@radix-ui/themes/tokens/colors/mint.css";
import "@radix-ui/themes/tokens/colors/ruby.css";
import "@radix-ui/themes/tokens/colors/amber.css";
import "@radix-ui/themes/tokens/colors/yellow.css";

import { Card, type CardProps } from "@radix-ui/themes/components/card";
import * as Dialog from "@radix-ui/themes/components/dialog";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
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
  errorMessage?: string;
  onChange?: (value: string) => void;
}

export const TravelerSelect: FC<TravelerSelectProps> = ({
  errorMessage,
  onChange,
  name,
  className,
  ...props
}) => {
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Card asChild className={clsx(styles.card, className)} {...props}>
            <button name={name}>
              <Text>Any Traveler</Text>
            </button>
          </Card>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Select traveler</Dialog.Title>
          <RadioCards.Root columns={{ initial: "2", md: "3" }} gap="3">
            {Object.entries(travelers).map(([key, traveler]) => (
              <RadioCards.Item key={key} value={key}>
                <Flex align="center" direction="column" gap="3">
                  <Image
                    alt={traveler.name}
                    className="rt-AvatarRoot rt-r-size-6"
                    height={80}
                    src={`/images/${traveler.image}`}
                    width={80}
                  />
                  <Heading as="h2" size="3">
                    {traveler.name}
                  </Heading>
                </Flex>
              </RadioCards.Item>
            ))}
          </RadioCards.Root>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
