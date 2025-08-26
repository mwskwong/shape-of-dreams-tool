/* eslint-disable unicorn/no-null */

import Gem_C_Charcoal from "@/images/Gem_C_Charcoal.png";
import Gem_C_Confidence from "@/images/Gem_C_Confidence.png";
import Gem_C_Efficiency from "@/images/Gem_C_Efficiency.png";
import Gem_C_Guidance from "@/images/Gem_C_Guidance.png";
import Gem_C_Lethality from "@/images/Gem_C_Lethality.png";
import Gem_C_Quicksilver from "@/images/Gem_C_Quicksilver.png";
import Gem_C_Regeneration from "@/images/Gem_C_Regeneration.png";
import Gem_C_Sharp from "@/images/Gem_C_Sharp.png";
import Gem_C_Shatter from "@/images/Gem_C_Shatter.png";
import Gem_C_Sulfur from "@/images/Gem_C_Sulfur.png";
import Gem_C_Talc from "@/images/Gem_C_Talc.png";
import Gem_C_Vengeance from "@/images/Gem_C_Vengeance.png";
import Gem_C_Void from "@/images/Gem_C_Void.png";
import Gem_C_Wind from "@/images/Gem_C_Wind.png";
import Gem_E_Clemency from "@/images/Gem_E_Clemency.png";
import Gem_E_Direness from "@/images/Gem_E_Direness.png";
import Gem_E_Fever from "@/images/Gem_E_Fever.png";
import Gem_E_Flexibility from "@/images/Gem_E_Flexibility.png";
import Gem_E_Insight from "@/images/Gem_E_Insight.png";
import Gem_E_Metal from "@/images/Gem_E_Metal.png";
import Gem_E_Might from "@/images/Gem_E_Might.png";
import Gem_E_Omega from "@/images/Gem_E_Omega.png";
import Gem_E_Overload from "@/images/Gem_E_Overload.png";
import Gem_E_Pain from "@/images/Gem_E_Pain.png";
import Gem_E_Predation from "@/images/Gem_E_Predation.png";
import Gem_E_Protection from "@/images/Gem_E_Protection.png";
import Gem_E_Thunder from "@/images/Gem_E_Thunder.png";
import Gem_E_Twilight from "@/images/Gem_E_Twilight.png";
import Gem_E_Virtuousness from "@/images/Gem_E_Virtuousness.png";
import Gem_L_DivineFaith from "@/images/Gem_L_DivineFaith.png";
import Gem_L_Embertail from "@/images/Gem_L_Embertail.png";
import Gem_L_GlacialCore from "@/images/Gem_L_GlacialCore.png";
import Gem_L_Paranoia from "@/images/Gem_L_Paranoia.png";
import Gem_L_Perfect from "@/images/Gem_L_Perfect.png";
import Gem_L_PureWhite from "@/images/Gem_L_PureWhite.png";
import Gem_L_SolarEye from "@/images/Gem_L_SolarEye.png";
import Gem_R_Blade from "@/images/Gem_R_Blade.png";
import Gem_R_Bleak from "@/images/Gem_R_Bleak.png";
import Gem_R_Celestial from "@/images/Gem_R_Celestial.png";
import Gem_R_Contempt from "@/images/Gem_R_Contempt.png";
import Gem_R_Dusk from "@/images/Gem_R_Dusk.png";
import Gem_R_Flow from "@/images/Gem_R_Flow.png";
import Gem_R_Frost from "@/images/Gem_R_Frost.png";
import Gem_R_Glaciate from "@/images/Gem_R_Glaciate.png";
import Gem_R_Insatiable from "@/images/Gem_R_Insatiable.png";
import Gem_R_Momentum from "@/images/Gem_R_Momentum.png";
import Gem_R_NightSky from "@/images/Gem_R_NightSky.png";
import Gem_R_Rigidity from "@/images/Gem_R_Rigidity.png";
import Gem_R_Scorched from "@/images/Gem_R_Scorched.png";
import Gem_R_Spiral from "@/images/Gem_R_Spiral.png";
import Gem_R_Wealth from "@/images/Gem_R_Wealth.png";
import Gem_R_Wound from "@/images/Gem_R_Wound.png";

import { compareRarities, getItemBasicScaling } from "./utils";

