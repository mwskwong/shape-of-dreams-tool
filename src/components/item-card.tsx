import { Badge, type BadgeProps } from "@radix-ui/themes/components/badge";
import { Card, type CardProps } from "@radix-ui/themes/components/card";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Text } from "@radix-ui/themes/components/text";
import Image from "next/image";
import { type FC } from "react";

import { type Essence, type Memory } from "@/lib/types";

export type ItemCardProps = Omit<CardProps, "children"> &
  (Pick<Memory, keyof Memory & keyof Essence> &
    Partial<Omit<Memory, keyof Memory & keyof Essence>>);

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
  maxCharges = 0,
  description,
  rarity,
  type,
  traveler,
  tags = [],
  image,
}) => {
  return (
    <Card>
      <Flex direction="column" gap="3" height="100%">
        <Flex gap="3">
          <Image
            alt={name}
            className="rt-AvatarRoot rt-r-size-4"
            height={96}
            src={`/images/${image}`}
            width={96}
          />
          <div>
            <Heading as="h2" size="5">
              {name}
            </Heading>
            <Text color={getRarityColor(rarity)}>
              {rarity}
              {traveler ? ` · ${traveler.replace("Hero_", "")}` : undefined}
            </Text>
          </div>
        </Flex>
        <Text as="p" color="gray">
          {typeof cooldownTime === "number" &&
            (cooldownTime === 0 ? "Passive" : `Cooldown: ${cooldownTime}s`)}
          {maxCharges > 1 ? ` | Charges: ${maxCharges}` : undefined}
          {!type || type === "Normal" ? undefined : ` | ${type}`}
        </Text>
        <Text
          as="p"
          dangerouslySetInnerHTML={{
            __html: description
              .replaceAll("\n", "<br>")
              .replaceAll(
                /<color=(.*?)>(.*?)<\/color>/g,
                (_, color: string, content: string) => {
                  let mappedColor;
                  switch (color.toLowerCase()) {
                    case "#ff8a2d": {
                      mappedColor = "var(--orange-a11)";
                      break;
                    }
                    case "#16d7ff": {
                      mappedColor = "var(--cyan-a11)";
                      break;
                    }
                    case "yellow": {
                      mappedColor = "var(--yellow-a11)";
                      break;
                    }
                    default: {
                      mappedColor = color;
                    } // Fallback to original color if no match
                  }
                  return `<i style="color: ${mappedColor};">${content}</i>`;
                },
              ),
          }}
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
