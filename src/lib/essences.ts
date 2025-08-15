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

import { compareRarities, getRarityColor } from "./utils";

const essences = {
  Gem_C_Charcoal: {
    name: "Essence of Charcoal",
    description:
      "When this memory <color=yellow>hits</color> an enemy, it fires a charcoal fragment, dealing <sprite=1><color=#16D7FF>60%</color><sprite=5> <color=yellow>damage</color>. If the target is already <color=yellow>burning</color>, it deals <sprite=1><color=#16D7FF>100%</color><sprite=5> <color=yellow>fire damage</color> instead.",
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
    lore: "In the field, we sometimes had to swallow charcoal to filter out toxic substances from our bodies.",
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Confidence: {
    name: "Essence of Confidence",
    description:
      "Damage dealt by this memory to nearby enemies is increased by 40%<sprite=5>.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Efficiency: {
    name: "Essence of Efficiency",
    description:
      "This Memory gains 36<sprite=5> <color=yellow>Memory Haste</color>, reducing its <color=yellow>Cooldown</color> by 26%<sprite=5>.",
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
        scalingType: "unknown",
        data: null,
      },
    ],
    rarity: "Common",
    image: Gem_C_Efficiency,
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Guidance: {
    name: "Essence of Guidance",
    description:
      "This Memory's <color=yellow>Healing Amount</color> is increased by 40%<sprite=5>. 30% of the excess healing from this Memory is converted into a <color=yellow>Barrier</color> that lasts for 2 seconds.",
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
    lore: 'Who defines what life is?\n\nDo you think that "we" are fake just because our existence is based on the imagination of some nameless being?\n\nYou, the one who gave us life, yet you dismiss us as mere illusions.\n\nThen, oh God, I shall become the guide of "ourselves" by my own will.',
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Lethality: {
    name: "Essence of Lethality",
    description:
      "This memory's damage against enemies with 70% or more health is increased by 60%<sprite=5>.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Quicksilver: {
    name: "Essence of Quicksilver",
    description:
      "When <color=yellow>casting</color> this memory or dealing <color=yellow>fire damage</color> with it, <color=yellow>movement speed</color> increases by 30%<sprite=5> and returns to normal over 2.5 seconds.",
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
    lore: "Gotta Go Fast!",
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Regeneration: {
    name: "Essence of Regeneration",
    description:
      "If this memory is <color=yellow>Cast</color> <color=yellow>in Combat</color>, it <color=yellow>Restores</color> your health by 41<sprite=5> over 7 seconds.",
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
        scalingType: "unknown",
        data: null,
      },
    ],
    rarity: "Common",
    image: Gem_C_Regeneration,
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Sharp: {
    name: "Essence of Sharpness",
    description:
      "<color=yellow>Casting</color> this memory fires 5 arrows that deal <sprite=1><color=#16D7FF>90%</color><sprite=5> <color=yellow>damage</color> to random enemies.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Shatter: {
    name: "Essence of Shatter",
    description:
      "Every 10 seconds, the <color=yellow>Cast</color> of this Memory is <color=yellow>Empowered</color>. Damage dealt to enemies by <color=yellow>Empowered Cast</color> is increased by 40%<sprite=5>. If it deals <color=yellow>Light Damage</color>, it is increased by 72%<sprite=5> instead.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Talc: {
    name: "Essence of Talc",
    description:
      "Every 10 seconds, the <color=yellow>Cast</color> of this Memory is <color=yellow>Empowered</color>. The initial damage dealt to each enemy by <color=yellow>Empowered Cast</color> is increased by <sprite=1><color=#16D7FF>480%</color><sprite=5>.",
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
    lore: "When one focuses their mind on an Essence, they can directly feel the concept contained within and harness its power.\n\nThe Essence of Talc holds the concept felt when rolling an unripe chestnut shell on the tongue or chewing a mouthful of chalk.\n\nIt would be truly unfortunate to find yourself in a situation where you must utilize this Essence.",
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Void: {
    name: "Essence of the Void",
    description:
      "After casting this memory, your next <color=yellow>attack</color> within 4 seconds will explode, dealing <sprite=2><color=#FF8A2D>250%</color><sprite=5> <color=yellow>dark damage</color> to the target and nearby enemies.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_C_Wind: {
    name: "Essence of Wind",
    description:
      "Casting this memory increases <color=yellow>Attack Speed</color> by 33%<sprite=5> for 5 seconds.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Clemency: {
    name: "Essence of Clemency",
    description:
      "Heal <color=yellow>self</color> for 7%<sprite=5> of the <color=yellow>damage</color> dealt by this Memory.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Direness: {
    name: "Essence of Direness",
    description:
      "The lower my <color=yellow>Health</color>, the shorter the <color=yellow>Cooldown</color> of this Memory. When my <color=yellow>Health</color> is at 30%, the <color=yellow>Cooldown</color> is reduced by up to 55%<sprite=5>.",
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
        scalingType: "unknown",
        data: null,
      },
    ],
    rarity: "Epic",
    image: Gem_E_Direness,
    lore: "Why am I alive?\n\n...\n\nI was definitely in the prison.\nThose Lucid prison guards, to think they can freely use magic...\nIt's my mistake for not assessing their full strength.\n\nI thought my breastplate was shattered, and at least two of my ribs were broken...\nBut here, it's like nothing happened. I even feel stronger.\n\n...\n\nAstrid, I can sense your presence now.\n\nWait just a bit, I'm coming.",
    achievementName: "Desperate Hero",
    achievementDescription:
      "Defeat 30 enemies in a row while your health is below 40%.",
  },
  Gem_E_Insight: {
    name: "Essence of Insight",
    description:
      "When this Memory deals any <color=yellow>damage</color> to an enemy, it deals an additional <sprite=1><color=#16D7FF>200%</color><sprite=5> <color=yellow>Light Damage</color> to up to 3<sprite=5> enemies and increases <color=yellow>Memory Haste</color> by 20<sprite=5> for 5 seconds. Can only trigger once every 3 seconds.",
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
    lore: null,
    achievementName: "Ultra Rapid Fire",
    achievementDescription: "Cast 12 Memories within 8 seconds.",
  },
  Gem_E_Metal: {
    name: "Essence of Metal",
    description:
      "When you <color=yellow>Slay</color> an enemy, the <color=yellow>Cooldown</color> of the Memory is <color=yellow>reduced</color> by 1<sprite=5> seconds.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Pain: {
    name: "Essence of Pain",
    description:
      "All <color=yellow>Damage</color> dealt by this Memory deals 40%<sprite=5> <color=yellow>Area Damage</color> around the target. This <color=yellow>Area Damage</color> shares the elemental type with the original damage.",
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
    lore: "Do not blaspheme. I am not a lunatic who enjoys...",
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Predation: {
    name: "Essence of Predation",
    description:
      "This Memory deals 60%<sprite=5> increased damage to <color=yellow>Boss</color> and <color=yellow>Hunter</color> enemies. Defeating a <color=yellow>Hunter</color> drops 1 <color=yellow>Orb of Power</color>, while defeating a <color=yellow>Boss</color> drops 3. When you collect an <color=yellow>Orb of Power</color>, either <color=yellow>Attack Damage</color> or <color=yellow>Ability Power</color> permanently increases by 1 at random.",
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
    lore: "Does he deny reality?\nLiving in essence, yet refusing to believe in the ideal.\nDoes he think existence precedes essence?\n\nHe does not deserve to be here.",
    achievementName: "Who's the Prey Now",
    achievementDescription: "Defeat the Hunter 70 times.",
  },
  Gem_E_Thunder: {
    name: "Essence of Thunder",
    description:
      "When you <color=yellow>Cast</color> <color=yellow>another Memory</color> or use <color=yellow>Dodge</color>, gain 1 stack of <color=yellow>Thunder</color>, up to 7<sprite=5> times. When you <color=yellow>Cast</color> this Memory, consume all stacks of <color=yellow>Thunder</color> to call down lightning on nearby enemies, once for each stack. Each lightning deals <sprite=1><color=#16D7FF>117%</color><sprite=5> <color=yellow>Light Damage</color>.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Twilight: {
    name: "Essence of Twilight",
    description:
      "Your <color=yellow>Basic Attacks</color> are converted to <color=yellow>Dark Damage</color>. When this Memory deals damage to an enemy with 3 or more <color=yellow>Dark Stacks</color>, consumes all stacks to deal <sprite=1><color=#16D7FF>54%</color><sprite=5> <color=yellow>Damage</color> per stack and <color=yellow>Heal</color> for 6<sprite=5> per stack.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Virtuousness: {
    name: "Essence of Virtue",
    description:
      "The number of charges for this Memory increases by 1<sprite=5>. Each 150% increase in quality raises the number of charges by 1.",
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
    lore: "People are dying. The horrifying monsters and ghosts that only existed in legends and imagination have crossed over into reality, burning down villages and shattering our lives.\n\nWhat would happen if someone imagined a god with infinite power, and that god emerged into our reality?\n\nOn the contrary, what if someone imagined a demon king with infinite power and cruel intentions, and it slipped into our world?\n\nIt's only a matter of time.\nAre we left with no choice but to sit and wait for this inevitable calamity?\n\n...\n\nYesterday, I succeeded in imbuing the power of dreams into my sister's sabre and my dagger. Now, all I need is information.\n\nI know someone who can help me resolve this dilemma.",
    achievementName: "",
    achievementDescription: "",
  },
  Gem_L_Embertail: {
    name: "Embertail",
    description:
      "My <color=yellow>Attacks</color> ricochet to deal <sprite=1><color=#16D7FF>100%</color><sprite=5> <color=yellow>Fire Damage</color> to a nearby enemy. For each nearby enemy engulfed in flames, this memory's <color=yellow>Damage</color> and <color=yellow>Healing</color> are increased by 8%<sprite=5> and its <color=yellow>Cooldown</color> is reduced 8%<sprite=5> faster. My fire damage over time is increased by 100%.",
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
    lore: "Primus...\n\n...create for me...\n\n...\n\n...\n\n...\n\n...erase for me...\n\n...\n\nThat will suffice.",
    achievementName: "",
    achievementDescription: "",
  },
  Gem_L_GlacialCore: {
    name: "Glacial Core",
    description:
      "Every 5 seconds, if you deal <color=yellow>damage</color> with this memory, you <color=yellow>recover</color> <color=yellow>health</color> equal to 3.6%<sprite=5> of your maximum health. If it is <color=yellow>cold damage</color>, the effect is increased by 100%. 272%<sprite=5> of all <color=yellow>health recovery</color> you receive is converted into <color=yellow>cold damage</color> and fires <color=yellow>ice shards</color> at enemies.",
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
    lore: null,
    achievementName: "Frozen Heart",
    achievementDescription:
      "Defeat the King of the Snowy Mountains, the boss of the second region, for the first time.",
  },
  Gem_L_Paranoia: {
    name: "Essence of Paranoia",
    description:
      "When you take any <color=yellow>damage</color>, this Memory gains 150<sprite=5> <color=yellow>Memory Haste</color> for 6 seconds, reducing its <color=yellow>Cooldown</color> by 60%<sprite=5>, but it is <color=yellow>Automatically Cast</color> on nearby enemies.",
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
        scalingType: "unknown",
        data: null,
      },
    ],
    rarity: "Legendary",
    image: Gem_L_Paranoia,
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_L_Perfect: {
    name: "Perfection",
    description:
      "Increases Attack Damage by 7<sprite=5>, Ability Power by 7<sprite=5>, maximum Health by 35<sprite=5>, Attack Speed by 10%<sprite=5>, Critical Strike Chance by 6%<sprite=5>, and Memory Haste by 10<sprite=5>.",
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
    lore: "Someone once called me a god...\nYes, there was a time when I thought I was almost omnipotent here.\n\nI reunited with the family I had longed for\nand realized everything I had imagined and dreamed of.\n\nIt was perfect.\nNo, I thought it was perfect.\n\nThe dream\nwas just a dream.\nMy omnipotence\nwas no different from impotence in the end.\n\nReality is not a world of necessity.\nThis place...\nis just an illusion.",
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Blade: {
    name: "Essence of Blade",
    description:
      "Each time this memory <color=yellow>hits</color> an enemy, it summons blades that lacerate the target for <sprite=2><color=#FF8A2D>58%</color><sprite=5> damage 3<sprite=5> times. Can only trigger once every 2 seconds for each enemy.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Celestial: {
    name: "Essence of the Celestial",
    description:
      "Every 10 seconds, this Memory's <color=yellow>Cast</color> is <color=yellow>Empowered</color>. When an <color=yellow>Empowered Cast</color> hits an enemy for the first time, it drops 4 meteors that deal <sprite=1><color=#16D7FF>130%</color><sprite=5> <color=yellow>Light Damage</color> each.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Dusk: {
    name: "Essence of Dusk",
    description:
      "Upon casting this Memory, fire 2 <color=yellow>Dusk Shards</color> that deal <sprite=2><color=#FF8A2D>50%</color><sprite=5> <color=yellow>Dark Damage</color> each time you <color=yellow>Attack</color> an enemy for 5 seconds.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Flow: {
    name: "Essence of Flow",
    description:
      "When dealing <color=yellow>Light Damage</color> with any memory, reduces this memory's <color=yellow>Cooldown</color> by 6%<sprite=5>. For ultimate abilities, only 40% of the effect is applied. <color=yellow>Cooldown Reduction</color> effects this memory receives also apply to equipped <color=yellow>Essences</color>.",
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
    lore: "What an unfamiliar truth... What you've shown me was an undeniable truth, the touch of destiny itself.\nOnce, I governed the birth and death of stars, feeling their magnificent resonance in its entirety,\nyet now everything feels as distant as shadows in the mist.\n\nBut my will remains as clear as the morning star.\nI shall carve my own waves of destiny,\nand break free from these shackles.\n\nUntil my last breath, I shall remain as one who leads the dance of creation and destruction.",
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Frost: {
    name: "Essence of Frost",
    description:
      "When this memory deals <color=yellow>Cold Damage</color>, it deals additional <color=yellow>Cold Damage</color> equal to 10%<sprite=5> of your <color=yellow>Maximum Health</color> and briefly <color=yellow>Stuns</color> them. Can only trigger once every 5 seconds per enemy. Each time this triggers, permanently increase your <color=yellow>Maximum Health</color> by 1.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Glaciate: {
    name: "Essence of Glaciation",
    description:
      "When this Memory is <color=yellow>cast</color>, releases a burst of frost that deals <sprite=1><color=#16D7FF>160%</color><sprite=5> <color=yellow>Cold Damage</color> to enemies. The area of effect increases with quality.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Insatiable: {
    name: "Essence of Voracity",
    description:
      "For 5 seconds after casting this memory, <color=yellow>Attack Damage</color> is increased by 15%<sprite=5> and <color=yellow>heal</color> 6<sprite=5> health on each <color=yellow>Attack</color>.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Momentum: {
    name: "Essence of Momentum",
    description:
      "Each time you <color=yellow>Attack</color> an enemy, the <color=yellow>Cooldown</color> of this Memory is <color=yellow>reduced</color> by 0.4<sprite=5> seconds.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_NightSky: {
    name: "Essence of Night Sky",
    description:
      "Each time this Memory <color=yellow>Hits</color> an enemy, your <color=yellow>Attack Speed</color> increases by 10%<sprite=5> for 3 seconds, up to a maximum of 20%<sprite=5>. If it deals <color=yellow>Dark Damage</color>, it can increase up to a maximum of 40%<sprite=5>. Attacking an enemy refreshes the duration of this effect.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Scorched: {
    name: "Essence of Scorch",
    description:
      "When this memory is <color=yellow>cast</color>, it drops 3<sprite=5> <color=yellow>Fireballs</color> that deal <sprite=1><color=#16D7FF>47%</color><sprite=5> <color=yellow>Fire Damage</color> to nearby enemies.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Spiral: {
    name: "Essence of Spiral",
    description:
      "Periodically fires a fireball at a random nearby enemy, dealing <sprite=1><color=#16D7FF>90%</color><sprite=5> <color=yellow>Fire Damage</color>. Higher quality increases the firing speed.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Wealth: {
    name: "Essence of Wealth",
    description:
      "When an enemy damaged by this memory is killed within 6 seconds, they drop 3<sprite=5> gold. Gold is shared among all Travelers.",
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
    lore: 'In the Rapids, gold holds a special meaning.\nImperfect beings who fall asleep, uncertain if they\'ll ever wake again.\nFor "us" to persist, we need the perfection that gold embodies.',
    achievementName: "Suspiciously Wealthy Traveler",
    achievementDescription: "Spend a total of 2,000 gold.",
  },
  Gem_L_DivineFaith: {
    name: "Divine Faith",
    description:
      "Each time you <color=yellow>Kill</color> an enemy with this memory, gain a stack of <color=yellow>Faith</color> up to 75<sprite=5> stacks. For each stack of <color=yellow>Faith</color>, this memory's <color=yellow>Damage</color> to enemies and <color=yellow>Healing</color> to allies increases by 0.5%, and your maximum Health increases by 4.",
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
    lore: "These heretical and pitiful souls who believe in Primus, the false god.\nThose who seek to widen the Rift and bring forth greater evil.\nI shall no longer stand idle in the face of their blasphemy.\n\nMy mace is the staff of the people, and my knights are the chosen of the divine. We shall surely pass judgment upon these ignorant and unfaithful ones.\n\nTomorrow, a new light shall dawn. Not a single breath of theirs shall be heard anywhere in this world.\n\nAll shall be according to the will of El, the Lord of All Creation...",
    achievementName: "God Protects Me",
    achievementDescription:
      "In a single adventure, visit locations occupied by Hunters 4 times while having a Threat Level of 5.",
  },
  Gem_E_Flexibility: {
    name: "Essence of Flexibility",
    description:
      "While this Memory is on cooldown, 37%<sprite=5> of damage taken is split over 4 seconds. This split damage is reduced by 20%.",
    rawDesc:
      "While this Memory is on cooldown, {0} of damage taken is split over {1} seconds. This split damage is reduced by {2}.",
    rawDescVars: [
      {
        rendered: "37%<sprite=5>",
        format: "#,##0%",
        raw: "divMultiplier",
        scalingType: "unknown",
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
    lore: null,
    achievementName: "Flexible Diet",
    achievementDescription:
      "In a single adventure, have your Health drop below 40% and then rise above 75%, 10 times.",
  },
  Gem_C_Vengeance: {
    name: "Essence of Vengeance",
    description:
      "When you take any damage, fire 2 blades that deal <sprite=1><color=#16D7FF>102%</color><sprite=5> <color=yellow>damage</color> to nearby enemies. After taking damage, this memory's <color=yellow>damage</color> and <color=yellow>healing</color> are increased by 34%<sprite=5> for 5 seconds.",
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
    lore: null,
    achievementName: "Taste of Their Own Medicine",
    achievementDescription:
      "Defeat the Demon of the Forest, the boss of the first region, by delivering the killing blow with a claw attack or memory such as Aurena's basic attack, Hysteria, or Ice Claw.",
  },
  Gem_E_Omega: {
    name: "Essence of Omega",
    description:
      "When not in combat, gain <color=yellow>Finality</color> stacks every second up to 20 stacks. When stacks are present, this Memory's <color=yellow>Cast</color> is <color=yellow>Empowered</color>, increasing <color=yellow>Damage</color> by 5%<sprite=5> per stack.",
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
        scalingType: "unknown",
        data: null,
      },
    ],
    rarity: "Epic",
    image: Gem_E_Omega,
    lore: null,
    achievementName: "Omega Point",
    achievementDescription:
      "Enter The Pure White Dream by defeating the boss of the third region, having cast only one distinct Memory during your adventure (excluding Evasion and Identity rarity Memories from this count), with multiple copies of that Memory allowed.",
  },
  Gem_R_Rigidity: {
    name: "Essence of Rigidity",
    description:
      "When this Memory <color=yellow>Hits</color> an enemy, gain a 9<sprite=5> <color=yellow>Barrier</color> that lasts for 2 seconds. If it deals <color=yellow>Cold Damage</color>, this effect is increased by 80%.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Might: {
    name: "Essence of the Giant",
    description:
      "Increases maximum Health by 260<sprite=5>. This Memory's damage increases by 1% for every 50 of your <color=yellow>Maximum Health</color>.",
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
    lore: null,
    achievementName: "Heavier Than Atlas",
    achievementDescription: "Reach 3,000 maximum health.",
  },
  Gem_L_SolarEye: {
    name: "Eye of the Sun",
    description:
      "Every 20 seconds, this Memory's <color=yellow>Cast</color> is <color=yellow>Empowered</color>, raining <color=yellow>Solar Light</color> upon all nearby enemies who are <color=yellow>Burning</color>. <color=yellow>Solar Light</color> deals <sprite=1><color=#16D7FF>360%</color><sprite=5> <color=yellow>Fire Damage</color> over 1.5 seconds and increases <color=yellow>Burn</color> stacks by 9<sprite=5>.\nIncreases my Fire damage over time by 100%.",
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
        scalingType: "unknown",
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
        scalingType: "unknown",
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
    lore: null,
    achievementName: "Praise the Sun!",
    achievementDescription: "Apply a total of 4,000 fire stacks to enemies.",
  },
  Gem_C_Sulfur: {
    name: "Essence of Sulfur",
    description:
      "All <color=yellow>Damage</color> dealt by this memory is increased by 15%<sprite=5> and converted to <color=yellow>Fire Damage</color>. My fire damage over time is increased by 50%<sprite=5>.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_E_Overload: {
    name: "Essence of Overload",
    description:
      "When you <color=yellow>Cast</color> this memory, <color=yellow>Sacrifice</color> 20% of your current Health to <color=yellow>Empower</color> the <color=yellow>Cast</color>. The <color=yellow>Damage</color> and <color=yellow>Healing</color> dealt by the <color=yellow>Empowered Cast</color> are increased by 45%<sprite=5>.",
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
    lore: "Every time I recall this notion,\nI feel my body and mind being consumed by flames.\n\nThe scales on the affected areas easily crumbled and were scorching hot,\nand upon gathering the golden dust secreted from some parts, I found it to be lustrous and very fine in form.\n\nMagic manifested through the power of dreams,\nwhen this dust is added, the reaction becomes intense.\nJust a sprinkle on the ceiling left a large scorch mark.\n\nI should record the results of this experiment, but I'm too exhausted.\nThis notion seems to cause considerable mental fatigue.\n\nI speculate it's in a similar vein to the power I've uncovered before.\nVery interesting.\nMore research is needed on the source of this power.\nPerhaps a field study will be necessary.",
    achievementName: "Reap What You Sow",
    achievementDescription:
      "Sacrifice a portion of your HP for gold at the Shrine of Disintegration 16 times.",
  },
  Gem_R_Contempt: {
    name: "Essence of Contempt",
    description:
      "The <color=yellow>damage</color> dealt by this memory increases as the target's health gets lower, up to 60%<sprite=5> <color=yellow>increase</color> when their health is 20%.",
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
    lore: "With the help of the Lucid Sect, I was able to enter a world called The Rapids.\nContrary to my expectations, the forest scenery was incredibly mystical and beautiful.\n\nHowever, it didn't take long to realize that this harmless appearance was merely a facade.\n\nThat gigantic and grotesque creature with glowing red eyes\nstood beyond the mist, irregularly twitching its maw.\n...And in a flash, it stood before us.\n\n...\nI barely managed to escape,\nbut I don't think I'll ever forget the contemptuous eyes of that creature\nas it tore people apart with its long claws.",
    achievementName: "",
    achievementDescription: "",
  },
  Gem_R_Bleak: {
    name: "Essence of Bleakness",
    description:
      "This Memory deals 50%<sprite=5> increased damage to enemies affected by <color=yellow>Cold</color>, <color=yellow>Slow</color>, <color=yellow>Bind</color>, or <color=yellow>Stun</color>.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
  Gem_L_PureWhite: {
    name: "Pure White",
    description:
      "Every 10 seconds, the <color=yellow>Cast</color> of this memory is <color=yellow>Empowered</color>. The <color=yellow>Empowered Cast</color> fires 3 <color=yellow>Projectiles</color> that deal <color=yellow>Light Damage</color> equal to 20%<sprite=5> of the <color=yellow>Damage</color> it first deals to each enemy. The number of shots increases by the number of <color=yellow>Light Stacks</color> on each target.",
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
    lore: "The numerous people who claim to have experienced \"Molting\" each describe the appearance of the dream in their own way.\n\nSome say it was a room with an endless spread of tables piled high with meat like silverware, some say all their lost family members were there, and some say it was like a garden full of mood-lifting scented tea and roses.\n\nHowever, I've never seen anyone who ate their fill of those delicious foods or brought back their longed-for family members to reality.\n\nIt's because our bodies remain in reality. Dreaming is merely our minds briefly visiting the other side. When we wake from a dream, nothing remains in our hands.\n\nIn the midst of this, the Lucid cultists made a very interesting discovery.\n\nWe can now enter dreams directly.",
    achievementName: "Empty Canvas",
    achievementDescription:
      "Enter The Pure White Dream by defeating the boss of the third region 10 times in total.",
  },
  Gem_R_Wound: {
    name: "Essence of Wound",
    description:
      "When this memory deals damage to an enemy, it applies a <color=yellow>Mark</color>. Each <color=yellow>Attack</color> on a marked target deals <sprite=1><color=#16D7FF>44%</color><sprite=5> <color=yellow>Damage</color>. After 3 attacks, the <color=yellow>Mark</color> explodes, dealing <sprite=1><color=#16D7FF>275%</color><sprite=5> <color=yellow>Damage</color> to all nearby enemies.",
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
    lore: null,
    achievementName: "Transcendent Speed",
    achievementDescription: "Reach 6 attack speed per second.",
  },
  Gem_E_Protection: {
    name: "Essence of Protection",
    description:
      "When you <color=yellow>cast</color> this memory, gain 40<sprite=5> <color=yellow>Defense</color> for 3 seconds, reducing damage taken and becoming <color=yellow>Unstoppable</color>. Can only trigger once every 5 seconds.",
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
    lore: null,
    achievementName: "Iron Body",
    achievementDescription:
      "Gain a shield equal to or greater than 300% of your maximum health, for example, by using Essence of Guidance, Essence of Spiral, and Essence of Clemency simultaneously.",
  },
  Gem_E_Fever: {
    name: "Essence of Fever",
    description:
      "When this Memory deals <color=yellow>Fire Damage</color> to an enemy, it infects them with <color=yellow>Fever</color>. Enemies infected with <color=yellow>Fever</color> explode after 2 seconds, dealing <sprite=1><color=#16D7FF>130%</color><sprite=5> <color=yellow>Fire Damage</color> to themselves and nearby enemies. For each stack of <color=yellow>Burn</color> on the target, the explosion radius increases by 30% and explosion damage increases by 10%.",
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
    lore: null,
    achievementName: "",
    achievementDescription: "",
  },
};

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
      rarityColor: getRarityColor(essence.rarity),
      ...essence,
    } as const;
  }
};

export const getEssenceRarities = () =>
  [...new Set(Object.values(essences).map(({ rarity }) => rarity))].toSorted(
    compareRarities,
  );
