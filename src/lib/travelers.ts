/* eslint-disable unicorn/no-null */

import Hero_Aurena from "@/images/Hero_Aurena.png";
import Hero_Lacerta from "@/images/Hero_Lacerta.png";
import Hero_Mist from "@/images/Hero_Mist.png";
import Hero_Vesper from "@/images/Hero_Vesper.png";
import Hero_Yubar from "@/images/Hero_Yubar.png";
import iconAttacker from "@/images/iconAttacker.png";
import iconSpellCaster from "@/images/iconSpellCaster.png";
import iconSupporter from "@/images/iconSupporter.png";
import iconTank from "@/images/iconTank.png";
import texCrit from "@/images/texCrit.png";
import texMovement from "@/images/texMovement.png";

import { sprites } from "./sprites";

const getTravelerClassIcon = (travelerClass: string) => {
  if (travelerClass.toLowerCase().includes("attacker")) return iconAttacker;
  if (travelerClass.toLowerCase().includes("mage")) return iconSpellCaster;
  if (travelerClass.toLowerCase().includes("tank")) return iconTank;
  if (travelerClass.toLowerCase().includes("support")) return iconSupporter;
};

// TODO: constellations expected to be reworked, see how things goes in the official release
const travelers = {
  Hero_Lacerta: {
    name: "Lacerta",
    difficulty: "Easy",
    class: "Ranged Attacker",
    get classIcon() {
      return getTravelerClassIcon(this.class);
    },
    color: "orange", // TODO: type the returned color
    health: 220,
    armor: 0,
    attackDamage: 43,
    abilityPower: 41,
    attackSpeed: 1.41,
    memoryHaste: 0,
    criticalStrikeChance: 0,
    movementSpeed: 520,
    statsGrowthPerLv: {
      health: "+20%",
      armor: null,
      attackDamage: "+1",
      abilityPower: "+1",
      attackSpeed: null,
      memoryHaste: null,
      criticalStrikeChance: null,
      movementSpeed: null,
    },
    description:
      "Lacerta is a former Royal Guard sniper and hunter proficient in handling firearms and gunpowder. He is accustomed to taking out enemies from long range.",
    achievementName: "",
    achievementDescription: "",
    image: Hero_Lacerta,
    constellations: [],
  },
  Hero_Mist: {
    name: "Mist",
    difficulty: "Hard",
    class: "Melee Attacker",
    get classIcon() {
      return getTravelerClassIcon(this.class);
    },
    color: "mint", // TODO: type the returned color
    health: 250,
    armor: 5,
    attackDamage: 51,
    abilityPower: 33,
    attackSpeed: 1.43,
    memoryHaste: 0,
    criticalStrikeChance: 0,
    movementSpeed: 520,
    statsGrowthPerLv: {
      health: "+30%",
      armor: "+2",
      attackDamage: "+2",
      abilityPower: "+2",
      attackSpeed: null,
      memoryHaste: null,
      criticalStrikeChance: null,
      movementSpeed: null,
    },
    description:
      "Mist is a courageous duelist of noble birth. With agile combat techniques, she can evade dangerous attacks and swiftly dispatch enemies.",
    achievementName: "",
    achievementDescription: "",
    image: Hero_Mist,
    constellations: [],
  },
  Hero_Yubar: {
    name: "Yubar",
    difficulty: "Medium",
    class: "Ranged Mage",
    get classIcon() {
      return getTravelerClassIcon(this.class);
    },
    color: "ruby", // TODO: type the returned color
    health: 180,
    armor: 0,
    attackDamage: 32,
    abilityPower: 43,
    attackSpeed: 2,
    memoryHaste: 0,
    criticalStrikeChance: 0,
    movementSpeed: 510,
    statsGrowthPerLv: {
      health: "+20%",
      armor: null,
      attackDamage: null,
      abilityPower: "+2",
      attackSpeed: null,
      memoryHaste: null,
      criticalStrikeChance: null,
      movementSpeed: null,
    },
    description:
      "Yubar is a fairy tale being from dreams, a god who governs the creation and destruction of stars. He can deal high damage from long range using magic.",
    achievementName: "Pure Imagination",
    achievementDescription: "Acquire a total of 300 Dream Dust.",
    image: Hero_Yubar,
    constellations: [],
  },
  Hero_Vesper: {
    name: "Vesper",
    difficulty: "Medium",
    class: "Melee Tank",
    get classIcon() {
      return getTravelerClassIcon(this.class);
    },
    color: "amber", // TODO: type the returned color
    health: 280,
    armor: 5,
    attackDamage: 54,
    abilityPower: 33,
    attackSpeed: 1,
    memoryHaste: 0,
    criticalStrikeChance: 0,
    movementSpeed: 490,
    statsGrowthPerLv: {
      health: "+30%",
      armor: "+2",
      attackDamage: "+2",
      abilityPower: "+2",
      attackSpeed: null,
      memoryHaste: null,
      criticalStrikeChance: null,
      movementSpeed: null,
    },
    description:
      "Vesper is the leader and cruel inquisitor of the Order of the Sacred Flame. He can block enemies in melee range while dealing high damage.",
    achievementName: "Through Time and Space",
    achievementDescription:
      "Reach the Dream of the Night Sky (the third region).",
    image: Hero_Vesper,
    constellations: [],
  },
  Hero_Aurena: {
    name: "Aurena",
    difficulty: "Very Hard",
    class: "Melee Support",
    get classIcon() {
      return getTravelerClassIcon(this.class);
    },
    color: "yellow", // TODO: type the returned color
    health: 250,
    armor: 5,
    attackDamage: 28,
    abilityPower: 36,
    attackSpeed: 1.05,
    memoryHaste: 0,
    criticalStrikeChance: 0,
    movementSpeed: 500,
    statsGrowthPerLv: {
      health: "+30%",
      armor: "+2",
      attackDamage: "+2",
      abilityPower: "+2",
      attackSpeed: null,
      memoryHaste: null,
      criticalStrikeChance: null,
      movementSpeed: null,
    },
    description:
      "Aurena is a sage from the Lunar Conclave of Arcanum who was expelled for researching forbidden knowledge. She is a battle healer who utilizes her own life force.",
    achievementName: "Horns, Feathers, and Gold",
    achievementDescription:
      "Heal yourself or allies for a total of 25,000 health.",
    image: Hero_Aurena,
    constellations: [],
  },
} as const;

