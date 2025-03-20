// rarity
import "@radix-ui/themes/tokens/colors/sky.css";
import "@radix-ui/themes/tokens/colors/purple.css";
import "@radix-ui/themes/tokens/colors/red.css";
import "@radix-ui/themes/tokens/colors/amber.css";

import { Badge, type BadgeProps } from "@radix-ui/themes/components/badge";
import { Card, type CardProps } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Text } from "@radix-ui/themes/components/text";
import parse, { Element } from "html-react-parser";
import Image from "next/image";
import { type FC } from "react";

import styles from "./item-card.module.css";

export interface ItemCardProps extends Omit<CardProps, "children"> {
  name: string;
  cooldownTime?: number;
  maxCharges?: number;
  addedCharges?: number;
  description: string;
  shortDescription?: string | null;
  rarity: string;
  type?: string;
  traveler?: string;
  tags?: string[];
  image: string;
  unlockBy?: string;
}

const getRarityColor = (
  rarity: ItemCardProps["rarity"],
): BadgeProps["color"] => {
  switch (rarity) {
    case "Common": {
      return "gray";
    }
    case "Rare": {
      return "sky";
    }
    case "Epic": {
      return "purple";
    }
    case "Legendary": {
      return "red";
    }
    default: {
      return "amber";
    }
  }
};

export const ItemCard: FC<ItemCardProps> = ({
  name,
  cooldownTime,
  maxCharges,
  description,
  rarity,
  type,
  traveler,
  tags = [],
  image,
  unlockBy,
}) => {
  return (
    <Card>
      <Flex direction="column" gap="3" height="100%">
        <Flex gap="3">
          <Image
            alt={name}
            className="rt-AvatarRoot rt-r-size-4"
            height={48}
            src={`/images/${image}`}
            width={48}
          />
          <div>
            <Heading as="h2" size="5">
              {name}
            </Heading>
            <Text as="p" color={getRarityColor(rarity)}>
              {rarity}
              {traveler ? ` · ${traveler.replace("Hero_", "")}` : undefined}
            </Text>
          </div>
        </Flex>
        {(cooldownTime ?? maxCharges ?? type) && (
          <Text as="p" color="gray">
            {cooldownTime !== undefined &&
              (cooldownTime === 0 ? "Passive" : `Cooldown: ${cooldownTime}s`)}
            {maxCharges && maxCharges > 1 && ` | Charges: ${maxCharges}`}
            {!type || type === "Normal" ? undefined : ` | ${type}`}
          </Text>
        )}
        {unlockBy && (
          <Text as="p" color="gray">
            Unlock by: {unlockBy}
          </Text>
        )}
        <Text as="p">
          {parse(
            description
              .replaceAll("\n", "<br>")
              .replaceAll(
                /<color=(.*?)>(.*?)<\/color>/g,
                '<em style="font-family: var(--font-ibm-plex-serif); color: $1">$2</em>',
              )
              .replaceAll(
                /<sprite=(\d+)>/g,
                '<img src="/images/$1.png" alt="sprite $1" />',
              ),
            {
              replace: (domNode) => {
                if (domNode instanceof Element && domNode.name === "img") {
                  return (
                    <Image
                      alt={domNode.attribs.alt}
                      className={styles.sprite}
                      height={16}
                      src={domNode.attribs.src}
                      width={16}
                    />
                  );
                }
              },
            },
          )}
        </Text>
        {tags.length > 0 && (
          <Flex gap="2" mt="auto" wrap="wrap">
            {tags.map((tag) => (
              <Badge key={tag} color="gray">
                {tag}
              </Badge>
            ))}
          </Flex>
        )}
      </Flex>
    </Card>
  );
};
