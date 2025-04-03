import "@/styles/traveler-colors.css";

import { Button } from "@radix-ui/themes/components/button";
import { Card } from "@radix-ui/themes/components/card";
import * as DataList from "@radix-ui/themes/components/data-list";
import * as Dialog from "@radix-ui/themes/components/dialog";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
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
  sprites,
} from "@/lib/utils";
import iconStyles from "@/styles/icons.module.css";
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
  onChange?: (value: Value) => void;
}

export const TravelerSelect: FC<TravelerSelectProps> = ({
  value = {
    id: "",
    startingMemories: { q: "", r: "", identity: "", movement: "" },
  },
  onChange,
  ...props
}) => {
  const selectedTraveler = Object.entries(travelers).find(
    ([key]) => key === value.id,
  )?.[1];

  const stats = selectedTraveler && [
    {
      ...sprites.health,
      image: `/images/${sprites.health.image}`,
      value: selectedTraveler.health,
    },
    {
      ...sprites.armor,
      image: `/images/${sprites.armor.image}`,
      value: selectedTraveler.armor,
    },
    {
      ...sprites.attackDamage,
      image: `/images/${sprites.attackDamage.image}`,
      value: selectedTraveler.attackDamage,
    },
    {
      ...sprites.abilityPower,
      image: `/images/${sprites.abilityPower.image}`,
      value: selectedTraveler.abilityPower,
    },
    {
      ...sprites.attackSpeed,
      image: `/images/${sprites.attackSpeed.image}`,
      value: selectedTraveler.attackSpeed.toFixed(2),
    },
    {
      image: "/images/texMovement.png",
      name: "Movement Speed",
      value: selectedTraveler.movementSpeed,
      iconClassName: iconStyles.movementSpeedIcon,
      width: undefined,
      height: undefined,
    },
  ];

  return (
    <Flex direction="column" gap="3" {...props}>
      <Text as="p" size="2" weight="bold">
        Traveler & Starting Memories
      </Text>

      <Flex align="center" direction="column" gap="3" width="100%">
        <Dialog.Root>
          <Flex align="center" direction="column" gap="2">
            <Dialog.Trigger>
              <Card asChild>
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
                    <Inset side="all">
                      <Text asChild color="gray">
                        <Flex
                          align="center"
                          height="128px"
                          justify="center"
                          width="128px"
                        >
                          <IconUser />
                        </Flex>
                      </Text>
                    </Inset>
                  )}
                </button>
              </Card>
            </Dialog.Trigger>
            <Text as="div" color={getTravelerColor(value.id)}>
              {selectedTraveler?.name ?? "Any"}
            </Text>
          </Flex>

          <Dialog.Content aria-describedby={undefined} maxWidth="350px">
            <Dialog.Title mb="4">Select traveler</Dialog.Title>
            <RadioCards.Root
              columns="1"
              value={value.id}
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
                <RadioCards.Item value="">
                  <Text as="p" my="2" size="2" weight="bold">
                    Any Traveler
                  </Text>
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
                        <Text as="p" color={color} size="2" weight="bold">
                          {traveler.name}
                        </Text>
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

            <Flex justify="end" mt="4">
              <Dialog.Close>
                <Button color="gray" variant="soft">
                  Close
                </Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>

        <Flex gap="3">
          {Object.entries(value.startingMemories).map(([key, id]) => {
            const options = memoryEntries
              .filter(
                ([, { traveler, travelerMemoryLocation }]) =>
                  traveler === value.id &&
                  travelerMemoryLocation ===
                    key[0].toUpperCase() + key.slice(1),
              )
              .map(([key, memory]) => ({ id: key, ...memory }));

            return (
              <MemorySelect
                key={key}
                disabled={!selectedTraveler || options.length <= 1}
                options={options}
                size="1"
                value={id}
                onChange={(id) =>
                  onChange?.({
                    ...value,
                    startingMemories: { ...value.startingMemories, [key]: id },
                  })
                }
              />
            );
          })}
        </Flex>
      </Flex>

      <DataList.Root className={styles.dataListRoot}>
        {stats?.map(
          ({ name, image, value, width = 1, height = 1, iconClassName }) => (
            <DataList.Item key={name}>
              <DataList.Label minWidth="200px">
                <Flex align="center" gap="2">
                  <Image
                    alt={name}
                    className={iconClassName}
                    height={16}
                    src={image}
                    width={Math.round(16 * (width / height))}
                  />
                  {name}
                </Flex>
              </DataList.Label>
              <DataList.Value>{value}</DataList.Value>
            </DataList.Item>
          ),
        )}
      </DataList.Root>
    </Flex>
  );
};