/* eslint-enable unicorn/no-null */

export type Traveler = NonNullable<ReturnType<typeof getTravelerById>>;

export const getTravelerById = (id: string) => {
  if (id in travelers) {
    const travelerId = id as keyof typeof travelers;
    return {
      id: travelerId,
      ...travelers[travelerId],
    };
  }
};

export const getTravelers = () =>
  Object.entries(travelers).map(([id, traveler]) => ({
    id: id as keyof typeof travelers,
    ...traveler,
  }));

export const getTravelerIds = () => Object.keys(travelers) as Traveler["id"][];

export const generateTravelerStats = (
  traveler: Pick<
    Traveler,
    | "health"
    | "armor"
    | "attackDamage"
    | "abilityPower"
    | "attackSpeed"
    | "memoryHaste"
    | "criticalStrikeChance"
    | "movementSpeed"
    | "statsGrowthPerLv"
  >,
  options?: { hideSecondaryStats: boolean },
) => [
  {
    ...sprites.health,
    value: traveler.health,
    statGrowth: traveler.statsGrowthPerLv.health,
  },
  {
    ...sprites.armor,
    value: traveler.armor,
    statGrowth: traveler.statsGrowthPerLv.armor,
  },
  {
    ...sprites.attackDamage,
    value: traveler.attackDamage,
    statGrowth: traveler.statsGrowthPerLv.attackDamage,
  },
  {
    ...sprites.abilityPower,
    value: traveler.abilityPower,
    statGrowth: traveler.statsGrowthPerLv.abilityPower,
  },
  {
    ...sprites.attackSpeed,
    value: traveler.attackSpeed.toFixed(2),
    statGrowth: traveler.statsGrowthPerLv.attackSpeed,
  },
  ...(options?.hideSecondaryStats
    ? []
    : [
        {
          ...sprites.memoryHaste,
          value: traveler.memoryHaste,
          statGrowth: traveler.statsGrowthPerLv.memoryHaste,
        },
        {
          id: "critChance",
          name: "Critical Strike Chance",
          image: texCrit,
          value: traveler.criticalStrikeChance,
          statGrowth: traveler.statsGrowthPerLv.criticalStrikeChance,
        },
      ]),
  {
    id: "movementSpeed",
    name: "Movement Speed",
    image: texMovement,
    value: traveler.movementSpeed,
    statGrowth: traveler.statsGrowthPerLv.movementSpeed,
  },
];
