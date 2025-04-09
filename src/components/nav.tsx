"use client";

import * as TabNav from "@radix-ui/themes/components/tab-nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";

import { routes } from "@/lib/site-config";

export type NavProps = Omit<TabNav.RootProps, "children">;
const Nav: FC<NavProps> = (props) => {
  const pathname = usePathname();
  return (
    <TabNav.Root {...props}>
      {[routes.travelers, routes.memories, routes.essences, routes.newBuild]
        .filter(({ name }) => name)
        .map((route) => (
          <TabNav.Link
            key={route.pathname}
            asChild
            active={route.pathname === pathname}
          >
            <Link href={route.pathname}>{route.name}</Link>
          </TabNav.Link>
        ))}
    </TabNav.Root>
  );
};

export default Nav;
