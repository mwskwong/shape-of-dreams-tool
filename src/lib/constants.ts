import essences from "@public/data/essences.json";
import memories from "@public/data/memories.json";
import travelers from "@public/data/travelers.json";

import { compareEssences, compareMemories, compareRarities } from "./utils";

export const allEssences = Object.entries(essences)
  .map(([id, essence]) => ({ id: id as keyof typeof essences, ...essence }))
  .toSorted(compareEssences);

export const allMemories = Object.entries(memories)
  .map(([id, memory]) => ({ id: id as keyof typeof memories, ...memory }))
  .toSorted(compareMemories);

export const allTravelers = Object.entries(travelers).map(([id, traveler]) => ({
  id: id as keyof typeof travelers,
  ...traveler,
}));

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

export const spriteMaxAspectRatio = Math.max(
  ...Object.values(sprites).map(({ width, height }) => width / height),
);
