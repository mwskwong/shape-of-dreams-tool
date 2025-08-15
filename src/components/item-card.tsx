import "@/styles/item-colors.css";

import { Badge } from "@radix-ui/themes/components/badge";
import { Card, type CardProps } from "@radix-ui/themes/components/card";
import { Em } from "@radix-ui/themes/components/em";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Text, type TextProps } from "@radix-ui/themes/components/text";
import { Tooltip } from "@radix-ui/themes/components/tooltip";
import { clsx } from "clsx";
import parse, {
  type DOMNode,
  Element,
  type HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";
import Image from "next/image";
import { type FC, Fragment, type PropsWithChildren } from "react";
import { type SetOptional } from "type-fest";

import { type Essence } from "@/lib/essences";
import { type Memory } from "@/lib/memories";
import { getSpriteById } from "@/lib/sprites";
import { getTravelerById } from "@/lib/travelers";

import styles from "./item-card.module.css";

type Item = SetOptional<
  {
    [K in keyof Memory]: K extends keyof Essence
      ? Memory[K] | Essence[K]
      : Memory[K];
  } & {
    [K in keyof Essence as Exclude<K, keyof Memory>]: Essence[K];
  },
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- Essence may have fields that are not in Memory in the future
  Exclude<keyof Memory, keyof Essence> | Exclude<keyof Essence, keyof Memory>
>;

type Size = "2" | "3";

export type RootProps = CardProps & Pick<Item, "tags">;
export const Root: FC<RootProps> = ({ tags = [], children, ...props }) => (
  <Card {...props}>
    <Flex direction="column" gap="3" height="100%">
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

export type HeaderProps = Omit<FlexProps, "children"> &
  Pick<Item, "name" | "rarity" | "rarityColor" | "traveler" | "image"> & {
    size?: Size;
  };

export const Header: FC<HeaderProps> = ({
  name,
  rarity,
  rarityColor,
  traveler: travelerId,
  image,
  size = "3",
  ...props
}) => {
  const imageSize = size === "3" ? 48 : 40;
  const traveler = travelerId ? getTravelerById(travelerId) : undefined;

  return (
    <Flex gap="3" {...props}>
      <Image
        alt={name}
        src={image}
        width={imageSize}
        className={clsx("rt-AvatarRoot", {
          "rt-r-size-3": size === "2",
          "rt-r-size-4": size === "3",
        })}
      />
      <div>
        {size === "3" ? (
          <Heading as="h2" size="4">
            {name}
          </Heading>
        ) : (
          <Text as="p" size="2" weight="bold">
            {name}
          </Text>
        )}
        <Text as="p" color={rarityColor} size={size}>
          {rarity}
          {traveler ? ` · ${traveler.name.replace("Hero_", "")}` : undefined}
        </Text>
      </div>
    </Flex>
  );
};

export type ContentProps = PropsWithChildren &
  SetOptional<
    Pick<
      Item,
      | "cooldownTime"
      | "maxCharges"
      | "type"
      | "traveler"
      | "achievementName"
      | "achievementDescription"
      | "mutuallyExclusive"
    >,
    "achievementName" | "achievementDescription"
  > & { size?: Size };

export const Content: FC<ContentProps> = ({
  cooldownTime,
  maxCharges,
  type,
  mutuallyExclusive = [],
  achievementName,
  achievementDescription,
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
    {achievementName && (
      <Text as="p" color="gray" size={size}>
        Unlock requirement - <Em className={styles.em}>{achievementName}</Em>:{" "}
        {achievementDescription}
      </Text>
    )}
    {mutuallyExclusive.length > 0 && (
      <Text as="p" color="gray" size={size}>
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

export type DescriptionProps = TextProps &
  Pick<Item, "rawDescVars"> & { leveling?: "level" | "quality" };
export const Description: FC<DescriptionProps> = ({
  leveling = "level",
  children,
  rawDescVars,
  ...props
}) => {
  if (typeof children !== "string") {
    return (
      <Text as="p" {...props}>
        {children}
      </Text>
    );
  }

  const getScaling = (varIndex?: number) => {
    const rawDescVar =
      typeof varIndex === "number" ? rawDescVars[varIndex] : undefined;
    const {
      basicAD = 0,
      basicAP = 0,
      basicAddedMultiplierPerLevel = 0,
      basicConstant = 0,
      basicLvl = 0,
    } = rawDescVar?.data ?? {};

    let value =
      basicAddedMultiplierPerLevel * (basicConstant + basicAP + basicAD) +
      basicLvl * (1 + 2 * basicAddedMultiplierPerLevel);
    if (
      rawDescVar?.rendered.includes("%") &&
      !rawDescVar.format.endsWith(String.raw`\%`)
    ) {
      value *= 100;
    }
    if (leveling === "quality") value *= 50;

    const unit = rawDescVar?.rendered.includes("%") ? "%" : "";
    const perLeveling = leveling === "level" ? "lv" : "50% quality";

    return rawDescVar?.scalingType === "basic"
      ? `+${+value.toFixed(2)}${unit} / ${perLeveling}`
      : `+??? / ${perLeveling}`;
  };

  const options = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        const { name, attribs, children, parentNode } = domNode;

        if (name === "span" && attribs["data-index"]) {
          return (
            <Text className={styles.nowrap} wrap="nowrap" {...attribs}>
              {domToReact(children as DOMNode[], options)}
            </Text>
          );
        }

        if (name === "i" && attribs["data-sprite"]) {
          const sprite = getSpriteById(attribs["data-sprite"]);

          if (sprite) {
            const isUpgradableParam = attribs["data-sprite"] === "5";
            const varIndex =
              parentNode instanceof Element
                ? Number.parseInt(parentNode.attribs["data-index"])
                : undefined;

            return (
              <Tooltip
                content={isUpgradableParam ? getScaling(varIndex) : sprite.name}
              >
                <Image
                  alt={sprite.name}
                  className={styles.sprite}
                  height={18}
                  src={sprite.image}
                />
              </Tooltip>
            );
          }
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

  return children.split("\n\n").map((paragraph, index) => (
    <Text key={index} as="p" {...props}>
      {parse(
        paragraph
          .replaceAll(
            /{(\d+)}/g,
            (_, index: string) =>
              `<span data-index="${index}">${rawDescVars[Number.parseInt(index)].rendered}</span>`,
          )
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
