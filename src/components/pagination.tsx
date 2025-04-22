"use client";

import { Box } from "@radix-ui/themes/components/box";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import { Spinner } from "@radix-ui/themes/components/spinner";
import { Text } from "@radix-ui/themes/components/text";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { clsx } from "clsx";
import { useQueryState } from "nuqs";
import { type FC, useEffect, useTransition } from "react";

import { buildSearchParams } from "@/lib/utils";

import styles from "./pagination.module.css";

export interface PaginationProps
  extends Omit<FlexProps, "asChild" | "children"> {
  pages?: number;
}

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
      {Array.from({ length: pages }, (_, index) => {
        const active = page === index + 1;
        return (
          <IconButton
            key={index}
            color={active ? undefined : "gray"}
            highContrast={!active}
            variant={active ? undefined : "ghost"}
            onClick={() => setPage(index + 1)}
          >
            <Box asChild minWidth="20px">
              <Text size="2">{index + 1}</Text>
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
