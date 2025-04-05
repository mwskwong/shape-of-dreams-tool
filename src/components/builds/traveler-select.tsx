import "@/styles/traveler-colors.css";

import { Button } from "@radix-ui/themes/components/button";
import { Card } from "@radix-ui/themes/components/card";
import * as DataList from "@radix-ui/themes/components/data-list";
import * as Dialog from "@radix-ui/themes/components/dialog";
import { Flex } from "@radix-ui/themes/components/flex";
import { Inset } from "@radix-ui/themes/components/inset";
import * as RadioCards from "@radix-ui/themes/components/radio-cards";
import { Text } from "@radix-ui/themes/components/text";
import { VisuallyHidden } from "@radix-ui/themes/components/visually-hidden";
import { IconUser } from "@tabler/icons-react";
import { clsx } from "clsx";
import Image from "next/image";
import { type ComponentProps, type FC } from "react";

import {
  allTravelerEntries,
  spriteMaxAspectRatio,
  sprites,
} from "@/lib/constants";
import { getTravelerClassIcon, getTravelerColor } from "@/lib/utils";
import iconStyles from "@/styles/icons.module.css";

import styles from "./traveler-select.module.css";

export interface TravelerSelectProps
  extends Omit<ComponentProps<"button">, "onChange"> {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const TravelerSelect: FC<TravelerSelectProps> = ({
  name,
  value,
  onChange,
  children,
  ...props
}) => {
  const selectedTraveler = allTravelerEntries.find(
    ([key]) => key === value,
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
    <>
      <Flex align="center" direction="column" gap="3" width="100%">
        <Dialog.Root>
          <Flex align="center" direction="column" gap="2">
            <Dialog.Trigger>
              <Card asChild>
                <button {...props}>
                  <Inset side="all">
                    {selectedTraveler ? (
                      <Image
                        alt={selectedTraveler.name}
                        height={128}
                        src={`/images/${selectedTraveler.image}`}
                        width={128}
                      />
                    ) : (
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
                    )}
                  </Inset>
                </button>
              </Card>
            </Dialog.Trigger>
            <Text as="div" color={value ? getTravelerColor(value) : undefined}>
              {selectedTraveler?.name ?? "Any"}
            </Text>
          </Flex>

          <Dialog.Content aria-describedby={undefined} maxWidth="350px">
            <Dialog.Title mb="4">Select traveler</Dialog.Title>
            <RadioCards.Root columns="1" value={value} onValueChange={onChange}>
              <Dialog.Close>
                <RadioCards.Item value="">
                  <Text as="p" my="2" size="2" weight="bold">
                    Any Traveler
                  </Text>
                </RadioCards.Item>
              </Dialog.Close>

              {allTravelerEntries.map(([key, traveler]) => {
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

        {children}
      </Flex>

      <DataList.Root className={styles.dataListRoot}>
        {stats?.map(({ name, image, value, iconClassName }) => (
          <DataList.Item key={name}>
            <DataList.Label minWidth="200px">
              <Flex align="center" gap="2">
                <Image
                  alt={name}
                  className={clsx(iconClassName, styles.statIcon)}
                  height={16}
                  src={image}
                  width={Math.round(16 * spriteMaxAspectRatio)}
                />
                {name}
              </Flex>
            </DataList.Label>
            <DataList.Value>{value}</DataList.Value>
          </DataList.Item>
        ))}
      </DataList.Root>

      <VisuallyHidden>
        <input readOnly name={name} value={value} />
      </VisuallyHidden>
    </>
  );
};