const essences = {
  Gem_C_Charcoal: {
    name: "Essence of Charcoal",
    rawDesc:
      "When this memory <color=yellow>hits</color> an enemy, it fires a charcoal fragment, dealing {0} <color=yellow>damage</color>. If the target is already <color=yellow>burning</color>, it deals {1} <color=yellow>fire damage</color> instead.",
    rawDescVars: [
      {
        rendered: "<sprite=1><color=#16D7FF>60%</color><sprite=5>",
        format: "#,##0",
        raw: "normalDamage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0.3,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "<sprite=1><color=#16D7FF>100%</color><sprite=5>",
        format: "#,##0",
        raw: "fireDamage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0.5,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Common",
    image: Gem_C_Charcoal,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Confidence: {
    name: "Essence of Confidence",
    rawDesc:
      "Damage dealt by this memory to nearby enemies is increased by {0}.",
    rawDescVars: [
      {
        rendered: "40%<sprite=5>",
        format: "#,##0%",
        raw: "dmgAmp",
        scalingType: "basic",
        data: {
          basicConstant: 0.2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Common",
    image: Gem_C_Confidence,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Efficiency: {
    name: "Essence of Efficiency",
    rawDesc:
      "This Memory gains {0} <color=yellow>Memory Haste</color>, reducing its <color=yellow>Cooldown</color> by {1}.",
    rawDescVars: [
      {
        rendered: "36<sprite=5>",
        format: "#,##0",
        raw: "skillHaste",
        scalingType: "basic",
        data: {
          basicConstant: 18,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "26%<sprite=5>",
        format: "#,##0%",
        raw: "reducedRatio",
        scalingType: (quality: number) =>
          1 - 1 / (1 + 18 * (1 + 0.01 * quality) * 0.01),
        data: null,
      },
    ],
    rarity: "Common",
    image: Gem_C_Efficiency,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Guidance: {
    name: "Essence of Guidance",
    rawDesc:
      "This Memory's <color=yellow>Healing Amount</color> is increased by {0}. {1} of the excess healing from this Memory is converted into a <color=yellow>Barrier</color> that lasts for {2} seconds.",
    rawDescVars: [
      {
        rendered: "40%<sprite=5>",
        format: "#,##0%",
        raw: "healAmp",
        scalingType: "basic",
        data: {
          basicConstant: 0.2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "30%",
        format: "#,##0%",
        raw: "shieldRatio",
        scalingType: "basic",
        data: {
          basicConstant: 0.3,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "2",
        format: "#,##0.#",
        raw: "shieldDuration",
        scalingType: "basic",
        data: {
          basicConstant: 2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Common",
    image: Gem_C_Guidance,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Lethality: {
    name: "Essence of Lethality",
    rawDesc:
      "This memory's damage against enemies with {0} or more health is increased by {1}.",
    rawDescVars: [
      {
        rendered: "70%",
        format: "#,##0%",
        raw: "healthThreshold",
        scalingType: "basic",
        data: {
          basicConstant: 0.7,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "60%<sprite=5>",
        format: "#,##0%",
        raw: "dmgAmp",
        scalingType: "basic",
        data: {
          basicConstant: 0.3,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Common",
    image: Gem_C_Lethality,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Quicksilver: {
    name: "Essence of Quicksilver",
    rawDesc:
      "When <color=yellow>casting</color> this memory or dealing <color=yellow>fire damage</color> with it, <color=yellow>movement speed</color> increases by {0} and returns to normal over {1} seconds.",
    rawDescVars: [
      {
        rendered: "30%<sprite=5>",
        format: String.raw`#,##0\%`,
        raw: "speedAmount",
        scalingType: "basic",
        data: {
          basicConstant: 20,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.005,
        },
      },
      {
        rendered: "2.5",
        format: "#,##0.#",
        raw: "duration",
        scalingType: "basic",
        data: {
          basicConstant: 2.5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Common",
    image: Gem_C_Quicksilver,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Regeneration: {
    name: "Essence of Regeneration",
    rawDesc:
      "If this memory is <color=yellow>Cast</color> <color=yellow>in Combat</color>, it <color=yellow>Restores</color> your health by {0} over {1} seconds.",
    rawDescVars: [
      {
        rendered: "41<sprite=5>",
        format: "#,##0",
        raw: "healPerTick * totalTicks",
        scalingType: "unknown",
        data: null,
      },
      {
        rendered: "7",
        format: "#,##0.#",
        raw: "totalTicks*tickInterval",
        scalingType: (quality: number) => 2 * (1 + 0.01 * quality * 0.45) * 14,
        data: null,
      },
    ],
    rarity: "Common",
    image: Gem_C_Regeneration,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Sharp: {
    name: "Essence of Sharpness",
    rawDesc:
      "<color=yellow>Casting</color> this memory fires {0} arrows that deal {1} <color=yellow>damage</color> to random enemies.",
    rawDescVars: [
      {
        rendered: "5",
        format: "#,##0",
        raw: "shotArrows",
        scalingType: "basic",
        data: {
          basicConstant: 5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "<sprite=1><color=#16D7FF>90%</color><sprite=5>",
        format: "#,##0",
        raw: "arrowDamage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0.45,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Common",
    image: Gem_C_Sharp,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Shatter: {
    name: "Essence of Shatter",
    rawDesc:
      "Every {0} seconds, the <color=yellow>Cast</color> of this Memory is <color=yellow>Empowered</color>. Damage dealt to enemies by <color=yellow>Empowered Cast</color> is increased by {1}. If it deals <color=yellow>Light Damage</color>, it is increased by {2} instead.",
    rawDescVars: [
      {
        rendered: "10",
        format: "#,##0.#",
        raw: "cooldownTime",
        scalingType: "basic",
        data: {
          basicConstant: 10,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "40%<sprite=5>",
        format: "#,##0%",
        raw: "dmgAmp",
        scalingType: "basic",
        data: {
          basicConstant: 0.2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "72%<sprite=5>",
        format: "#,##0%",
        raw: "dmgAmpLight",
        scalingType: "basic",
        data: {
          basicConstant: 0.36,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Common",
    image: Gem_C_Shatter,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Talc: {
    name: "Essence of Talc",
    rawDesc:
      "Every {0} seconds, the <color=yellow>Cast</color> of this Memory is <color=yellow>Empowered</color>. The initial damage dealt to each enemy by <color=yellow>Empowered Cast</color> is increased by {1}.",
    rawDescVars: [
      {
        rendered: "10",
        format: "#,##0.#",
        raw: "cooldownTime",
        scalingType: "basic",
        data: {
          basicConstant: 10,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "<sprite=1><color=#16D7FF>480%</color><sprite=5>",
        format: "#,##0",
        raw: "addedDamage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 2.4,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Common",
    image: Gem_C_Talc,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Void: {
    name: "Essence of the Void",
    rawDesc:
      "After casting this memory, your next <color=yellow>attack</color> within {0} seconds will explode, dealing {1} <color=yellow>dark damage</color> to the target and nearby enemies.",
    rawDescVars: [
      {
        rendered: "4",
        format: "#,##0",
        raw: "maxDuration",
        scalingType: "basic",
        data: {
          basicConstant: 4,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "<sprite=2><color=#FF8A2D>250%</color><sprite=5>",
        format: "#,##0",
        raw: "damage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0,
          basicAD: 1.25,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Common",
    image: Gem_C_Void,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Wind: {
    name: "Essence of Wind",
    rawDesc:
      "Casting this memory increases <color=yellow>Attack Speed</color> by {0} for {1} seconds.",
    rawDescVars: [
      {
        rendered: "33%<sprite=5>",
        format: String.raw`#,##0\%`,
        raw: "hasteAmount",
        scalingType: "basic",
        data: {
          basicConstant: 22,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.005,
        },
      },
      {
        rendered: "5",
        format: "#,##0",
        raw: "duration",
        scalingType: "basic",
        data: {
          basicConstant: 5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Common",
    image: Gem_C_Wind,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Clemency: {
    name: "Essence of Clemency",
    rawDesc:
      "Heal <color=yellow>self</color> for {0} of the <color=yellow>damage</color> dealt by this Memory.",
    rawDescVars: [
      {
        rendered: "7%<sprite=5>",
        format: "#,##0%",
        raw: "conversionRatio",
        scalingType: "basic",
        data: {
          basicConstant: 0.05,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.005,
        },
      },
    ],
    rarity: "Epic",
    image: Gem_E_Clemency,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Direness: {
    name: "Essence of Direness",
    rawDesc:
      "The lower my <color=yellow>Health</color>, the shorter the <color=yellow>Cooldown</color> of this Memory. When my <color=yellow>Health</color> is at {0}, the <color=yellow>Cooldown</color> is reduced by up to {1}.",
    rawDescVars: [
      {
        rendered: "30%",
        format: "#,##0%",
        raw: "maxAbilityHasteHpThreshold",
        scalingType: "basic",
        data: {
          basicConstant: 0.3,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "55%<sprite=5>",
        format: "#,##0%",
        raw: "maxReducedRatio",
        scalingType: (quality: number) =>
          1 - 1 / (1 + 55 * (1 + 0.01 * 1.25 * quality) * 0.01),
        data: null,
      },
    ],
    rarity: "Epic",
    image: Gem_E_Direness,
    achievementName: "Desperate Hero",
    achievementDescription:
      "Defeat 30 enemies in a row while your health is below 40%.",
  },
  Gem_E_Insight: {
    name: "Essence of Insight",
    rawDesc:
      "When this Memory deals any <color=yellow>damage</color> to an enemy, it deals an additional {0} <color=yellow>Light Damage</color> to up to {1} enemies and increases <color=yellow>Memory Haste</color> by {2} for {3} seconds. Can only trigger once every {4} seconds.",
    rawDescVars: [
      {
        rendered: "<sprite=1><color=#16D7FF>200%</color><sprite=5>",
        format: "#,##0",
        raw: "damage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 1,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "3<sprite=5>",
        format: "#,##0",
        raw: "maxHitCount",
        scalingType: "basic",
        data: {
          basicConstant: 2.5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.0025,
        },
      },
      {
        rendered: "20<sprite=5>",
        format: "#,##0",
        raw: "gainedAbilityHaste",
        scalingType: "basic",
        data: {
          basicConstant: 10,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "5",
        format: "#,##0.#",
        raw: "duration",
        scalingType: "basic",
        data: {
          basicConstant: 5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "3",
        format: "#,##0.#",
        raw: "cooldownTime",
        scalingType: "basic",
        data: {
          basicConstant: 3,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Epic",
    image: Gem_E_Insight,
    achievementName: "Ultra Rapid Fire",
    achievementDescription: "Cast 12 Memories within 8 seconds.",
  },
  Gem_E_Metal: {
    name: "Essence of Metal",
    rawDesc:
      "When you <color=yellow>Slay</color> an enemy, the <color=yellow>Cooldown</color> of the Memory is <color=yellow>reduced</color> by {0} seconds.",
    rawDescVars: [
      {
        rendered: "1<sprite=5>",
        format: "#,##0.#",
        raw: "cooldownReduction",
        scalingType: "basic",
        data: {
          basicConstant: 0.5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Epic",
    image: Gem_E_Metal,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Pain: {
    name: "Essence of Pain",
    rawDesc:
      "All <color=yellow>Damage</color> dealt by this Memory deals {0} <color=yellow>Area Damage</color> around the target. This <color=yellow>Area Damage</color> shares the elemental type with the original damage.",
    rawDescVars: [
      {
        rendered: "40%<sprite=5>",
        format: "#,##0%",
        raw: "damageRatio",
        scalingType: "basic",
        data: {
          basicConstant: 0.2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Epic",
    image: Gem_E_Pain,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Predation: {
    name: "Essence of Predation",
    rawDesc:
      "This Memory deals {0} increased damage to <color=yellow>Boss</color> and <color=yellow>Hunter</color> enemies. Defeating a <color=yellow>Hunter</color> drops {1} <color=yellow>Orb of Power</color>, while defeating a <color=yellow>Boss</color> drops {2}. When you collect an <color=yellow>Orb of Power</color>, either <color=yellow>Attack Damage</color> or <color=yellow>Ability Power</color> permanently increases by 1 at random.",
    rawDescVars: [
      {
        rendered: "60%<sprite=5>",
        format: "#,##0%",
        raw: "amp",
        scalingType: "basic",
        data: {
          basicConstant: 0.3,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "1",
        format: "#,##0",
        raw: "addedAp",
        scalingType: "basic",
        data: {
          basicConstant: 1,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "3",
        format: "#,##0",
        raw: "addedAp*bossMultiplier",
        scalingType: "unknown",
        data: null,
      },
    ],
    rarity: "Epic",
    image: Gem_E_Predation,
    achievementName: "Who's the Prey Now",
    achievementDescription: "Defeat the Hunter 70 times.",
  },
  Gem_E_Thunder: {
    name: "Essence of Thunder",
    rawDesc:
      "When you <color=yellow>Cast</color> <color=yellow>another Memory</color> or use <color=yellow>Dodge</color>, gain 1 stack of <color=yellow>Thunder</color>, up to {0} times. When you <color=yellow>Cast</color> this Memory, consume all stacks of <color=yellow>Thunder</color> to call down lightning on nearby enemies, once for each stack. Each lightning deals {1} <color=yellow>Light Damage</color>.",
    rawDescVars: [
      {
        rendered: "7<sprite=5>",
        format: "#,##0",
        raw: "maxCharge",
        scalingType: "basic",
        data: {
          basicConstant: 5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.004,
        },
      },
      {
        rendered: "<sprite=1><color=#16D7FF>117%</color><sprite=5>",
        format: "#,##0",
        raw: "damage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0.65,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.008,
        },
      },
    ],
    rarity: "Epic",
    image: Gem_E_Thunder,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Twilight: {
    name: "Essence of Twilight",
    rawDesc:
      "Your <color=yellow>Basic Attacks</color> are converted to <color=yellow>Dark Damage</color>. When this Memory deals damage to an enemy with {0} or more <color=yellow>Dark Stacks</color>, consumes all stacks to deal {1} <color=yellow>Damage</color> per stack and <color=yellow>Heal</color> for {2} per stack.",
    rawDescVars: [
      {
        rendered: "3",
        format: "#,##0",
        raw: "minStack",
        scalingType: "basic",
        data: {
          basicConstant: 3,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "<sprite=1><color=#16D7FF>54%</color><sprite=5>",
        format: "#,##0",
        raw: "dmgPerStack",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0.27,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "6<sprite=5>",
        format: "#,##0",
        raw: "healPerStack",
        scalingType: "basic",
        data: {
          basicConstant: 4,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.005,
        },
      },
    ],
    rarity: "Epic",
    image: Gem_E_Twilight,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Virtuousness: {
    name: "Essence of Virtue",
    rawDesc:
      "The number of charges for this Memory increases by {0}. Each {1} increase in quality raises the number of charges by 1.",
    rawDescVars: [
      {
        rendered: "1<sprite=5>",
        format: "#,##0",
        raw: "addedChargeInt",
        scalingType: "unknown",
        data: null,
      },
      {
        rendered: "150%",
        format: String.raw`#,##0\%`,
        raw: "requiredQualityPerCharge",
        scalingType: "basic",
        data: {
          basicConstant: 150,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Epic",
    image: Gem_E_Virtuousness,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_L_Embertail: {
    name: "Embertail",
    rawDesc:
      "My <color=yellow>Attacks</color> ricochet to deal {0} <color=yellow>Fire Damage</color> to a nearby enemy. For each nearby enemy engulfed in flames, this memory's <color=yellow>Damage</color> and <color=yellow>Healing</color> are increased by {1} and its <color=yellow>Cooldown</color> is reduced {2} faster. My fire damage over time is increased by {3}.",
    rawDescVars: [
      {
        rendered: "<sprite=1><color=#16D7FF>100%</color><sprite=5>",
        format: "#,##0",
        raw: "damage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0.5,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "8%<sprite=5>",
        format: "#,##0%",
        raw: "ampPerBurning",
        scalingType: "basic",
        data: {
          basicConstant: 0.04,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "8%<sprite=5>",
        format: String.raw`#,##0\%`,
        raw: "skillHastePerBurning",
        scalingType: "basic",
        data: {
          basicConstant: 4,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "100%",
        format: "#,##0%",
        raw: "statBonus.fireEffectAmpFlat",
        scalingType: "unknown",
        data: null,
      },
    ],
    rarity: "Legendary",
    image: Gem_L_Embertail,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_L_GlacialCore: {
    name: "Glacial Core",
    rawDesc:
      "Every {0} seconds, if you deal <color=yellow>damage</color> with this memory, you <color=yellow>recover</color> <color=yellow>health</color> equal to {1} of your maximum health. If it is <color=yellow>cold damage</color>, the effect is increased by {2}. {3} of all <color=yellow>health recovery</color> you receive is converted into <color=yellow>cold damage</color> and fires <color=yellow>ice shards</color> at enemies.",
    rawDescVars: [
      {
        rendered: "5",
        format: "#,##0.#",
        raw: "cooldownTime",
        scalingType: "basic",
        data: {
          basicConstant: 5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "3.6%<sprite=5>",
        format: "#,##0.#%",
        raw: "healMaxHealthRatio",
        scalingType: "basic",
        data: {
          basicConstant: 0.03,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.002,
        },
      },
      {
        rendered: "100%",
        format: "#,##0%",
        raw: "chillAmp",
        scalingType: "basic",
        data: {
          basicConstant: 1,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "272%<sprite=5>",
        format: "#,##0%",
        raw: "healToDamageRatio",
        scalingType: "basic",
        data: {
          basicConstant: 2.5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.000_89,
        },
      },
    ],
    rarity: "Legendary",
    image: Gem_L_GlacialCore,
    achievementName: "Frozen Heart",
    achievementDescription:
      "Defeat the King of the Snowy Mountains, the boss of the second region, for the first time.",
  },
  Gem_L_Paranoia: {
    name: "Essence of Paranoia",
    rawDesc:
      "When you take any <color=yellow>damage</color>, this Memory gains {0} <color=yellow>Memory Haste</color> for {1} seconds, reducing its <color=yellow>Cooldown</color> by {2}, but it is <color=yellow>Automatically Cast</color> on nearby enemies.",
    rawDescVars: [
      {
        rendered: "150<sprite=5>",
        format: "#,##0",
        raw: "skillHaste",
        scalingType: "basic",
        data: {
          basicConstant: 75,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "6",
        format: "#,##0",
        raw: "duration",
        scalingType: "basic",
        data: {
          basicConstant: 6,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "60%<sprite=5>",
        format: "#,##0%",
        raw: "reducedRatio",
        scalingType: (quality: number) =>
          1 - 1 / (1 + 75 * (1 + 0.01 * quality) * 0.01),
        data: null,
      },
    ],
    rarity: "Legendary",
    image: Gem_L_Paranoia,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_L_Perfect: {
    name: "Perfection",
    rawDesc:
      "Increases Attack Damage by {0}, Ability Power by {1}, maximum Health by {2}, Attack Speed by {3}, Critical Strike Chance by {4}, and Memory Haste by {5}.",
    rawDescVars: [
      {
        rendered: "7<sprite=5>",
        format: "#,##0",
        raw: "adAmount",
        scalingType: "basic",
        data: {
          basicConstant: 3.5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "7<sprite=5>",
        format: "#,##0",
        raw: "apAmount",
        scalingType: "basic",
        data: {
          basicConstant: 3.5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "35<sprite=5>",
        format: "#,##0",
        raw: "healthAmount",
        scalingType: "basic",
        data: {
          basicConstant: 17.5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "10%<sprite=5>",
        format: String.raw`#,##0\%`,
        raw: "attackSpeedAmount",
        scalingType: "basic",
        data: {
          basicConstant: 5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "6%<sprite=5>",
        format: "#,##0%",
        raw: "criticalChanceAmount",
        scalingType: "basic",
        data: {
          basicConstant: 0.03,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "10<sprite=5>",
        format: "#,##0",
        raw: "skillHasteAmount",
        scalingType: "basic",
        data: {
          basicConstant: 5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Legendary",
    image: Gem_L_Perfect,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Blade: {
    name: "Essence of Blade",
    rawDesc:
      "Each time this memory <color=yellow>hits</color> an enemy, it summons blades that lacerate the target for {0} damage {1} times. Can only trigger once every {2} seconds for each enemy.",
    rawDescVars: [
      {
        rendered: "<sprite=2><color=#FF8A2D>58%</color><sprite=5>",
        format: "#,##0",
        raw: "dmgFactor",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0,
          basicAD: 0.55,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.0005,
        },
      },
      {
        rendered: "3<sprite=5>",
        format: "#,##0",
        raw: "baseCount",
        scalingType: "basic",
        data: {
          basicConstant: 2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.005,
        },
      },
      {
        rendered: "2",
        format: "#,##0.#",
        raw: "perEnemyCooldown",
        scalingType: "basic",
        data: {
          basicConstant: 2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_Blade,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Celestial: {
    name: "Essence of the Celestial",
    rawDesc:
      "Every {0} seconds, this Memory's <color=yellow>Cast</color> is <color=yellow>Empowered</color>. When an <color=yellow>Empowered Cast</color> hits an enemy for the first time, it drops {1} meteors that deal {2} <color=yellow>Light Damage</color> each.",
    rawDescVars: [
      {
        rendered: "10",
        format: "#,##0.#",
        raw: "cooldownTime",
        scalingType: "basic",
        data: {
          basicConstant: 10,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "4",
        format: "#,##0",
        raw: "stars",
        scalingType: "basic",
        data: {
          basicConstant: 4,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "<sprite=1><color=#16D7FF>130%</color><sprite=5>",
        format: "#,##0",
        raw: "starDamage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0.65,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_Celestial,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Dusk: {
    name: "Essence of Dusk",
    rawDesc:
      "Upon casting this Memory, fire {0} <color=yellow>Dusk Shards</color> that deal {1} <color=yellow>Dark Damage</color> each time you <color=yellow>Attack</color> an enemy for {2} seconds.",
    rawDescVars: [
      {
        rendered: "2",
        format: "#,##0",
        raw: "shootCount",
        scalingType: "basic",
        data: {
          basicConstant: 2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "<sprite=2><color=#FF8A2D>50%</color><sprite=5>",
        format: "#,##0",
        raw: "damage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0,
          basicAD: 0.25,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "5",
        format: "#,##0",
        raw: "empowerDuration",
        scalingType: "basic",
        data: {
          basicConstant: 5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_Dusk,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Flow: {
    name: "Essence of Flow",
    rawDesc:
      "When dealing <color=yellow>Light Damage</color> with any memory, reduces this memory's <color=yellow>Cooldown</color> by {0}. For ultimate abilities, only {1} of the effect is applied. <color=yellow>Cooldown Reduction</color> effects this memory receives also apply to equipped <color=yellow>Essences</color>.",
    rawDescVars: [
      {
        rendered: "6%<sprite=5>",
        format: "#,##0%",
        raw: "reduceRatio",
        scalingType: "basic",
        data: {
          basicConstant: 0.04,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.005,
        },
      },
      {
        rendered: "40%",
        format: "#,##0%",
        raw: "ultRatio",
        scalingType: "basic",
        data: {
          basicConstant: 0.4,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_Flow,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Frost: {
    name: "Essence of Frost",
    rawDesc:
      "When this memory deals <color=yellow>Cold Damage</color>, it deals additional <color=yellow>Cold Damage</color> equal to {0} of your <color=yellow>Maximum Health</color> and briefly <color=yellow>Stuns</color> them. Can only trigger once every {1} seconds per enemy. Each time this triggers, permanently increase your <color=yellow>Maximum Health</color> by {2}.",
    rawDescVars: [
      {
        rendered: "10%<sprite=5>",
        format: "#,##0%",
        raw: "damageRatio",
        scalingType: "basic",
        data: {
          basicConstant: 0.07,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.004,
        },
      },
      {
        rendered: "5",
        format: "#,##0.#",
        raw: "perEnemyCooldown",
        scalingType: "basic",
        data: {
          basicConstant: 5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "1",
        format: "#,##0",
        raw: "gainedMaxHp",
        scalingType: "basic",
        data: {
          basicConstant: 1,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_Frost,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Glaciate: {
    name: "Essence of Glaciation",
    rawDesc:
      "When this Memory is <color=yellow>cast</color>, releases a burst of frost that deals {0} <color=yellow>Cold Damage</color> to enemies. The area of effect increases with quality.",
    rawDescVars: [
      {
        rendered: "<sprite=1><color=#16D7FF>160%</color><sprite=5>",
        format: "#,##0",
        raw: "damage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0.8,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_Glaciate,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Insatiable: {
    name: "Essence of Voracity",
    rawDesc:
      "For {0} seconds after casting this memory, <color=yellow>Attack Damage</color> is increased by {1} and <color=yellow>heal</color> {2} health on each <color=yellow>Attack</color>.",
    rawDescVars: [
      {
        rendered: "5",
        format: "#,##0.#",
        raw: "duration",
        scalingType: "basic",
        data: {
          basicConstant: 5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "15%<sprite=5>",
        format: String.raw`#,##0\%`,
        raw: "bonusAttackDamagePercentage",
        scalingType: "basic",
        data: {
          basicConstant: 10,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.005,
        },
      },
      {
        rendered: "6<sprite=5>",
        format: "#,##0",
        raw: "healAmount",
        scalingType: "basic",
        data: {
          basicConstant: 4,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.006,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_Insatiable,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Momentum: {
    name: "Essence of Momentum",
    rawDesc:
      "Each time you <color=yellow>Attack</color> an enemy, the <color=yellow>Cooldown</color> of this Memory is <color=yellow>reduced</color> by {0} seconds.",
    rawDescVars: [
      {
        rendered: "0.4<sprite=5>",
        format: "#,##0.#",
        raw: "reductionAmount",
        scalingType: "basic",
        data: {
          basicConstant: 0.2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.012,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_Momentum,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_NightSky: {
    name: "Essence of Night Sky",
    rawDesc:
      "Each time this Memory <color=yellow>Hits</color> an enemy, your <color=yellow>Attack Speed</color> increases by {0} for {1} seconds, up to a maximum of {2}. If it deals <color=yellow>Dark Damage</color>, it can increase up to a maximum of {3}. Attacking an enemy refreshes the duration of this effect.",
    rawDescVars: [
      {
        rendered: "10%<sprite=5>",
        format: String.raw`#,##0\%`,
        raw: "perHitAtkSpd",
        scalingType: "basic",
        data: {
          basicConstant: 5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "3",
        format: "#,##0",
        raw: "duration",
        scalingType: "basic",
        data: {
          basicConstant: 3,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "20%<sprite=5>",
        format: String.raw`#,##0\%`,
        raw: "maxAtkSpdNormal",
        scalingType: "basic",
        data: {
          basicConstant: 10,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "40%<sprite=5>",
        format: String.raw`#,##0\%`,
        raw: "maxAtkSpdDark",
        scalingType: "basic",
        data: {
          basicConstant: 20,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_NightSky,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Scorched: {
    name: "Essence of Scorch",
    rawDesc:
      "When this memory is <color=yellow>cast</color>, it drops {0} <color=yellow>Fireballs</color> that deal {1} <color=yellow>Fire Damage</color> to nearby enemies.",
    rawDescVars: [
      {
        rendered: "3<sprite=5>",
        format: "#,##0",
        raw: "maxCount",
        scalingType: "basic",
        data: {
          basicConstant: 2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.005,
        },
      },
      {
        rendered: "<sprite=1><color=#16D7FF>47%</color><sprite=5>",
        format: "#,##0",
        raw: "dmgFactor",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0.35,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.0035,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_Scorched,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Spiral: {
    name: "Essence of Spiral",
    rawDesc:
      "Periodically fires a fireball at a random nearby enemy, dealing {0} <color=yellow>Fire Damage</color>. Higher quality increases the firing speed.",
    rawDescVars: [
      {
        rendered: "<sprite=1><color=#16D7FF>90%</color><sprite=5>",
        format: "#,##0",
        raw: "damage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0.6,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.005,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_Spiral,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Wealth: {
    name: "Essence of Wealth",
    rawDesc:
      "When an enemy damaged by this memory is killed within {0} seconds, they drop {1} gold. Gold is shared among all Travelers.",
    rawDescVars: [
      {
        rendered: "6",
        format: "#,##0.#",
        raw: "gracePeriod",
        scalingType: "basic",
        data: {
          basicConstant: 6,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "3<sprite=5>",
        format: "#,##0",
        raw: "killGold",
        scalingType: "basic",
        data: {
          basicConstant: 1.5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_Wealth,
    achievementName: "Suspiciously Wealthy Traveler",
    achievementDescription: "Spend a total of 2,000 gold.",
  },
  Gem_L_DivineFaith: {
    name: "Divine Faith",
    rawDesc:
      "Each time you <color=yellow>Kill</color> an enemy with this memory, gain a stack of <color=yellow>Faith</color> up to {0} stacks. For each stack of <color=yellow>Faith</color>, this memory's <color=yellow>Damage</color> to enemies and <color=yellow>Healing</color> to allies increases by {1}, and your maximum Health increases by {2}.",
    rawDescVars: [
      {
        rendered: "75<sprite=5>",
        format: "#,##0",
        raw: "maxStacks",
        scalingType: "basic",
        data: {
          basicConstant: 30,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.015,
        },
      },
      {
        rendered: "0.5%",
        format: "0.#%",
        raw: "dmgAmpPerStack",
        scalingType: "basic",
        data: {
          basicConstant: 0.005,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "4",
        format: "#,##0",
        raw: "maxHealthPerStack",
        scalingType: "basic",
        data: {
          basicConstant: 4,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Legendary",
    image: Gem_L_DivineFaith,
    achievementName: "God Protects Me",
    achievementDescription:
      "In a single adventure, visit locations occupied by Hunters 4 times while having a Threat Level of 5.",
  },
  Gem_E_Flexibility: {
    name: "Essence of Flexibility",
    rawDesc:
      "While this Memory is on cooldown, {0} of damage taken is split over {1} seconds. This split damage is reduced by {2}.",
    rawDescVars: [
      {
        rendered: "37%<sprite=5>",
        format: "#,##0%",
        raw: "divMultiplier",
        scalingType: (quality: number) =>
          1 - 1 / (1 + 0.1 * (1 + 0.01 * 5 * quality)),
        data: null,
      },
      {
        rendered: "4",
        format: "#,##0.#",
        raw: "dmgTickCount*tickInterval",
        scalingType: "unknown",
        data: null,
      },
      {
        rendered: "20%",
        format: "#,##0%",
        raw: "1-dmgReduceAmount",
        scalingType: "unknown",
        data: null,
      },
    ],
    rarity: "Epic",
    image: Gem_E_Flexibility,
    achievementName: "Flexible Diet",
    achievementDescription:
      "In a single adventure, have your Health drop below 40% and then rise above 75%, 10 times.",
  },
  Gem_C_Vengeance: {
    name: "Essence of Vengeance",
    rawDesc:
      "When you take any damage, fire {0} blades that deal {1} <color=yellow>damage</color> to nearby enemies. After taking damage, this memory's <color=yellow>damage</color> and <color=yellow>healing</color> are increased by {2} for {3} seconds.",
    rawDescVars: [
      {
        rendered: "2",
        format: "#,##0",
        raw: "shootCount",
        scalingType: "basic",
        data: {
          basicConstant: 2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "<sprite=1><color=#16D7FF>102%</color><sprite=5>",
        format: "#,##0",
        raw: "damage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0.6,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.007,
        },
      },
      {
        rendered: "34%<sprite=5>",
        format: "#,##0%",
        raw: "ampAmount",
        scalingType: "basic",
        data: {
          basicConstant: 0.2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.007,
        },
      },
      {
        rendered: "5",
        format: "#,##0.#",
        raw: "empowerDuration",
        scalingType: "basic",
        data: {
          basicConstant: 5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_C_Vengeance,
    achievementName: "Taste of Their Own Medicine",
    achievementDescription:
      "Defeat the Demon of the Forest, the boss of the first region, by delivering the killing blow with a claw attack or memory such as Aurena's basic attack, Hysteria, or Ice Claw.",
  },
  Gem_E_Omega: {
    name: "Essence of Omega",
    rawDesc:
      "When not in combat, gain <color=yellow>Finality</color> stacks every second up to {0} stacks. When stacks are present, this Memory's <color=yellow>Cast</color> is <color=yellow>Empowered</color>, increasing <color=yellow>Damage</color> by {1} per stack.",
    rawDescVars: [
      {
        rendered: "20",
        format: "#,##0",
        raw: "maxChargeCount",
        scalingType: "basic",
        data: {
          basicConstant: 20,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "5%<sprite=5>",
        format: "#,##0%",
        raw: "chargeRate",
        scalingType: (quality: number) => (0.55 * (1 + 0.01 * quality)) / 20,
        data: null,
      },
    ],
    rarity: "Epic",
    image: Gem_E_Omega,
    achievementName: "Omega Point",
    achievementDescription:
      "Enter The Pure White Dream by defeating the boss of the third region, having cast only one distinct Memory during your adventure (excluding Evasion and Identity rarity Memories from this count), with multiple copies of that Memory allowed.",
  },
  Gem_R_Rigidity: {
    name: "Essence of Rigidity",
    rawDesc:
      "When this Memory <color=yellow>Hits</color> an enemy, gain a {0} <color=yellow>Barrier</color> that lasts for {1} seconds. If it deals <color=yellow>Cold Damage</color>, this effect is increased by {2}.",
    rawDescVars: [
      {
        rendered: "9<sprite=5>",
        format: "#,##0",
        raw: "shieldAmount",
        scalingType: "basic",
        data: {
          basicConstant: 5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.0075,
        },
      },
      {
        rendered: "2",
        format: "#,##0.#",
        raw: "shieldDuration",
        scalingType: "basic",
        data: {
          basicConstant: 2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "80%",
        format: "#,##0%",
        raw: "coldDamageMultiplier-1",
        scalingType: "unknown",
        data: null,
      },
    ],
    rarity: "Rare",
    image: Gem_R_Rigidity,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Might: {
    name: "Essence of the Giant",
    rawDesc:
      "Increases maximum Health by {0}. This Memory's damage increases by {1} for every {2} of your <color=yellow>Maximum Health</color>.",
    rawDescVars: [
      {
        rendered: "260<sprite=5>",
        format: "#,##0",
        raw: "healthBonus",
        scalingType: "basic",
        data: {
          basicConstant: 130,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "1%",
        format: "#,##0%",
        raw: "dmgAmpPerUnitHealth",
        scalingType: "basic",
        data: {
          basicConstant: 0.01,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "50",
        format: "#,##0",
        raw: "unitHealthAmount",
        scalingType: "basic",
        data: {
          basicConstant: 50,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Epic",
    image: Gem_E_Might,
    achievementName: "Heavier Than Atlas",
    achievementDescription: "Reach 3,000 maximum health.",
  },
  Gem_L_SolarEye: {
    name: "Eye of the Sun",
    rawDesc:
      "Every {0} seconds, this Memory's <color=yellow>Cast</color> is <color=yellow>Empowered</color>, raining <color=yellow>Solar Light</color> upon all nearby enemies who are <color=yellow>Burning</color>. <color=yellow>Solar Light</color> deals {1} <color=yellow>Fire Damage</color> over {2} seconds and increases <color=yellow>Burn</color> stacks by {3}.\nIncreases my Fire damage over time by {4}.",
    rawDescVars: [
      {
        rendered: "20",
        format: "#,##0.#",
        raw: "cooldownTime",
        scalingType: "basic",
        data: {
          basicConstant: 20,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "<sprite=1><color=#16D7FF>360%</color><sprite=5>",
        format: "#,##0",
        raw: "dmgFactor * tickCount",
        scalingType: (quality: number) =>
          0.18 * (1 + 0.01 * quality) * (1.5 / 0.15),
        data: null,
      },
      {
        rendered: "1.5",
        format: "#,##0.#",
        raw: "interval * tickCount",
        scalingType: "unknown",
        data: null,
      },
      {
        rendered: "9<sprite=5>",
        format: "#,##0",
        raw: "calTotalStack",
        scalingType: (quality: number) => 6 * (1 + 0.01 * 0.5 * quality),
        data: null,
      },
      {
        rendered: "100%",
        format: "#,##0%",
        raw: "statBonus.fireEffectAmpFlat",
        scalingType: "unknown",
        data: null,
      },
    ],
    rarity: "Legendary",
    image: Gem_L_SolarEye,
    achievementName: "Praise the Sun!",
    achievementDescription: "Apply a total of 4,000 fire stacks to enemies.",
  },
  Gem_C_Sulfur: {
    name: "Essence of Sulfur",
    rawDesc:
      "All <color=yellow>Damage</color> dealt by this memory is increased by {0} and converted to <color=yellow>Fire Damage</color>. My fire damage over time is increased by {1}.",
    rawDescVars: [
      {
        rendered: "15%<sprite=5>",
        format: "#,##0%",
        raw: "ampAmount",
        scalingType: "basic",
        data: {
          basicConstant: 0.075,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "50%<sprite=5>",
        format: "#,##0%",
        raw: "fireAmpBonus",
        scalingType: "basic",
        data: {
          basicConstant: 0.25,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Common",
    image: Gem_C_Sulfur,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Overload: {
    name: "Essence of Overload",
    rawDesc:
      "When you <color=yellow>Cast</color> this memory, <color=yellow>Sacrifice</color> {0} of your current Health to <color=yellow>Empower</color> the <color=yellow>Cast</color>. The <color=yellow>Damage</color> and <color=yellow>Healing</color> dealt by the <color=yellow>Empowered Cast</color> are increased by {1}.",
    rawDescVars: [
      {
        rendered: "20%",
        format: "#,##0%",
        raw: "healthRatio",
        scalingType: "basic",
        data: {
          basicConstant: 0.2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "45%<sprite=5>",
        format: "#,##0%",
        raw: "amp",
        scalingType: "basic",
        data: {
          basicConstant: 0.225,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Epic",
    image: Gem_E_Overload,
    achievementName: "Reap What You Sow",
    achievementDescription:
      "Sacrifice a portion of your HP for gold at the Shrine of Disintegration 16 times.",
  },
  Gem_R_Contempt: {
    name: "Essence of Contempt",
    rawDesc:
      "The <color=yellow>damage</color> dealt by this memory increases as the target's health gets lower, up to {0} <color=yellow>increase</color> when their health is {1}.",
    rawDescVars: [
      {
        rendered: "60%<sprite=5>",
        format: "#,##0%",
        raw: "amp",
        scalingType: "basic",
        data: {
          basicConstant: 0.3,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "20%",
        format: "#,##0%",
        raw: "maxAmpThreshold",
        scalingType: "basic",
        data: {
          basicConstant: 0.2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_Contempt,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Bleak: {
    name: "Essence of Bleakness",
    rawDesc:
      "This Memory deals {0} increased damage to enemies affected by <color=yellow>Cold</color>, <color=yellow>Slow</color>, <color=yellow>Bind</color>, or <color=yellow>Stun</color>.",
    rawDescVars: [
      {
        rendered: "50%<sprite=5>",
        format: "#,##0%",
        raw: "dmgAmp",
        scalingType: "basic",
        data: {
          basicConstant: 0.25,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_Bleak,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_L_PureWhite: {
    name: "Pure White",
    rawDesc:
      "Every {0} seconds, the <color=yellow>Cast</color> of this memory is <color=yellow>Empowered</color>. The <color=yellow>Empowered Cast</color> fires {1} <color=yellow>Projectiles</color> that deal <color=yellow>Light Damage</color> equal to {2} of the <color=yellow>Damage</color> it first deals to each enemy. The number of shots increases by the number of <color=yellow>Light Stacks</color> on each target.",
    rawDescVars: [
      {
        rendered: "10",
        format: "#,##0.#",
        raw: "cooldownTime",
        scalingType: "basic",
        data: {
          basicConstant: 10,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "3",
        format: "#,##0",
        raw: "minProjectiles",
        scalingType: "basic",
        data: {
          basicConstant: 3,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "20%<sprite=5>",
        format: "#,##0%",
        raw: "damageMultiplier",
        scalingType: "basic",
        data: {
          basicConstant: 0.1,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
    ],
    rarity: "Legendary",
    image: Gem_L_PureWhite,
    achievementName: "Empty Canvas",
    achievementDescription:
      "Enter The Pure White Dream by defeating the boss of the third region 10 times in total.",
  },
  Gem_R_Wound: {
    name: "Essence of Wound",
    rawDesc:
      "When this memory deals damage to an enemy, it applies a <color=yellow>Mark</color>. Each <color=yellow>Attack</color> on a marked target deals {0} <color=yellow>Damage</color>. After {1} attacks, the <color=yellow>Mark</color> explodes, dealing {2} <color=yellow>Damage</color> to all nearby enemies.",
    rawDescVars: [
      {
        rendered: "<sprite=1><color=#16D7FF>44%</color><sprite=5>",
        format: "#,##0",
        raw: "hitDamage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0.25,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.0075,
        },
      },
      {
        rendered: "3",
        format: "#,##0",
        raw: "explodeStage",
        scalingType: "basic",
        data: {
          basicConstant: 3,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "<sprite=1><color=#16D7FF>275%</color><sprite=5>",
        format: "#,##0",
        raw: "explodeDamage",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 1.1,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.015,
        },
      },
    ],
    rarity: "Rare",
    image: Gem_R_Wound,
    achievementName: "Transcendent Speed",
    achievementDescription: "Reach 6 attack speed per second.",
  },
  Gem_E_Protection: {
    name: "Essence of Protection",
    rawDesc:
      "When you <color=yellow>cast</color> this memory, gain {0} <color=yellow>Defense</color> for {1} seconds, reducing damage taken and becoming <color=yellow>Unstoppable</color>. Can only trigger once every {2} seconds.",
    rawDescVars: [
      {
        rendered: "40<sprite=5>",
        format: "#,##0",
        raw: "armorAmount",
        scalingType: "basic",
        data: {
          basicConstant: 20,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "3",
        format: "#,##0.#",
        raw: "armorDuration",
        scalingType: "basic",
        data: {
          basicConstant: 3,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "5",
        format: "#,##0.#",
        raw: "cooldownTime",
        scalingType: "basic",
        data: {
          basicConstant: 5,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Epic",
    image: Gem_E_Protection,
    achievementName: "Iron Body",
    achievementDescription:
      "Gain a shield equal to or greater than 300% of your maximum health, for example, by using Essence of Guidance, Essence of Spiral, and Essence of Clemency simultaneously.",
  },
  Gem_E_Fever: {
    name: "Essence of Fever",
    rawDesc:
      "When this Memory deals <color=yellow>Fire Damage</color> to an enemy, it infects them with <color=yellow>Fever</color>. Enemies infected with <color=yellow>Fever</color> explode after {0} seconds, dealing {1} <color=yellow>Fire Damage</color> to themselves and nearby enemies. For each stack of <color=yellow>Burn</color> on the target, the explosion radius increases by {2} and explosion damage increases by {3}.",
    rawDescVars: [
      {
        rendered: "2",
        format: "#,##0.#",
        raw: "duration",
        scalingType: "basic",
        data: {
          basicConstant: 2,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "<sprite=1><color=#16D7FF>130%</color><sprite=5>",
        format: "#,##0",
        raw: "dmgFactor",
        scalingType: "basic",
        data: {
          basicConstant: 0,
          basicAP: 0.65,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0.01,
        },
      },
      {
        rendered: "30%",
        format: "#,##0%",
        raw: "radiusAmpPerStack",
        scalingType: "basic",
        data: {
          basicConstant: 0.3,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
      {
        rendered: "10%",
        format: "#,##0%",
        raw: "dmgAmpPerStack",
        scalingType: "basic",
        data: {
          basicConstant: 0.1,
          basicAP: 0,
          basicAD: 0,
          basicLvl: 0,
          basicAddedMultiplierPerLevel: 0,
        },
      },
    ],
    rarity: "Epic",
    image: Gem_E_Fever,
    achievementName: "",
    achievementDescription: "",
  },
} as const;

/* eslint-enable unicorn/no-null */

export type Essence = NonNullable<ReturnType<typeof getEssenceById>>;

export const getEssences = () =>
  Object.keys(essences)
    .map((id) => getEssenceById(id))
    .filter(Boolean)
    .toSorted(
      (a, b) =>
        compareRarities(a.rarity, b.rarity) || a.name.localeCompare(b.name),
    );

export const getEssenceById = (id: string) => {
  if (id in essences) {
    const essenceId = id as keyof typeof essences;
    const essence = essences[essenceId];
    return {
      id: essenceId,
      ...essence,
      rawDescVars: essence.rawDescVars.map(
        ({ rendered, format, scalingType, data }) => {
          let scaling;
          if (scalingType === "basic") {
            scaling =
              getItemBasicScaling(
                data,
                rendered.includes("%") && !format.endsWith(String.raw`\%`),
              ) * 50;
          }

          if (typeof scalingType === "function") {
            scaling = scalingType(50);
          }

          const displayedScaling =
            scaling === undefined ? "???" : +scaling.toFixed(2);
          const unit = rendered.includes("%") ? "%" : "";
          return {
            rendered,
            scaling: `+${displayedScaling}${unit} / 50% qlty`,
          };
        },
      ),
    } as const;
  }
};

export const getEssenceRarities = () =>
  [...new Set(Object.values(essences).map(({ rarity }) => rarity))].toSorted(
    compareRarities,
  );
