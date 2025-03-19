import { createLoader, parseAsArrayOf, parseAsString } from "nuqs/server";

const rarityOrders = [
  "Common",
  "Rare",
  "Epic",
  "Legendary",
  "Character",
  "Identity",
];

export const compareRarities = (a: string, b: string) =>
  rarityOrders.indexOf(a) - rarityOrders.indexOf(b);

export const searchParams = {
  search: parseAsString.withDefault(""),
  rarities: parseAsArrayOf(parseAsString).withDefault([]),
  types: parseAsArrayOf(parseAsString).withDefault([]),
  travelers: parseAsArrayOf(parseAsString).withDefault([]),
  tags: parseAsArrayOf(parseAsString).withDefault([]),
};

export const loadSearchParams = createLoader(searchParams);
