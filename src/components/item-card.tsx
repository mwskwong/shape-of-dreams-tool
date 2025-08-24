import Image from "next/image";
import { type ComponentProps } from "react";
import { type SetOptional } from "type-fest";

import { type Essence } from "@/lib/essences";
import { type Memory } from "@/lib/memories";
import { cn } from "@/lib/utils";

type Item = SetOptional<
  {
    [K in keyof Memory]: K extends keyof Essence
      ? Memory[K] | Essence[K]
      : Memory[K];
  } & {
    [K in keyof Essence as Exclude<K, keyof Memory>]: Essence[K];
  },
  Exclude<keyof Memory, keyof Essence>
>;

type RootProps = ComponentProps<"div">;
const Root = ({ className, children, ...props }: RootProps) => (
  <div className={cn("card card-border", className)} {...props}>
    <div className="card-body">{children}</div>
  </div>
);

type HeaderProps = Omit<ComponentProps<"header">, "children"> &
  Pick<Item, "name" | "rarity" | "traveler" | "image">;

const rarityColors = {
  Common: "text-zinc-400",
  Rare: "text-blue-400",
  Epic: "text-purple-400",
  Legendary: "text-red-400",
} as Record<string, string>;

const Header = ({ name, image, rarity, traveler }: HeaderProps) => {
  return (
    <header className="flex gap-4">
      <Image alt="" className="avatar rounded-sm" src={image} width={48} />
      <div>
        <h2 className="card-title">{name}</h2>
        <p className={rarityColors[rarity] ?? "text-amber-400"}>
          {rarity} {traveler ? ` · ${traveler}` : undefined}
        </p>
      </div>
    </header>
  );
};

export const ItemCard = { Root, Header };
