import "@radix-ui/themes/tokens/colors/orange.css";
import "@radix-ui/themes/tokens/colors/mint.css";
import "@radix-ui/themes/tokens/colors/ruby.css";
import "@radix-ui/themes/tokens/colors/amber.css";
import "@radix-ui/themes/tokens/colors/yellow.css";

import { Avatar } from "@radix-ui/themes/components/avatar";
import { Card } from "@radix-ui/themes/components/card";
import * as Dialog from "@radix-ui/themes/components/dialog";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Inset } from "@radix-ui/themes/components/inset";
import * as RadioCards from "@radix-ui/themes/components/radio-cards";
import { Text } from "@radix-ui/themes/components/text";
import { IconUser } from "@tabler/icons-react";
import Image from "next/image";
import { type FC } from "react";

import {
  compareMemories,
  getTravelerClassIcon,
  getTravelerColor,
} from "@/lib/utils";
import memories from "@public/data/memories.json";
import travelers from "@public/data/travelers.json";

import { MemorySelect } from "./memory-select";
import styles from "./traveler-select.module.css";

const memoryEntries = Object.entries(memories).toSorted(([, a], [, b]) =>
  compareMemories(a, b),
);

const getStartingMemory = (
  traveler: string,
  travelerMemoryLocation: string,
) => {
  if (!traveler) return "";

  return (
    memoryEntries.find(
      ([, memory]) =>
        memory.traveler === traveler &&
        memory.travelerMemoryLocation === travelerMemoryLocation,
    )?.[0] ?? ""
  );
};

interface Value {
  id: string;
  startingMemories: {
    q: string;
    r: string;
    identity: string;
    movement: string;
  };
}

export interface TravelerSelectProps
  extends Omit<FlexProps, "asChild" | "children" | "onChange"> {
  value?: Value;
  errorMessage?: string;
  onChange?: (value: Value) => void;
}

export const TravelerSelect: FC<TravelerSelectProps> = ({
  value,
  errorMessage,
  onChange,
  ...props
}) => {
  const selectedTraveler = Object.entries(travelers).find(
    ([key]) => key === value?.id,
  )?.[1];

  return (
    <Flex direction="column" gap="3" {...props}>
      <Heading as="h2" size="3">
        Traveler
      </Heading>
      <Flex
        align="center"
        direction={{ initial: "column", sm: "row" }}
        gap="3"
        justify="center"
        width="100%"
      >
        <Dialog.Root>
          <Flex align="center" direction="column" gap="2">
            <Dialog.Trigger>
              <Card asChild className={styles.travelerSelectCard}>
                <button>
                  {selectedTraveler ? (
                    <Inset side="all">
                      <Image
                        alt={selectedTraveler.name}
                        height={128}
                        src={`/images/${selectedTraveler.image}`}
                        width={128}
                      />
                    </Inset>
                  ) : (
                    <Text asChild color="gray">
                      <Flex justify="center">
                        <IconUser />
                      </Flex>
                    </Text>
                  )}
                </button>
              </Card>
            </Dialog.Trigger>
            <Text
              as="div"
              color={value ? getTravelerColor(value.id) : undefined}
            >
              {selectedTraveler?.name ?? "Any"}
            </Text>
          </Flex>

          <Dialog.Content maxWidth="350px">
            <Dialog.Title>Select traveler</Dialog.Title>
            <RadioCards.Root
              columns="1"
              value={value?.id}
              onValueChange={(id) =>
                onChange?.({
                  id,
                  startingMemories: {
                    q: getStartingMemory(id, "Q"),
                    r: getStartingMemory(id, "R"),
                    identity: getStartingMemory(id, "Identity"),
                    movement: getStartingMemory(id, "Movement"),
                  },
                })
              }
            >
              <Dialog.Close>
                <RadioCards.Item className={styles.radioCardItem} value="">
                  <Avatar color="gray" fallback={<IconUser />} />
                  <Heading as="h3" size="2">
                    Any Traveler
                  </Heading>
                </RadioCards.Item>
              </Dialog.Close>

              {Object.entries(travelers).map(([key, traveler]) => {
                const color = getTravelerColor(key);
                const classIcon = getTravelerClassIcon(traveler.class);

                return (
                  <Dialog.Close key={key}>
                    <RadioCards.Item
                      className={styles.radioCardItem}
                      value={key}
                    >
                      <Image
                        alt={traveler.name}
                        className="rt-AvatarRoot rt-r-size-3"
                        height={40}
                        src={`/images/${traveler.image}`}
                        width={40}
                      />
                      <div>
                        <Heading as="h3" color={color} size="2">
                          {traveler.name}
                        </Heading>
                        <Flex asChild align="center" gap="2" justify="center">
                          <Text as="div">
                            {classIcon && (
                              <Image
                                alt={traveler.class}
                                height={16}
                                src={classIcon}
                                width={16}
                              />
                            )}
                            {traveler.class}
                          </Text>
                        </Flex>
                      </div>
                    </RadioCards.Item>
                  </Dialog.Close>
                );
              })}
            </RadioCards.Root>
          </Dialog.Content>
        </Dialog.Root>

        <Flex gap="3">
          {Object.entries(value?.startingMemories ?? {}).map(([key, id]) => {
            const options = memoryEntries
              .filter(
                ([, { traveler, travelerMemoryLocation }]) =>
                  traveler === value?.id &&
                  travelerMemoryLocation ===
                    key[0].toUpperCase() + key.slice(1),
              )
              .map(([key, memory]) => ({ id: key, ...memory }));

            return (
              <MemorySelect
                key={key}
                disabled={!id || options.length <= 1}
                options={options}
                size="1"
                value={id}
                onChange={(id) => ({
                  ...value,
                  startingMemories: { ...value?.startingMemories, q: id },
                })}
              />
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};
