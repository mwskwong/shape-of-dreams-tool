/* eslint-disable unicorn/no-null */

import { type ThemeProps } from "@radix-ui/themes/components/theme";

import Hero_Aurena from "@/images/Hero_Aurena.png";
import Hero_Lacerta from "@/images/Hero_Lacerta.png";
import Hero_Mist from "@/images/Hero_Mist.png";
import Hero_Vesper from "@/images/Hero_Vesper.png";
import Hero_Yubar from "@/images/Hero_Yubar.png";
import Star_Lacerta_AttackRange from "@/images/Star_Lacerta_AttackRange.png";
import Star_Lacerta_AttackSpeed from "@/images/Star_Lacerta_AttackSpeed.png";
import Star_Lacerta_FireAmp from "@/images/Star_Lacerta_FireAmp.png";
import Star_Lacerta_HandCannon from "@/images/Star_Lacerta_HandCannon.png";
import Star_Lacerta_IncendiaryRounds from "@/images/Star_Lacerta_IncendiaryRounds.png";
import Star_Lacerta_PrecisionShot from "@/images/Star_Lacerta_PrecisionShot.png";
import Star_Lacerta_QuickTrigger from "@/images/Star_Lacerta_QuickTrigger.png";
import Star_Mist_AddAttackDamage from "@/images/Star_Mist_AddAttackDamage.png";
import Star_Mist_AddDodgeCharge from "@/images/Star_Mist_AddDodgeCharge.png";
import Star_Mist_LightningFleche from "@/images/Star_Mist_LightningFleche.png";
import Star_Mist_LongerLunge from "@/images/Star_Mist_LongerLunge.png";
import Star_Mist_MovementSpeed from "@/images/Star_Mist_MovementSpeed.png";
import Star_Mist_ParryAllDirections from "@/images/Star_Mist_ParryAllDirections.png";
import Star_Mist_UnbreakableDeterminationHeal from "@/images/Star_Mist_UnbreakableDeterminationHeal.png";
import Star_Yubar_AbilityPower from "@/images/Star_Yubar_AbilityPower.png";
import Star_Yubar_EtherealInfluenceCooldownReduction from "@/images/Star_Yubar_EtherealInfluenceCooldownReduction.png";
import Star_Yubar_IncreaseFlickerRange from "@/images/Star_Yubar_IncreaseFlickerRange.png";
import Star_Yubar_SkillHaste from "@/images/Star_Yubar_SkillHaste.png";
import Star_Yubar_StrongerCataclysm from "@/images/Star_Yubar_StrongerCataclysm.png";
import Star_Yubar_StrongerSuperNova from "@/images/Star_Yubar_StrongerSuperNova.png";
import Star_Yubar_TranquilityDamage from "@/images/Star_Yubar_TranquilityDamage.png";
import iconAttacker from "@/images/iconAttacker.png";
import iconSpellCaster from "@/images/iconSpellCaster.png";
import iconSupporter from "@/images/iconSupporter.png";
import iconTank from "@/images/iconTank.png";
import texCrit from "@/images/texCrit.png";
import texMovement from "@/images/texMovement.png";
import iconStyles from "@/styles/icons.module.css";

import { sprites } from "./sprites";

const getTravelerClassIcon = (travelerClass: string) => {
  if (travelerClass.toLowerCase().includes("attacker")) return iconAttacker;
  if (travelerClass.toLowerCase().includes("mage")) return iconSpellCaster;
  if (travelerClass.toLowerCase().includes("tank")) return iconTank;
  if (travelerClass.toLowerCase().includes("support")) return iconSupporter;
};

