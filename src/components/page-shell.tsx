import { Gem, Hammer, Menu, Sword, Wand, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ComponentProps, useId } from "react";

import icon from "@/images/icon.png";
import { cn } from "@/lib/utils";

import { DrawerLink } from "./drawer-link";

const nav = [
  { label: "Travelers", href: "/travelers", Icon: Sword },
  { label: "Memories", href: "/memories", Icon: Wand },
  { label: "Essences", href: "/essences", Icon: Gem },
  { label: "Builds", href: "/builds", Icon: Hammer },
] as const;

export type PageShellProps = ComponentProps<"div">;
export const PageShell = ({
  className,
  children,
  ...props
}: PageShellProps) => {
  const drawerToggleId = useId();

  return (
    <div className={cn("drawer drawer-end", className)} {...props}>
      <input className="drawer-toggle" id={drawerToggleId} type="checkbox" />

      <div className="drawer-content">
        <nav className="navbar bg-base-100/40 sticky top-0 container mx-auto w-full px-4 backdrop-blur-sm">
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

        <main className="container mx-auto p-4">{children}</main>

        <footer className="footer footer-center bg-base-300 text-base-content p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()}{" "}
              <a
                className="link"
                href="https://mwskwong.com"
                rel="noreferrer"
                target="_blank"
              >
                KWONG, Matthew Wang Shun
              </a>
              . Images and data copyright{" "}
              <a
                className="link"
                href="https://lizardsmoothie.com"
                rel="noreferrer"
                target="_blank"
              >
                Lizard Smoothie Co., Ltd.
              </a>{" "}
              Used under{" "}
              <a
                className="link"
                href="https://github.com/mwskwong/shape-of-dreams-tool/blob/main/LICENSE"
                rel="noreferrer"
                target="_blank"
              >
                license
              </a>
              .
            </p>
          </aside>
        </footer>
      </div>

      <div className="drawer-side p-4">
        <label
          aria-label="close sidebar"
          className="drawer-overlay -m-4 backdrop-blur-sm"
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
