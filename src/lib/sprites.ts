import abilityPower from "@/images/1.png";
import attackDamage from "@/images/2.png";
import health from "@/images/3.png";
import attackSpeed from "@/images/4.png";
import upgradableParameter from "@/images/5.png";
import memoryHaste from "@/images/6.png";
import armor from "@/images/7.png";

export const sprites = {
  abilityPower: {
    id: "1",
    name: "Ability Power",
    image: abilityPower,
  },
  attackDamage: {
    id: "2",
    name: "Attack Damage",
    image: attackDamage,
  },
  health: {
    id: "3",
    name: "Health",
    image: health,
  },
  attackSpeed: {
    id: "4",
    name: "Attack Speed",
    image: attackSpeed,
  },
  upgradableParameter: {
    id: "5",
    name: "Upgradeable Parameter",
    image: upgradableParameter,
  },
  memoryHaste: {
    id: "6",
    name: "Memory Haste",
    image: memoryHaste,
  },
  armor: {
    id: "7",
    name: "Armor",
    image: armor,
  },
};

export const getSpriteById = (id: string) =>
  Object.values(sprites).find((sprite) => sprite.id === id);

export const spriteMaxAspectRatio = Math.max(
  ...Object.values(sprites).map(({ image }) => image.width / image.height),
);
