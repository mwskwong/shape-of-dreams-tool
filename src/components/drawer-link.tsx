/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-has-content */

"use client";

import Link, { type LinkProps } from "next/link";

export interface DrawerLinkProps<T> extends LinkProps<T> {
  drawerToggleId: string;
}

export const DrawerLink = <T,>({
  drawerToggleId,
  onClick,
  ...props
}: DrawerLinkProps<T>) => (
  <Link
    onClick={(event) => {
      const toggle = document.querySelector(`#${CSS.escape(drawerToggleId)}`);
      if (toggle instanceof HTMLInputElement) {
        toggle.checked = !toggle.checked;
      }

      onClick?.(event);
    }}
    {...props}
  />
);

/* eslint-enable jsx-a11y/no-static-element-interactions */
/* eslint-enable jsx-a11y/click-events-have-key-events */
/* eslint-enable jsx-a11y/anchor-has-content */
