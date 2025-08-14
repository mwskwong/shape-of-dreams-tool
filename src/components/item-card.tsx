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

import { type Memory } from "@/lib/memories";
import { getSpriteById } from "@/lib/sprites";
import { getTravelerById } from "@/lib/travelers";

import styles from "./item-card.module.css";

export type RootProps = CardProps & Partial<Pick<Memory, "tags">>;

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
  SetOptional<
    Pick<Memory, "name" | "rarity" | "rarityColor" | "traveler" | "image">,
    "traveler"
  > & { size?: "2" | "3" };

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
        height={imageSize}
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
  Partial<
    Pick<
      Memory,
      | "cooldownTime"
      | "maxCharges"
      | "type"
      | "traveler"
      | "achievementName"
      | "achievementDescription"
      | "mutuallyExclusive"
    > & { size?: "2" | "3" }
  >;

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
  Pick<Memory, "rawDescVars"> & { leveling?: "level" | "quality" };
export const Description: FC<DescriptionProps> = ({
  leveling = "level",
  children,
  rawDescVars = [],
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
      // @ts-expect-error: TODO later
      basicAD = 0,
      // @ts-expect-error: TODO later
      basicAP = 0,
      // @ts-expect-error: TODO later
      basicAddedMultiplierPerLevel = 0,
      // @ts-expect-error: TODO later
      basicConstant = 0,
      // @ts-expect-error: TODO later
      basicLvl = 0,
    } = rawDescVar?.data ?? {};

    let value =
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
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
