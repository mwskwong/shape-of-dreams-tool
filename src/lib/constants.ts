import essences from "@public/data/essences.json";
import memories from "@public/data/memories.json";
import travelers from "@public/data/travelers.json";

import { compareEssences, compareMemories, compareRarities } from "./utils";

export const allEssenceEntries = Object.entries(essences).toSorted(
  ([, a], [, b]) => compareEssences(a, b),
);

export const allMemoryEntries = Object.entries(memories).toSorted(
  ([, a], [, b]) => compareMemories(a, b),
);

export const allTravelerEntries = Object.entries(travelers);

export const allEssenceRarities = [
  ...new Set(Object.values(essences).map(({ rarity }) => rarity)),
].toSorted(compareRarities);

export const allMemoryRarities = [
  ...new Set(Object.values(memories).map(({ rarity }) => rarity)),
].toSorted(compareRarities);

export const allMemoryTypes = [
  ...new Set(Object.values(memories).map(({ type }) => type)),
];

export const allMemoryTags = [
  ...new Set(Object.values(memories).flatMap(({ tags }) => tags)),
].toSorted();
