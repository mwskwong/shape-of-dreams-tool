import { Gem, Hammer, Sword, Wand } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ComponentProps } from "react";

import icon from "@/images/Hero_Aurena.png";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Travelers", href: "/travelers", Icon: Sword },
  { label: "Memories", href: "/memories", Icon: Wand },
  { label: "Essences", href: "/essences", Icon: Gem },
  { label: "Builds", href: "/builds", Icon: Hammer },
] as const;

export type NavbarProps = Omit<ComponentProps<"nav">, "children">;
export const Navbar = ({ className, ...props }: NavbarProps) => {
  return (
    <nav className={cn("navbar w-full", className)} {...props}>
      <Link href="/">
        <Image alt="icon" src={icon} width={40} />
      </Link>
      <div className="ml-auto">
        {nav.map(({ label, href, Icon }) => (
          <Link key={label} className="btn btn-ghost btn-sm" href={href}>
            <Icon size="1.2em" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
