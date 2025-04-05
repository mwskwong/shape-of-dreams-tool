"use client";

import "@/styles/item-colors.css";

import { Badge } from "@radix-ui/themes/components/badge";
import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Card } from "@radix-ui/themes/components/card";
import * as Dialog from "@radix-ui/themes/components/dialog";
import { Flex } from "@radix-ui/themes/components/flex";
import { Inset } from "@radix-ui/themes/components/inset";
import * as RadioCards from "@radix-ui/themes/components/radio-cards";
import { Separator } from "@radix-ui/themes/components/separator";
import { Text } from "@radix-ui/themes/components/text";
import * as TextField from "@radix-ui/themes/components/text-field";
import { VisuallyHidden } from "@radix-ui/themes/components/visually-hidden";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { type FC, useDeferredValue, useState } from "react";

import {
  allMemoryEntries,
  allMemoryRarities,
  allMemoryTypes,
} from "@/lib/constants";

import { CheckboxGroupSelect } from "../checkbox-group-select";
import * as ItemCard from "../item-card";

import styles from "./memory-select.module.css";

export interface MemorySelectProps
  extends Omit<Dialog.TriggerProps, "children" | "onChange"> {
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
  name?: string;
  value?: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
}

export const MemorySelect: FC<MemorySelectProps> = ({
  options = [],
  size = "2",
  name,
  value,
  onChange,
  ...props
}) => {
  const selectedMemory = allMemoryEntries.find(([key]) => key === value)?.[1];

  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const [rarities, setRarities] = useState([] as string[]);
  const deferredRarities = useDeferredValue(rarities);

  const [types, setTypes] = useState([] as string[]);
  const deferredTypes = useDeferredValue(types);

  return (
    <>
      <Dialog.Root>
        <Flex
          align="center"
          direction="column"
          gap="2"
          maxWidth={`${size === "1" ? 64 : 80}px`}
        >
          <Dialog.Trigger {...props}>
            <Card asChild>
              <button>
                <Inset side="all">
                  {selectedMemory ? (
                    <Image
                      alt={selectedMemory.name}
                      height={size === "1" ? 62 : 78}
                      src={`/images/${selectedMemory.image}`}
                      width={size === "1" ? 62 : 78}
                    />
                  ) : (
                    <Box
                      height={`${size === "1" ? 62 : 78}px`}
                      width={`${size === "1" ? 62 : 78}px`}
                    />
                  )}
                </Inset>
              </button>
            </Card>
          </Dialog.Trigger>
          <Text align="center" as="div" size={size}>
            {selectedMemory?.name ?? "Any"}
          </Text>
        </Flex>

        <Dialog.Content aria-describedby={undefined} maxWidth="1000px">
          <Dialog.Title mb="4">Select memory</Dialog.Title>

          {options.length > 6 && (
            <Flex align="center" gap="3" mb="3" wrap="wrap">
              <TextField.Root
                className={styles.search}
                placeholder="Search..."
                type="search"
                value={search}
                onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
              >
                <TextField.Slot>
                  <IconSearch size={16} />
                </TextField.Slot>
              </TextField.Root>

              <CheckboxGroupSelect
                value={rarities}
                options={allMemoryRarities
                  .filter((rarity) => !["Identity", "Evasion"].includes(rarity))
                  .map((rarity) => ({ value: rarity }))}
                onReset={() => setRarities([])}
                onValueChange={setRarities}
              >
                Rarity
                {rarities.length > 0 && (
                  <Badge color="indigo">{rarities.length}</Badge>
                )}
              </CheckboxGroupSelect>

              <CheckboxGroupSelect
                options={allMemoryTypes.map((type) => ({ value: type }))}
                value={types}
                onReset={() => setTypes([])}
                onValueChange={setTypes}
              >
                Type
                {types.length > 0 && (
                  <Badge color="indigo">{types.length}</Badge>
                )}
              </CheckboxGroupSelect>

              <Separator orientation="vertical" size="2" />
              <Button
                color="gray"
                variant="ghost"
                onClick={() => {
                  setSearch("");
                  setRarities([]);
                  setTypes([]);
                }}
              >
                Reset
              </Button>
            </Flex>
          )}

          <RadioCards.Root
            columns={{ initial: "1", sm: "2", md: "3" }}
            value={value}
            onValueChange={onChange}
          >
            <Dialog.Close>
              <RadioCards.Item value="">
                <Text my="2" size="2" weight="bold">
                  Any memory
                </Text>
              </RadioCards.Item>
            </Dialog.Close>

            {options
              .filter(
                ({ name, description, rarity, type }) =>
                  (!deferredSearch ||
                    name.toLowerCase().includes(deferredSearch.toLowerCase()) ||
                    description
                      .toLowerCase()
                      .includes(deferredSearch.toLowerCase())) &&
                  (deferredRarities.length === 0 ||
                    deferredRarities.includes(rarity)) &&
                  (deferredTypes.length === 0 ||
                    deferredTypes.includes(type ?? "")),
              )
              .map(
                ({
                  id,
                  name,
                  rarity,
                  traveler,
                  image,
                  cooldownTime,
                  maxCharges,
                  type,
                  mutuallyExclusive,
                  description,
                }) => (
                  <Dialog.Close key={id}>
                    <RadioCards.Item
                      className={styles.radioCardItem}
                      value={id}
                    >
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
                        mutuallyExclusive={mutuallyExclusive}
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

          <Flex justify="end" mt="4">
            <Dialog.Close>
              <Button color="gray" variant="soft">
                Close
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      <VisuallyHidden>
        <input readOnly name={name} value={value} />
      </VisuallyHidden>
    </>
  );
};
