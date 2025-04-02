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
import { type ComponentProps, type FC } from "react";

import { getTravelerClassIcon, getTravelerColor } from "@/lib/utils";
import travelers from "@public/data/travelers.json";

import styles from "./traveler-select.module.css";

interface Value {
  id: string;
  startingMemories: { Q: string; R: string };
}

export interface TravelerSelectProps
  extends Omit<FlexProps, "asChild" | "children" | "onChange"> {
  name: ComponentProps<"button">["name"];
  value?: Value;
  errorMessage?: string;
  onChange?: (value: Value) => void;
}

export const TravelerSelect: FC<TravelerSelectProps> = ({
  name,
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
      <Flex gap="3">
        <Dialog.Root>
          <Flex align="center" direction="column" gap="2">
            <Dialog.Trigger>
              <Card asChild className={styles.selectedCard}>
                <button name={name}>
                  {value?.id ? (
                    <Inset side="all">
                      <Image
                        alt={value.id}
                        height={96}
                        src={`/images/${value.id}.png`}
                        width={96}
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
              size="2"
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
                onChange?.({ id, startingMemories: { Q: "", R: "" } })
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
      </Flex>
    </Flex>
  );
};
