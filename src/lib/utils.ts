import { type ClassValue, clsx } from "clsx";
import Hashids from "hashids";
import { twMerge } from "tailwind-merge";

// TODO: type the returned color
export const getRarityColor = (rarity: string) => {
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

export const hashIds = new Hashids(process.env.HASH_IDS_SALT, 6);

export const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});
export const statsFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
