import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
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

const footerLinks = [
  {
    href: "https://discord.com/channels/1239197591191683206/1351984016500195398",
    Icon: SiDiscord,
  },
  { href: "https://github.com/mwskwong/shape-of-dreams-tool", Icon: SiGithub },
];

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
        <nav className="navbar bg-base-200/40 sticky top-0 z-1 container backdrop-blur-sm">
          <Link href="/">
            <Image alt="icon" src={icon} width={40} />
          </Link>

          <ul className="menu menu-horizontal ml-auto hidden md:inline-flex">
            {nav.map(({ label, href, Icon }) => (
              <li key={label}>
                <Link href={href}>
                  <Icon size="1.2em" />
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
            <Menu size="1.2em" />
          </label>
        </nav>

        <main className="container">{children}</main>

        <footer className="footer">
          <div className="container flex flex-col items-center justify-between gap-4 py-4 text-center lg:flex-row">
            <aside>
              <p>
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  className="link link-hover"
                  href="https://mwskwong.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  KWONG, Matthew Wang Shun
                </a>
                . Images and data copyright{" "}
                <a
                  className="link link-hover"
                  href="https://lizardsmoothie.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  Lizard Smoothie Co., Ltd.
                </a>{" "}
                Used under{" "}
                <a
                  className="link link-hover"
                  href="https://github.com/mwskwong/shape-of-dreams-tool/blob/main/LICENSE"
                  rel="noreferrer"
                  target="_blank"
                >
                  license
                </a>
                .
              </p>
            </aside>
            <nav className="flex">
              {footerLinks.map(({ href, Icon }) => (
                <a
                  key={href}
                  className="btn btn-square btn-ghost"
                  href={href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon size="1.1em" />
                </a>
              ))}
            </nav>
          </div>
        </footer>
      </div>

      <div className="drawer-side p-4">
        <label
          aria-label="close sidebar"
          className="drawer-overlay -m-4 backdrop-blur-sm"
          htmlFor={drawerToggleId}
        />

        <div className="card card-border min-h-full w-72 items-end gap-4 shadow-2xl">
          <label
            aria-label="close sidebar"
            className="btn btn-square btn-ghost mt-3 mr-3"
            htmlFor={drawerToggleId}
          >
            <X size="1.2em" />
          </label>

          <ul className="menu menu-lg w-full gap-4">
            {nav.map(({ label, href, Icon }) => (
              <li key={href}>
                <DrawerLink drawerToggleId={drawerToggleId} href={href}>
                  <Icon size="1.2em" />
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
