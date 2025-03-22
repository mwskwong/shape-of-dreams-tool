// rarity
import "@radix-ui/themes/tokens/colors/sky.css";
import "@radix-ui/themes/tokens/colors/purple.css";
import "@radix-ui/themes/tokens/colors/red.css";
import "@radix-ui/themes/tokens/colors/amber.css";

// keyword
import "@radix-ui/themes/tokens/colors/yellow.css";

import { Badge, type BadgeProps } from "@radix-ui/themes/components/badge";
import { Card, type CardProps } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Text, type TextProps } from "@radix-ui/themes/components/text";
import { Tooltip } from "@radix-ui/themes/components/tooltip";
import parse, { Element } from "html-react-parser";
import Image from "next/image";
import { type FC, Fragment } from "react";

import { spriteNames } from "@/lib/constants";

import styles from "./item-card.module.css";

export interface ItemCardProps extends Omit<CardProps, "children"> {
  name: string;
  cooldownTime?: number;
  maxCharges?: number;
  description: string;
  rarity: string;
  type?: string;
  traveler?: string;
  tags?: string[];
  image: string;
  unlockBy?: string;
  mutuallyExclusive?: string[];
}

const getRarityColor = (rarity: string): BadgeProps["color"] => {
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
  mutuallyExclusive = [],
  ...props
}) => {
  return (
    <Card {...props}>
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
            <Heading as="h2" size="4">
              {name}
            </Heading>
            <Text as="p" color={getRarityColor(rarity)}>
              {rarity}
              {traveler ? ` · ${traveler.replace("Hero_", "")}` : undefined}
            </Text>
          </div>
        </Flex>
        <ItemCardContent
          cooldownTime={cooldownTime}
          description={description}
          maxCharges={maxCharges}
          mutuallyExclusive={mutuallyExclusive}
          type={type}
          unlockBy={unlockBy}
        />
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

export interface ItemCardContentProps extends Omit<CardProps, "children"> {
  cooldownTime?: number;
  maxCharges?: number;
  description: string;
  type?: string;
  traveler?: string;
  tags?: string[];
  unlockBy?: string;
  mutuallyExclusive?: string[];
}

export const ItemCardContent: FC<ItemCardContentProps> = ({
  cooldownTime,
  maxCharges,
  description,
  type,
  unlockBy,
  mutuallyExclusive = [],
}) => {
  return (
    <>
      {(cooldownTime !== undefined || maxCharges !== undefined || type) && (
        <Text as="p" color="gray">
          {cooldownTime !== undefined &&
            (cooldownTime === 0 ? "Passive" : `Cooldown: ${cooldownTime}s`)}
          {maxCharges && maxCharges > 1 && ` | Charges: ${maxCharges}`}
          {!type || type === "Normal" ? undefined : ` | ${type}`}
        </Text>
      )}
      {mutuallyExclusive.length > 0 && (
        <Text as="p" color="gray">
          Mutually exclusive with:{" "}
          {mutuallyExclusive.map((memory, index) => (
            <Fragment key={memory}>
              <em
                key={memory}
                className="rt-Em"
                style={{
                  // @ts-expect-error -- override em font size
                  "--em-font-size-adjust": 1,
                  color: "var(--yellow-a11)",
                }}
              >
                {memory}
              </em>
              {index < mutuallyExclusive.length - 1 && ", "}
            </Fragment>
          ))}
        </Text>
      )}
      {unlockBy && (
        <Text as="p" color="gray" wrap="pretty">
          Unlock by: {unlockBy}
        </Text>
      )}
      <ItemDescription>{description}</ItemDescription>
    </>
  );
};

export type ItemDescriptionProps = TextProps;
export const ItemDescription: FC<ItemDescriptionProps> = ({
  children,
  ...props
}) => (
  <Text as="p" wrap="pretty" {...props}>
    {typeof children === "string"
      ? parse(
          children
            .replaceAll("\n", "<br>")
            .replaceAll(
              /<color=(.*?)>(.*?)<\/color>/g,
              (_, color: string, content: string) => {
                const newColor =
                  color === "yellow" ? "var(--yellow-a11)" : color;
                return `<em class="rt-Em" style="--em-font-size-adjust: 1; color: ${newColor}">${content}</em>`;
              },
            )
            .replaceAll(
              /<sprite=(\d+)>/g,
              '<img src="/images/$1.png" data-sprite="$1" />',
            ),
          {
            replace: (domNode) => {
              if (domNode instanceof Element && domNode.name === "img") {
                const spriteName =
                  spriteNames[Number(domNode.attribs["data-sprite"])] ?? "";
                return (
                  <Tooltip content={spriteName}>
                    <Image
                      alt={spriteName}
                      className={styles.sprite}
                      height={20}
                      src={domNode.attribs.src}
                      width={20}
                    />
                  </Tooltip>
                );
              }
            },
          },
        )
      : children}
  </Text>
);
