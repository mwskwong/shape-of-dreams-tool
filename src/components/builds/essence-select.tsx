"use client";

import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Card } from "@radix-ui/themes/components/card";
import * as Dialog from "@radix-ui/themes/components/dialog";
import { Flex } from "@radix-ui/themes/components/flex";
import * as HoverCard from "@radix-ui/themes/components/hover-card";
import * as RadioCards from "@radix-ui/themes/components/radio-cards";
import { Separator } from "@radix-ui/themes/components/separator";
import { Text } from "@radix-ui/themes/components/text";
import * as TextField from "@radix-ui/themes/components/text-field";
import { VisuallyHidden } from "@radix-ui/themes/components/visually-hidden";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { type FC, useDeferredValue, useState } from "react";

import {
  getEssenceById,
  getEssenceRarities,
  getEssences,
} from "@/lib/essences";

import * as ItemCard from "../item-card";
import { Select } from "../select";

const essences = getEssences();
const essenceRarityOptions = [
  {
    items: getEssenceRarities().map((rarity) => ({
      value: rarity,
    })),
  },
];

export interface EssenceSelectProps
  extends Omit<Dialog.TriggerProps, "children" | "onChange"> {
  name?: string;
  value?: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
}

export const EssenceSelect: FC<EssenceSelectProps> = ({
  name,
  value,
  onChange,
  ...props
}) => {
  const selectedEssence = value ? getEssenceById(value) : undefined;

  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const [rarities, setRarities] = useState([] as string[]);
  const deferredRarities = useDeferredValue(rarities);

  return (
    <>
      <Dialog.Root>
        <Flex align="center" direction="column" gap="2" maxWidth="64px">
          <HoverCard.Root>
            <Dialog.Trigger {...props}>
              <HoverCard.Trigger>
                <Card asChild>
                  <button aria-label="select essence">
                    {selectedEssence ? (
                      <Image
                        alt={selectedEssence.name}
                        height={40}
                        src={selectedEssence.image}
                        width={40}
                      />
                    ) : (
                      <Box height="40px" width="40px" />
                    )}
                  </button>
                </Card>
              </HoverCard.Trigger>
            </Dialog.Trigger>

            {selectedEssence && (
              <HoverCard.Content>
                <Flex direction="column" gap="3">
                  <Text color={selectedEssence.rarityColor} size="2">
                    {selectedEssence.rarity}
                  </Text>
                  <ItemCard.Content
                    achievementName={selectedEssence.achievementName}
                    size="2"
                    achievementDescription={
                      selectedEssence.achievementDescription
                    }
                  >
                    <ItemCard.Description
                      leveling="quality"
                      rawDescVars={selectedEssence.rawDescVars}
                      size="2"
                    >
                      {selectedEssence.rawDesc}
                    </ItemCard.Description>
                  </ItemCard.Content>
                </Flex>
              </HoverCard.Content>
            )}
          </HoverCard.Root>

          <Text align="center" as="div" size="1">
            {selectedEssence?.name ?? "Any"}
          </Text>
        </Flex>

        <Dialog.Content aria-describedby={undefined} maxWidth="1000px">
          <Dialog.Title mb="4">Select essence</Dialog.Title>

          <Flex align="center" gap="3" mb="3" wrap="wrap">
            <Box asChild width={{ initial: "100%", xs: "250px" }}>
              <TextField.Root
                placeholder="Search..."
                type="search"
                value={search}
                onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
              >
                <TextField.Slot>
                  <IconSearch size={16} />
                </TextField.Slot>
              </TextField.Root>
            </Box>
            <Select
              multiple
              name="Rarity"
              options={essenceRarityOptions}
              value={rarities}
              onReset={() => setRarities([])}
              onValueChange={setRarities}
            />
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

            {essences
              .filter(
                ({ name, description, rarity }) =>
                  (!deferredSearch ||
                    name.toLowerCase().includes(deferredSearch.toLowerCase()) ||
                    description
                      .toLowerCase()
                      .includes(deferredSearch.toLowerCase())) &&
                  (deferredRarities.length === 0 ||
                    deferredRarities.includes(rarity)),
              )
              .map(
                ({
                  id,
                  name,
                  rarity,
                  rarityColor,
                  image,
                  rawDesc,
                  rawDescVars,
                }) => (
                  <Dialog.Close key={id}>
                    <Flex
                      asChild
                      align="stretch"
                      direction="column"
                      justify="start"
                    >
                      <RadioCards.Item value={id}>
                        <ItemCard.Header
                          image={image}
                          name={name}
                          rarity={rarity}
                          rarityColor={rarityColor}
                          size="2"
                        />
                        <ItemCard.Description
                          leveling="quality"
                          rawDescVars={rawDescVars}
                          size="2"
                        >
                          {rawDesc}
                        </ItemCard.Description>
                      </RadioCards.Item>
                    </Flex>
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
        <input readOnly aria-label="essence" name={name} value={value} />
      </VisuallyHidden>
    </>
  );
};
