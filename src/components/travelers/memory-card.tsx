"use client";

import { Card } from "@radix-ui/themes/components/card";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Text } from "@radix-ui/themes/components/text";
import { clsx } from "clsx";
import Image from "next/image";
import { type FC, useState } from "react";

import { type Memory } from "@/lib/memories";

import * as ItemCard from "../item-card";

import styles from "./memory-card.module.css";

export type MemoryCardProps = Omit<FlexProps, "children"> & Memory;

export const MemoryCard: FC<MemoryCardProps> = ({
  name,
  cooldownTime,
  maxCharges,
  rawDesc,
  rawDescVars,
  shortDescription,
  type,
  image,
  achievementName,
  achievementDescription,
  mutuallyExclusive = [],
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Flex direction="column" gap="3" {...props}>
      <Card asChild className={styles.card} variant="ghost">
        <button onClick={() => setOpen(!open)}>
          <Flex align="start" gap="3">
            <Image
              alt={name}
              className={clsx("rt-AvatarRoot", "rt-r-size-4")}
              height={48}
              src={image}
              width={48}
            />

            <div>
              <Heading as="h3" size="4">
                {name}
              </Heading>
              <Text as="p" color="gray">
                {shortDescription}
              </Text>
            </div>
          </Flex>
        </button>
      </Card>

      {open && (
        <>
          <ItemCard.Content
            achievementDescription={achievementDescription}
            achievementName={achievementName}
            cooldownTime={cooldownTime}
            maxCharges={maxCharges}
            mutuallyExclusive={mutuallyExclusive}
            type={type}
          >
            <ItemCard.Description rawDescVars={rawDescVars}>
              {rawDesc}
            </ItemCard.Description>
          </ItemCard.Content>
        </>
      )}
    </Flex>
  );
};
