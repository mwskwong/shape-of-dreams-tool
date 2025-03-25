// rarity
import "@radix-ui/themes/tokens/colors/sky.css";
import "@radix-ui/themes/tokens/colors/purple.css";
import "@radix-ui/themes/tokens/colors/red.css";
import "@radix-ui/themes/tokens/colors/amber.css";

// keyword
import "@radix-ui/themes/tokens/colors/yellow.css";

import { Badge, type BadgeProps } from "@radix-ui/themes/components/badge";
import { Card, type CardProps } from "@radix-ui/themes/components/card";
import { Em } from "@radix-ui/themes/components/em";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Text, type TextProps } from "@radix-ui/themes/components/text";
import { Tooltip } from "@radix-ui/themes/components/tooltip";
import parse, {
  type DOMNode,
  Element,
  type HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";
import Image from "next/image";
import { type FC, Fragment } from "react";

import { sprites } from "@/lib/constants";

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
  achievement?: { name: string; description: string };
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
  achievement,
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
          achievement={achievement}
          cooldownTime={cooldownTime}
          description={description}
          maxCharges={maxCharges}
          mutuallyExclusive={mutuallyExclusive}
          type={type}
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
  achievement?: { name: string; description: string };
  mutuallyExclusive?: string[];
}

export const ItemCardContent: FC<ItemCardContentProps> = ({
  cooldownTime,
  maxCharges,
  description,
  type,
  mutuallyExclusive = [],
  achievement,
}) => (
  <>
    {(cooldownTime !== undefined || maxCharges !== undefined || type) && (
      <Text as="p" color="gray">
        {cooldownTime !== undefined &&
          (cooldownTime === 0 ? "Passive" : `Cooldown: ${cooldownTime}s`)}
        {maxCharges && maxCharges > 1 && ` | Charges: ${maxCharges}`}
        {!type || type === "Normal" ? undefined : ` | ${type}`}
      </Text>
    )}
    <ItemDescription>{description}</ItemDescription>
    {achievement && (
      <Text as="p" color="gray" wrap="pretty">
        Unlock requirement - <Em className={styles.em}>{achievement.name}</Em>:{" "}
        {achievement.description}
      </Text>
    )}
    {mutuallyExclusive.length > 0 && (
      <Text as="p" color="gray" wrap="pretty">
        Mutually exclusive:{" "}
        {mutuallyExclusive.map((memory, index) => (
          <Fragment key={memory}>
            <Em key={memory} className={styles.em}>
              {memory}
            </Em>
            {index < mutuallyExclusive.length - 1 && ", "}
          </Fragment>
        ))}
      </Text>
    )}
  </>
);

const options = {
  replace: (domNode) => {
    if (domNode instanceof Element) {
      const { name, attribs, children } = domNode;

      if (name === "i" && attribs["data-sprite"]) {
        const sprite = Object.values(sprites).find(
          ({ image }) => image === `${attribs["data-sprite"]}.png`,
        );

        return (
          sprite && (
            <Tooltip content={sprite.name}>
              <Image
                alt={sprite.name}
                className={styles.sprite}
                height={18}
                src={`/images/${sprite.image}`}
                width={Math.round(18 * (sprite.width / sprite.height))}
              />
            </Tooltip>
          )
        );
      }

      if (name === "em" && attribs["data-color"]) {
        const color =
          attribs["data-color"] === "yellow"
            ? undefined
            : attribs["data-color"];
        return (
          <Em className={styles.em} style={{ color }}>
            {domToReact(children as DOMNode[], options)}
          </Em>
        );
      }
    }

    return;
  },
} satisfies HTMLReactParserOptions;

export type ItemDescriptionProps = TextProps;
export const ItemDescription: FC<ItemDescriptionProps> = ({
  children,
  ...props
}) => {
  if (typeof children !== "string") {
    return (
      <Text as="p" wrap="pretty" {...props}>
        {children}
      </Text>
    );
  }

  return children.split("\n\n").map((paragraph, index) => (
    <Text key={index} as="p" wrap="pretty" {...props}>
      {parse(
        paragraph
          .replaceAll("\n", "<br>")
          .replaceAll(
            /<color=(.*?)>(.*?)<\/color>/g,
            '<em data-color="$1">$2</em>',
          )
          .replaceAll(/<sprite=(\d+)>/g, '<i data-sprite="$1"></i>'), // WORKAROUND: unable to use self closing tags. ref: https://github.com/remarkablemark/html-react-parser/issues/1434
        options,
      )}
    </Text>
  ));
};
