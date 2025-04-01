import "@radix-ui/themes/tokens/colors/orange.css";
import "@radix-ui/themes/tokens/colors/mint.css";
import "@radix-ui/themes/tokens/colors/ruby.css";
import "@radix-ui/themes/tokens/colors/amber.css";
import "@radix-ui/themes/tokens/colors/yellow.css";

import { Card, type CardProps } from "@radix-ui/themes/components/card";
import * as Dialog from "@radix-ui/themes/components/dialog";
import { Inset } from "@radix-ui/themes/components/inset";
import { Text } from "@radix-ui/themes/components/text";
import { clsx } from "clsx";
import Image from "next/image";
import { type ComponentProps, type FC } from "react";

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
        <Dialog.Title>Select traveler</Dialog.Title>
        {/* <RadioCards.Root
          columns={{ initial: "1", sm: "2" }}
          gap="3"
          value={value}
          onValueChange={onChange}
        >
          {Object.entries(travelers).map(([key, traveler]) => (
            <Dialog.Close key={key}>
              <RadioCards.Item value={key}>
                <TravelerCard.Content {...traveler} />
              </RadioCards.Item>
            </Dialog.Close>
          ))}
        </RadioCards.Root> */}
      </Dialog.Content>
    </Dialog.Root>
  );
};
