"use client";

import "@/styles/item-colors.css";

import { Badge } from "@radix-ui/themes/components/badge";
import { Button } from "@radix-ui/themes/components/button";
import { Card } from "@radix-ui/themes/components/card";
import * as Dialog from "@radix-ui/themes/components/dialog";
import { Flex } from "@radix-ui/themes/components/flex";
import { Inset } from "@radix-ui/themes/components/inset";
import * as RadioCards from "@radix-ui/themes/components/radio-cards";
import { Separator } from "@radix-ui/themes/components/separator";
import { Text } from "@radix-ui/themes/components/text";
import * as TextField from "@radix-ui/themes/components/text-field";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { type FC, useState } from "react";

import {
  allMemoryRarities,
  allMemoryTypes,
  compareMemories,
} from "@/lib/utils";
import memories from "@public/data/memories.json";

import { CheckboxGroupSelect } from "../checkbox-group-select";
import * as ItemCard from "../item-card";

import styles from "./memory-select.module.css";

const memoryEntries = Object.entries(memories).toSorted(([, a], [, b]) =>
  compareMemories(a, b),
);

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
  value?: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
}

export const MemorySelect: FC<MemorySelectProps> = ({
  options = [],
  size = "2",
  value,
  onChange,
  ...props
}) => {
  const selectedMemory = memoryEntries.find(([key]) => key === value)?.[1];

  const [search, setSearch] = useState("");
  const [rarities, setRarities] = useState([] as string[]);
  const [types, setTypes] = useState([] as string[]);

  return (
    <Dialog.Root>
      <Flex
        align="center"
        data-size={size}
        direction="column"
        gap="2"
        maxWidth={`${size === "1" ? 64 : 80}px`}
      >
        <Dialog.Trigger {...props}>
          <Card asChild className={styles.card}>
            <button>
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

      <Dialog.Content maxWidth="1000px">
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
              {types.length > 0 && <Badge color="indigo">{types.length}</Badge>}
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
                (!search ||
                  name.toLowerCase().includes(search.toLowerCase()) ||
                  description.toLowerCase().includes(search.toLowerCase())) &&
                (rarities.length === 0 || rarities.includes(rarity)) &&
                (types.length === 0 || types.includes(type ?? "")),
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

        <Flex justify="end">
          <Dialog.Close>
            <Button color="gray" mt="4" variant="soft">
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
