"use client";

import * as TabNav from "@radix-ui/themes/components/tab-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";

const paths = [
  {
    name: "Memories",
    href: "/memories",
  },
  {
    name: "Essences",
    href: "/essences",
  },
];

const Nav: FC = () => {
  const pathname = usePathname();
  return (
    <TabNav.Root>
      {paths.map((path) => (
        <TabNav.Link key={path.href} asChild active={path.href === pathname}>
          <Link href={path.href}>{path.name}</Link>
        </TabNav.Link>
      ))}
    </TabNav.Root>
  );
};

export default Nav;
