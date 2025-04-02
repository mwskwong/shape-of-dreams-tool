import { Card } from "@radix-ui/themes/components/card";
import * as Dialog from "@radix-ui/themes/components/dialog";
import { Flex } from "@radix-ui/themes/components/flex";
import { Grid } from "@radix-ui/themes/components/grid";
import { Inset } from "@radix-ui/themes/components/inset";
import { Text } from "@radix-ui/themes/components/text";
import Image from "next/image";
import { type FC } from "react";

import { compareMemories } from "@/lib/utils";
import memories from "@public/data/memories.json";

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
  const width = size === "1" ? 64 : 80;

  return (
    <Dialog.Root {...props}>
      <Flex align="center" direction="column" gap="2" maxWidth={`${width}px`}>
        <Dialog.Trigger>
          <Card asChild className={styles.card} data-size={size}>
            <button disabled={disabled}>
              {selectedMemory && (
                <Inset side="all">
                  <Image
                    alt={selectedMemory.name}
                    height={width}
                    src={`/images/${selectedMemory.image}`}
                    width={width}
                  />
                </Inset>
              )}
            </button>
          </Card>
        </Dialog.Trigger>
        <Text align="center" as="div" size="2">
          {selectedMemory?.name ?? "Any"}
        </Text>
      </Flex>

      <Dialog.Content>
        <Dialog.Title>Select memory</Dialog.Title>
        <Grid columns={{ initial: "1", sm: "2" }} gap="3">
          {options.map(({ id }) => (
            <div key={id}>{id}</div>
          ))}
        </Grid>
      </Dialog.Content>
    </Dialog.Root>
  );
};