const travelers = {
  Hero_Lacerta: {
    name: "Lacerta",
    difficulty: "Easy",
    class: "Ranged Attacker",
    get classIcon() {
      return getTravelerClassIcon(this.class);
    },
    color: "orange" as const satisfies ThemeProps["accentColor"],
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
    constellations: [
      {
        name: "Aimed Shot I/II/III",
        description:
          "Lacerta's <color=yellow>Attack Speed</color> is increased by 5/12/20%.",
        image: Star_Lacerta_AttackSpeed,
      },
      {
        name: "Breath of Barasas I/II/III",
        description:
          "Increase the <color=yellow>Burn</color> damage over time dealt by Lacerta by 10/20/40%.",
        image: Star_Lacerta_FireAmp,
      },
      {
        name: "Sixth Sense",
        description:
          "Lacerta's <color=yellow>Attack Range</color> is increased by 1.",
        image: Star_Lacerta_AttackRange,
      },
      {
        name: "Smokeless Powder",
        description:
          "Increases <color=yellow>Hand Cannon</color>'s damage by 30% and slows enemies by 50% for 1.5 seconds.",
        image: Star_Lacerta_HandCannon,
      },
      {
        name: "Incendiary Rounds",
        description:
          "Increases the number of shots fire by<color=yellow>Incendiary Rounds</color> by 1.",
        image: Star_Lacerta_IncendiaryRounds,
      },
      {
        name: "Hair Trigger",
        description:
          "<color=yellow>Quick Draw</color> charges are restored all at once.",
        image: Star_Lacerta_QuickTrigger,
      },
      {
        name: "Composure and Focus",
        description:
          "Increases <color=yellow>Precision Shot</color>'s charge speed by 40%.",
        image: Star_Lacerta_PrecisionShot,
      },
    ],
  },
  Hero_Mist: {
    name: "Mist",
    difficulty: "Hard",
    class: "Melee Attacker",
    get classIcon() {
      return getTravelerClassIcon(this.class);
    },
    color: "mint" as const satisfies ThemeProps["accentColor"],
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
    constellations: [
      {
        name: "Astrid's Forging I/II/III",
        description:
          "<color=yellow>Attack Damage</color> is increased by 3/6/12%.",
        image: Star_Mist_AddAttackDamage,
      },
      {
        name: "Nimble Body I/II/III",
        description:
          "Increases <color=yellow>Movement Speed</color> by 5/7/9%.",
        image: Star_Mist_MovementSpeed,
      },
      {
        name: "Exceptional Agility",
        description:
          "Increases the maximum number of <color=yellow>Dodge</color> charges by 1.",
        image: Star_Mist_AddDodgeCharge,
      },
      {
        name: "West Wind",
        description:
          "Increases <color=yellow>Lunge</color>'s maximum dash distance by 33%.",
        image: Star_Mist_LongerLunge,
      },
      {
        name: "Lightning Breath",
        description:
          "<color=yellow>Flèche</color> now teleports instead of dashing, and deals Light Damage.",
        image: Star_Mist_LightningFleche,
      },
      {
        name: "Two Hearts",
        description:
          "When casting <color=yellow>Unbreakable Determination</color>, recover 25% of missing health.",
        image: Star_Mist_UnbreakableDeterminationHeal,
      },
      {
        name: "The Best Offense is Defense",
        description:
          "<color=yellow>Parry</color> can now deflect attacks from all directions.",
        image: Star_Mist_ParryAllDirections,
      },
    ],
  },
  Hero_Yubar: {
    name: "Yubar",
    difficulty: "Medium",
    class: "Ranged Mage",
    get classIcon() {
      return getTravelerClassIcon(this.class);
    },
    color: "ruby" as const satisfies ThemeProps["accentColor"],
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
    constellations: [
      {
        name: "Night Sky Silk I/II/III",
        description:
          "Increases <color=yellow>Ability Power</color> by 5/10/15%.",
        image: Star_Yubar_AbilityPower,
      },
      {
        name: "Stellar Flow I/II/III",
        description:
          "<color=yellow>Memory Haste</color> is increased by 3/7/12 reducing the cooldown of all my memories by 3/7/11%.",
        image: Star_Yubar_SkillHaste,
      },
      {
        name: "Now You See Me",
        description:
          "Increases the maximum travel distance of <color=yellow>Flicker</color> by 35%.",
        image: Star_Yubar_IncreaseFlickerRange,
      },
      {
        name: "Neutron Star",
        description:
          "<color=yellow>Ethereal Influence</color>'s cooldown is reduced by 5% for each enemy hit by the explosion.",
        image: Star_Yubar_EtherealInfluenceCooldownReduction,
      },
      {
        name: "Young Stars's Power",
        description:
          "Increase <color=yellow>Supernova</color>'s size by 20% and stuns enemies for 1 second.",
        image: Star_Yubar_StrongerSuperNova,
      },
      {
        name: "Blazing Meteor",
        description:
          "<color=yellow>Cataclysm</color>'s meteors scorch the ground, dealing <sprite=1><color=#16D7FF>175%</color> Light Damage over 2 seconds.",
        image: Star_Yubar_StrongerCataclysm,
      },
      {
        name: "Light Heart",
        description:
          "When channeling <color=yellow>Tranquility</color>, deals <sprite=1><color=#16D7FF>165%</color> damage to all colliding enemies and briefly stun them.",
        image: Star_Yubar_TranquilityDamage,
      },
    ],
  },
  Hero_Vesper: {
    name: "Vesper",
    difficulty: "Medium",
    class: "Melee Tank",
    get classIcon() {
      return getTravelerClassIcon(this.class);
    },
    color: "amber" as const satisfies ThemeProps["accentColor"],
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
    color: "yellow" as const satisfies ThemeProps["accentColor"],
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
};

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
          iconClassName: iconStyles.critIcon,
        },
      ]),
  {
    id: "movementSpeed",
    name: "Movement Speed",
    image: texMovement,
    value: traveler.movementSpeed,
    statGrowth: traveler.statsGrowthPerLv.movementSpeed,
    iconClassName: iconStyles.movementSpeedIcon,
  },
];
