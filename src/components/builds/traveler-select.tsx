import "@/styles/traveler-colors.css";

import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Card } from "@radix-ui/themes/components/card";
import * as Dialog from "@radix-ui/themes/components/dialog";
import { Flex } from "@radix-ui/themes/components/flex";
import { Inset } from "@radix-ui/themes/components/inset";
import * as RadioCards from "@radix-ui/themes/components/radio-cards";
import { Text } from "@radix-ui/themes/components/text";
import { VisuallyHidden } from "@radix-ui/themes/components/visually-hidden";
import Image from "next/image";
import { type FC } from "react";

import { allTravelers } from "@/lib/constants";
import { getTravelerClassIcon, getTravelerColor } from "@/lib/utils";

export interface TravelerSelectProps
  extends Omit<Dialog.TriggerProps, "children" | "onChange"> {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const TravelerSelect: FC<TravelerSelectProps> = ({
  name,
  value,
  onChange,
  ...props
}) => {
  const selectedTraveler = allTravelers.find(({ id }) => id === value);

  return (
    <>
      <Dialog.Root>
        <Flex align="center" direction="column" gap="2">
          <Dialog.Trigger>
            <Card asChild>
              <button aria-label="select traveler" {...props}>
                <Inset side="all">
                  {selectedTraveler ? (
                    <Image
                      alt={selectedTraveler.name}
                      height={128}
                      src={`/images/${selectedTraveler.image}`}
                      width={128}
                    />
                  ) : (
                    <Box height="128px" width="128px" />
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

            {allTravelers.map(({ id, class: travelerClass, name, image }) => {
              const color = getTravelerColor(id);
              const classIcon = getTravelerClassIcon(travelerClass);

              return (
                <Dialog.Close key={id}>
                  <Flex asChild justify="start">
                    <RadioCards.Item value={id}>
                      <Image
                        alt={name}
                        className="rt-AvatarRoot rt-r-size-3"
                        height={40}
                        src={`/images/${image}`}
                        width={40}
                      />
                      <div>
                        <Text as="p" color={color} size="2" weight="bold">
                          {name}
                        </Text>
                        <Flex asChild align="center" gap="2" justify="center">
                          <Text as="div">
                            {classIcon && (
                              <Image
                                alt={travelerClass}
                                height={16}
                                src={classIcon}
                                width={16}
                              />
                            )}
                            {travelerClass}
                          </Text>
                        </Flex>
                      </div>
                    </RadioCards.Item>
                  </Flex>
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

      <VisuallyHidden>
        <input readOnly aria-label="traveler" name={name} value={value} />
      </VisuallyHidden>
    </>
  );
};
