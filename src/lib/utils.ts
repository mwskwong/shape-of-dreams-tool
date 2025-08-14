import { type ThemeProps } from "@radix-ui/themes/components/theme";
import Hashids from "hashids";
import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Common": {
      return "gray" satisfies ThemeProps["accentColor"];
    }
    case "Rare": {
      return "sky" satisfies ThemeProps["accentColor"];
    }
    case "Epic": {
      return "purple" satisfies ThemeProps["accentColor"];
    }
    case "Legendary": {
      return "red" satisfies ThemeProps["accentColor"];
    }
    default: {
      return "amber" satisfies ThemeProps["accentColor"];
    }
  }
};

const rarityOrders = [
  "Common",
  "Rare",
  "Epic",
  "Legendary",
  "Traveler",
  "Identity",
  "Evasion",
];

export const compareRarities = (a: string, b: string) =>
  rarityOrders.indexOf(a) - rarityOrders.indexOf(b);

export const itemSearchParams = {
  search: parseAsString
    .withDefault("")
    .withOptions({ throttleMs: 300, shallow: false }),
  rarities: parseAsArrayOf(parseAsString)
    .withDefault([])
    .withOptions({ shallow: false }),
  types: parseAsArrayOf(parseAsString)
    .withDefault([])
    .withOptions({ shallow: false }),
  travelers: parseAsArrayOf(parseAsString)
    .withDefault([])
    .withOptions({ shallow: false }),
  tags: parseAsArrayOf(parseAsString)
    .withDefault([])
    .withOptions({ shallow: false }),
};

export const loadItemSearchParams = createLoader(itemSearchParams);

export const buildSearchParams = {
  search: parseAsString
    .withDefault("")
    .withOptions({ throttleMs: 300, shallow: false }),
  travelers: parseAsArrayOf(parseAsString)
    .withDefault([])
    .withOptions({ shallow: false }),
  memories: parseAsArrayOf(parseAsString)
    .withDefault([])
    .withOptions({ shallow: false }),
  essences: parseAsArrayOf(parseAsString)
    .withDefault([])
    .withOptions({ shallow: false }),
  sort: parseAsStringLiteral(["newest", "mostLiked"])
    .withDefault("newest")
    .withOptions({ shallow: false }),
  page: parseAsInteger.withDefault(1).withOptions({ shallow: false }),
};

export const loadBuildSearchParams = createLoader(buildSearchParams);

export const hashIds = new Hashids(process.env.HASH_IDS_SALT, 6);
