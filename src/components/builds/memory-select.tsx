// rarity
import "@radix-ui/themes/tokens/colors/sky.css";
import "@radix-ui/themes/tokens/colors/purple.css";
import "@radix-ui/themes/tokens/colors/red.css";
import "@radix-ui/themes/tokens/colors/amber.css";

// keyword
import "@radix-ui/themes/tokens/colors/yellow.css";

import { Card } from "@radix-ui/themes/components/card";
import * as Dialog from "@radix-ui/themes/components/dialog";
import { Flex } from "@radix-ui/themes/components/flex";
import { Inset } from "@radix-ui/themes/components/inset";
import * as RadioCards from "@radix-ui/themes/components/radio-cards";
import { Text } from "@radix-ui/themes/components/text";
import Image from "next/image";
import { type FC } from "react";

import { compareMemories } from "@/lib/utils";
import memories from "@public/data/memories.json";

import * as ItemCard from "../item-card";

import styles from "./memory-select.module.css";

const memoryEntries = Object.entries(memories).toSorted(([, a], [, b]) =>
  compareMemories(a, b),
);

export interface MemorySelectProps
  extends Omit<Dialog.RootProps, "asChild" | "children"> {
  disabled?: boolean;
  options?: {
    id: string;
    name: string;
    rarity: string;
    traveler?: string;
    tags?: string[];
    image: string;
    cooldownTime?: number;
    maxCharges?: number;
    type?: string;
    achievement?: { name: string; description: string } | null;
    mutuallyExclusive?: string[];
    description: string;
  }[];
  size?: "1" | "2";
  value?: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
}

export const MemorySelect: FC<MemorySelectProps> = ({
  options = [],
  disabled,
  size = "2",
  value,
  onChange,
  ...props
}) => {
  const selectedMemory = memoryEntries.find(([key]) => key === value)?.[1];

  return (
    <Dialog.Root {...props}>
      <Flex
        align="center"
        data-size={size}
        direction="column"
        gap="2"
        maxWidth={`${size === "1" ? 64 : 80}px`}
      >
        <Dialog.Trigger>
          <Card asChild className={styles.card}>
            <button disabled={disabled}>
              {selectedMemory && (
                <Inset side="all">
                  <Image
                    alt={selectedMemory.name}
                    height={size === "1" ? 64 : 80}
                    src={`/images/${selectedMemory.image}`}
                    width={size === "1" ? 64 : 80}
                  />
                </Inset>
              )}
            </button>
          </Card>
        </Dialog.Trigger>
        <Text align="center" as="div" size={size}>
          {selectedMemory?.name ?? "Any"}
        </Text>
      </Flex>

      <Dialog.Content>
        <Dialog.Title>Select memory</Dialog.Title>
        <RadioCards.Root
          columns={{ initial: "1", sm: "2" }}
          value={value}
          onValueChange={onChange}
        >
          {options.map(
            ({
              id,
              name,
              rarity,
              traveler,
              image,
              cooldownTime,
              maxCharges,
              type,
              description,
            }) => (
              <Dialog.Close key={id}>
                <RadioCards.Item className={styles.radioCardItem} value={id}>
                  <ItemCard.Header
                    image={image}
                    name={name}
                    rarity={rarity}
                    size="2"
                    traveler={traveler}
                  />
                  <ItemCard.Content
                    cooldownTime={cooldownTime}
                    maxCharges={maxCharges}
                    size="2"
                    type={type}
                  >
                    <ItemCard.Description size="2">
                      {description}
                    </ItemCard.Description>
                  </ItemCard.Content>
                </RadioCards.Item>
              </Dialog.Close>
            ),
          )}
        </RadioCards.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};
