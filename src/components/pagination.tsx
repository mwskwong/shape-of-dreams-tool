"use client";

import { Box } from "@radix-ui/themes/components/box";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import { Spinner } from "@radix-ui/themes/components/spinner";
import { Text } from "@radix-ui/themes/components/text";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDots,
} from "@tabler/icons-react";
import { clsx } from "clsx";
import { range } from "lodash-es";
import { useQueryState } from "nuqs";
import { type FC, useEffect, useTransition } from "react";

import { buildSearchParams } from "@/lib/utils";

import styles from "./pagination.module.css";

type Item = number | "start-ellipsis" | "end-ellipsis";
export interface PaginationProps
  extends Omit<FlexProps, "asChild" | "children"> {
  pages?: number;
}

const boundaryCount = 1;
const siblingCount = 1;

export const Pagination: FC<PaginationProps> = ({
  pages = 1,
  className,
  ...props
}) => {
  const [pending, startTransition] = useTransition();
  const [page, setPage] = useQueryState(
    "page",
    buildSearchParams.page.withOptions({ startTransition }),
  );

  useEffect(() => {
    if (!pending) {
      window.scrollTo(0, 0);
    }
  }, [pending]);

  // Ref: https://github.com/mui/material-ui/blob/master/packages/mui-material/src/usePagination/usePagination.js

  const startPages = range(1, Math.min(boundaryCount, pages) + 1);
  const endPages = range(
    Math.max(pages - boundaryCount + 1, boundaryCount + 1),
    pages + 1,
  );
  const siblingsStart = Math.max(
    Math.min(page - siblingCount, pages - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    pages - boundaryCount - 1,
  );

  const items: Item[] = [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? (["start-ellipsis"] as const)
      : boundaryCount + 1 < pages - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd + 1),
    ...(siblingsEnd < pages - boundaryCount - 1
      ? (["end-ellipsis"] as const)
      : pages - boundaryCount > boundaryCount
        ? [pages - boundaryCount]
        : []),
    ...endPages,
  ];

  return (
    <Flex
      align="center"
      className={clsx(styles.root, className)}
      gap="1"
      {...props}
    >
      <Spinner loading={pending} />
      <IconButton
        highContrast
        aria-label="previous page"
        color="gray"
        disabled={page <= 1}
        variant="ghost"
        onClick={() => setPage((page) => page - 1)}
      >
        <IconChevronLeft size={20} />
      </IconButton>
      {items.map((item) => {
        if (item === "start-ellipsis" || item === "end-ellipsis") {
          return (
            <Box key={item} className={styles.ellipsisContainer}>
              <IconDots size={20} />
            </Box>
          );
        }

        const active = page === item;
        return (
          <IconButton
            key={item}
            color={active ? undefined : "gray"}
            highContrast={!active}
            variant={active ? undefined : "ghost"}
            onClick={() => setPage(item)}
          >
            <Box asChild minWidth="20px">
              <Text size="2">{item}</Text>
            </Box>
          </IconButton>
        );
      })}
      <IconButton
        highContrast
        aria-label="next page"
        color="gray"
        disabled={page >= pages}
        variant="ghost"
        onClick={() => setPage((page) => page + 1)}
      >
        <IconChevronRight size={20} />
      </IconButton>
    </Flex>
  );
};
