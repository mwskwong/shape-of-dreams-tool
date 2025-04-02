"use client";

import { Card } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Text } from "@radix-ui/themes/components/text";
import Image from "next/image";
import { Collapsible } from "radix-ui";
import { type FC, useState } from "react";

import * as ItemCard from "../item-card";

import styles from "./memory-card.module.css";

export interface MemoryCardProps
  extends Omit<Collapsible.CollapsibleProps, "asChild" | "children"> {
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
    <Collapsible.Root open={open} onOpenChange={setOpen} {...props}>
      <Collapsible.Trigger asChild>
        <Card asChild className={styles.card} variant="ghost">
          <button>
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
      </Collapsible.Trigger>

      <Collapsible.Content asChild>
        <Flex direction="column" gap="3">
          <ItemCard.Content
            achievement={achievement}
            cooldownTime={cooldownTime}
            maxCharges={maxCharges}
            mutuallyExclusive={mutuallyExclusive}
            type={type}
          >
            <ItemCard.Description>{description}</ItemCard.Description>
          </ItemCard.Content>
        </Flex>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
