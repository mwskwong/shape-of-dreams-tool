"use client";

import { Card } from "@radix-ui/themes/components/card";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Text } from "@radix-ui/themes/components/text";
import Image from "next/image";
import { type FC, useState } from "react";

import * as ItemCard from "../item-card";

import styles from "./memory-card.module.css";

export interface MemoryCardProps extends Omit<FlexProps, "children"> {
  name: string;
  cooldownTime?: number;
  maxCharges?: number;
  description: string;
  shortDescription?: string | null;
  type?: string;
  tags?: string[];
  image: string;
  achievement?: { name: string; description: string } | null;
  mutuallyExclusive?: string[];
}

export const MemoryCard: FC<MemoryCardProps> = ({
  name,
  cooldownTime,
  maxCharges,
  description,
  shortDescription,
  type,
  image,
  achievement,
  mutuallyExclusive = [],
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Flex direction="column" gap="3" {...props}>
      <Card asChild className={styles.card} variant="ghost">
        <button onClick={() => setOpen(!open)}>
          <Flex gap="3">
            <Image
              alt={name}
              className="rt-AvatarRoot rt-r-size-4"
              height={48}
              src={`/images/${image}`}
              width={48}
            />
            <div>
              <Heading as="h3" size="4">
                {name}
              </Heading>
              <Text as="p" color="gray" wrap="pretty">
                {shortDescription}
              </Text>
            </div>
          </Flex>
        </button>
      </Card>

      {open && (
        <>
          <ItemCard.Content
            achievement={achievement}
            cooldownTime={cooldownTime}
            maxCharges={maxCharges}
            mutuallyExclusive={mutuallyExclusive}
            type={type}
          >
            <ItemCard.Description>{description}</ItemCard.Description>
          </ItemCard.Content>
        </>
      )}
    </Flex>
  );
};
