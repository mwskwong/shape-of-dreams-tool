import { type ThemeProps } from "@radix-ui/themes/components/theme";
import Hashids from "hashids";
import { createLoader, parseAsArrayOf, parseAsString } from "nuqs/server";

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

export const sprites = {
  abilityPower: {
    name: "Ability Power",
    image: "1.png",
    width: 82,
    height: 77,
  },
  attackDamage: {
    name: "Attack Damage",
    image: "2.png",
    width: 81,
    height: 72,
  },
  health: {
    name: "Health",
    image: "3.png",
    width: 56,
    height: 54,
  },
  attackSpeed: {
    name: "Attack Speed",
    image: "4.png",
    width: 89,
    height: 91,
  },
  upgradableParameter: {
    name: "Upgradeable Parameter",
    image: "5.png",
    width: 62,
    height: 88,
  },
  memoryHaste: {
    name: "Memory Haste",
    image: "6.png",
    width: 64,
    height: 74,
  },
  armor: {
    name: "Armor",
    image: "7.png",
    width: 54,
    height: 56,
  },
};

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

export const hashIds = new Hashids(process.env.HASH_IDS_SALT, 6);
