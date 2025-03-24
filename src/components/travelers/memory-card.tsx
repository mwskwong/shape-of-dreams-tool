"use client";

import { Card, type CardProps } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Text } from "@radix-ui/themes/components/text";
import Image from "next/image";
import { type FC, useState } from "react";

import { ItemCardContent } from "../item-card";

export interface MemoryCardProps
  extends Omit<CardProps, "asChild" | "children"> {
  name: string;
  cooldownTime?: number;
  maxCharges?: number;
  description: string;
  shortDescription?: string | null;
  type?: string;
  tags?: string[];
  image: string;
  unlockBy?: string;
  achievement?: { name: string; description: string };
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
  unlockBy,
  achievement,
  mutuallyExclusive = [],
  ...props
}) => {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <Card asChild variant="ghost" {...props}>
        <button onClick={() => setExpand((prev) => !prev)}>
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

      <Flex direction="column" display={expand ? "flex" : "none"} gap="3">
        <ItemCardContent
          achievement={achievement}
          cooldownTime={cooldownTime}
          description={description}
          maxCharges={maxCharges}
          mutuallyExclusive={mutuallyExclusive}
          type={type}
        />
      </Flex>
    </>
  );
};
