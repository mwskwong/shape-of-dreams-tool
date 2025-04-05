import { type ThemeProps } from "@radix-ui/themes/components/theme";
import Hashids from "hashids";
import { createLoader, parseAsArrayOf, parseAsString } from "nuqs/server";

import memories from "@public/data/memories.json";

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

interface Item {
  name: string;
  rarity: string;
}

interface Memory extends Item {
  traveler: string;
  travelerMemoryLocation?: string;
}

export const compareMemories = (a: Memory, b: Memory) =>
  compareRarities(a.rarity, b.rarity) ||
  a.traveler.localeCompare(b.traveler) ||
  a.name.localeCompare(b.name);

export const compareEssences = (a: Item, b: Item) =>
  compareRarities(a.rarity, b.rarity) || a.name.localeCompare(b.name);

export const searchParams = {
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

export const loadSearchParams = createLoader(searchParams);

export const getTravelerClassIcon = (travelerClass: string) => {
  if (travelerClass.toLowerCase().includes("attacker")) {
    return "/images/iconAttacker.png";
  }

  if (travelerClass.toLowerCase().includes("mage")) {
    return "/images/iconSpellCaster.png";
  }

  if (travelerClass.toLowerCase().includes("tank")) {
    return "/images/iconTank.png";
  }

  if (travelerClass.toLowerCase().includes("support")) {
    return "/images/iconSupporter.png";
  }
};

export const getTravelerColor = (
  travelerId: string,
): ThemeProps["accentColor"] => {
  switch (travelerId) {
    case "Hero_Lacerta": {
      return "orange";
    }
    case "Hero_Mist": {
      return "mint";
    }
    case "Hero_Yubar": {
      return "ruby";
    }
    case "Hero_Vesper": {
      return "amber";
    }
    case "Hero_Aurena": {
      return "yellow";
    }
  }
};

export const getRarityColor = (rarity: string): ThemeProps["accentColor"] => {
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

export const getMutuallyExclusiveMemories = ({
  name,
  traveler,
  travelerMemoryLocation,
}: Memory) =>
  Object.entries(memories)
    .filter(
      ([, memory]) =>
        memory.name !== name &&
        memory.traveler &&
        memory.traveler === traveler &&
        memory.travelerMemoryLocation === travelerMemoryLocation,
    )
    .map(([, { name }]) => name);

export const hashIds = new Hashids(process.env.HASH_IDS_SALT, 6);
