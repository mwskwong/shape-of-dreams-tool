// rarity
import "@radix-ui/themes/tokens/colors/sky.css";
import "@radix-ui/themes/tokens/colors/purple.css";
import "@radix-ui/themes/tokens/colors/red.css";
import "@radix-ui/themes/tokens/colors/amber.css";

// keyword
import "@radix-ui/themes/tokens/colors/yellow.css";

import { Badge } from "@radix-ui/themes/components/badge";
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
import { type FC, Fragment, type PropsWithChildren } from "react";

import { getRarityColor, sprites } from "@/lib/utils";

import styles from "./item-card.module.css";

export interface RootProps extends CardProps {
  name: string;
  rarity: string;
  traveler?: string;
  tags?: string[];
  image: string;
}

export const Root: FC<RootProps> = ({
  name,
  rarity,
  traveler,
  tags = [],
  image,
  children,
  ...props
}) => (
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
      {children}
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

export interface ContentProps extends PropsWithChildren {
  cooldownTime?: number;
  maxCharges?: number;
  type?: string;
  traveler?: string;
  tags?: string[];
  achievement?: { name: string; description: string } | null;
  mutuallyExclusive?: string[];
  size?: "2" | "3";
}

export const Content: FC<ContentProps> = ({
  cooldownTime,
  maxCharges,
  type,
  mutuallyExclusive = [],
  achievement,
  size = "3",
  children,
}) => (
  <>
    {(cooldownTime !== undefined || maxCharges !== undefined || type) && (
      <Text as="p" color="gray" size={size}>
        {cooldownTime !== undefined &&
          (cooldownTime === 0 ? "Passive" : `Cooldown: ${cooldownTime}s`)}
        {maxCharges && maxCharges > 1 && ` | Charges: ${maxCharges}`}
        {!type || type === "Normal" ? undefined : ` | ${type}`}
      </Text>
    )}
    {children}
    {achievement && (
      <Text as="p" color="gray" size={size} wrap="pretty">
        Unlock requirement - <Em className={styles.em}>{achievement.name}</Em>:{" "}
        {achievement.description}
      </Text>
    )}
    {mutuallyExclusive.length > 0 && (
      <Text as="p" color="gray" size={size} wrap="pretty">
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

export type DescriptionProps = TextProps;
export const Description: FC<DescriptionProps> = ({ children, ...props }) => {
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
