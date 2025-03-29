import { createLoader, parseAsArrayOf, parseAsString } from "nuqs/server";
import { type SetRequired, type ValueOf } from "type-fest";

import type memories from "@public/data/memories.json";

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

type Memory = SetRequired<
  Partial<ValueOf<typeof memories>>,
  "name" | "rarity" | "traveler"
>;

export const compareMemories = (a: Memory, b: Memory) =>
  compareRarities(a.rarity, b.rarity) ||
  a.traveler.localeCompare(b.traveler) ||
  a.name.localeCompare(b.name);

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
