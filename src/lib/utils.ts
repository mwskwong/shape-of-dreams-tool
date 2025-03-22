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
