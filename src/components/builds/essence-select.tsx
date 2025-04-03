"use client";

import { Badge } from "@radix-ui/themes/components/badge";
import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Card } from "@radix-ui/themes/components/card";
import * as Dialog from "@radix-ui/themes/components/dialog";
import { Flex } from "@radix-ui/themes/components/flex";
import * as RadioCards from "@radix-ui/themes/components/radio-cards";
import { Separator } from "@radix-ui/themes/components/separator";
import { Text } from "@radix-ui/themes/components/text";
import * as TextField from "@radix-ui/themes/components/text-field";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { type FC, useState } from "react";

import { allEssenceRarities, compareEssences } from "@/lib/utils";
import essences from "@public/data/essences.json";

import { CheckboxGroupSelect } from "../checkbox-group-select";
import * as ItemCard from "../item-card";

import styles from "./essence-select.module.css";

const essenceEntries = Object.entries(essences).toSorted(([, a], [, b]) =>
  compareEssences(a, b),
);

export interface EssenceSelectProps
  extends Omit<Dialog.TriggerProps, "children" | "onChange"> {
  value?: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
}

export const EssenceSelect: FC<EssenceSelectProps> = ({
  value,
  onChange,
  ...props
}) => {
  const selectedEssence = essenceEntries.find(([key]) => key === value)?.[1];

  const [search, setSearch] = useState("");
  const [rarities, setRarities] = useState([] as string[]);

  return (
    <Dialog.Root>
      <Flex align="center" direction="column" gap="2" maxWidth="64px">
        <Dialog.Trigger {...props}>
          <Card asChild>
            <button>
              {selectedEssence ? (
                <Image
                  alt={selectedEssence.name}
                  height={40}
                  src={`/images/${selectedEssence.image}`}
                  width={40}
                />
              ) : (
                <Box height="40px" width="40px" />
              )}
            </button>
          </Card>
        </Dialog.Trigger>
        <Text align="center" as="div" size="1">
          {selectedEssence?.name ?? "Any"}
        </Text>
      </Flex>

      <Dialog.Content aria-describedby={undefined} maxWidth="1000px">
        <Dialog.Title mb="4">Select essence</Dialog.Title>

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
            options={allEssenceRarities.map((rarity) => ({ value: rarity }))}
            value={rarities}
            onReset={() => setRarities([])}
            onValueChange={setRarities}
          >
            Rarity
            {rarities.length > 0 && (
              <Badge color="indigo">{rarities.length}</Badge>
            )}
          </CheckboxGroupSelect>

          <Separator orientation="vertical" size="2" />
          <Button
            color="gray"
            variant="ghost"
            onClick={() => {
              setSearch("");
              setRarities([]);
            }}
          >
            Reset
          </Button>
        </Flex>

        <RadioCards.Root
          columns={{ initial: "1", sm: "2", md: "3" }}
          value={value}
          onValueChange={onChange}
        >
          <Dialog.Close>
            <RadioCards.Item value="">
              <Text my="2" size="2" weight="bold">
                Any essence
              </Text>
            </RadioCards.Item>
          </Dialog.Close>

          {essenceEntries
            .filter(
              ([, { name, description, rarity }]) =>
                (!search ||
                  name.toLowerCase().includes(search.toLowerCase()) ||
                  description.toLowerCase().includes(search.toLowerCase())) &&
                (rarities.length === 0 || rarities.includes(rarity)),
            )
            .map(([id, { name, rarity, image, description }]) => (
              <Dialog.Close key={id}>
                <RadioCards.Item className={styles.radioCardItem} value={id}>
                  <ItemCard.Header
                    image={image}
                    name={name}
                    rarity={rarity}
                    size="2"
                  />
                  <ItemCard.Description size="2">
                    {description}
                  </ItemCard.Description>
                </RadioCards.Item>
              </Dialog.Close>
            ))}
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
  );
};
