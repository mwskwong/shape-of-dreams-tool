import { Gem, Hammer, Menu, Sword, Wand, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ComponentProps, useId } from "react";
import { type SetRequired } from "type-fest";

import icon from "@/images/icon.png";
import { cn } from "@/lib/utils";

import { DrawerLink } from "./drawer-link";

const nav = [
  { label: "Travelers", href: "/travelers", Icon: Sword },
  { label: "Memories", href: "/memories", Icon: Wand },
  { label: "Essences", href: "/essences", Icon: Gem },
  { label: "Builds", href: "/builds", Icon: Hammer },
] as const;

export type NavigationProps = SetRequired<ComponentProps<"div">, "children">;
export const Navigation = ({
  className,
  children,
  ...props
}: NavigationProps) => {
  const drawerToggleId = useId();

  return (
    <div className={cn("drawer drawer-end", className)} {...props}>
      <input className="drawer-toggle" id={drawerToggleId} type="checkbox" />

      <main className="drawer-content">
        <nav className="navbar bg-base-100/40 sticky top-0 w-full backdrop-blur-sm">
          <Link href="/">
            <Image alt="icon" src={icon} width={40} />
          </Link>

          <ul className="menu menu-horizontal ml-auto hidden md:inline-flex">
            {nav.map(({ label, href, Icon }) => (
              <li key={label}>
                <Link href={href}>
                  <Icon size="1.2rem" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <label
            aria-label="open sidebar"
            className="btn btn-square btn-ghost ml-auto md:hidden"
            htmlFor={drawerToggleId}
          >
            <Menu size="1.2rem" />
          </label>
        </nav>

        {children}
      </main>

      <div className="drawer-side p-4">
        <label
          aria-label="close sidebar"
          className="drawer-overlay -m-4"
          htmlFor={drawerToggleId}
        />

        <div className="bg-base-200 rounded-box flex min-h-full w-64 flex-col items-end gap-4 p-4">
          <label aria-label="close sidebar" htmlFor={drawerToggleId}>
            <X size="1.2em" />
          </label>

          <ul className="menu menu-lg w-full gap-4">
            {nav.map(({ label, href, Icon }) => (
              <li key={label}>
                <DrawerLink drawerToggleId={drawerToggleId} href={href}>
                  <Icon size="1.2rem" />
                  {label}
                </DrawerLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
