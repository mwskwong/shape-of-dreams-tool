"use client";

import * as TabNav from "@radix-ui/themes/components/tab-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";

const paths = [
  {
    name: "Travelers",
    href: "/travelers",
  },
  {
    name: "Memories",
    href: "/memories",
  },
  {
    name: "Essences",
    href: "/essences",
  },
];

export type NavProps = Omit<TabNav.RootProps, "children">;
const Nav: FC<NavProps> = (props) => {
  const pathname = usePathname();
  return (
    <TabNav.Root {...props}>
      {paths.map((path) => (
        <TabNav.Link key={path.href} asChild active={path.href === pathname}>
          <Link href={path.href}>{path.name}</Link>
        </TabNav.Link>
      ))}
    </TabNav.Root>
  );
};

export default Nav;
