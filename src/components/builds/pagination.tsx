"use client";

import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import { Text } from "@radix-ui/themes/components/text";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { clsx } from "clsx";
import { useQueryState } from "nuqs";
import { type FC } from "react";

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
  const [page, setPage] = useQueryState("page", buildSearchParams.page);

  return (
    <Flex className={clsx(styles.root, className)} gap="1" {...props}>
      <IconButton
        highContrast
        color="gray"
        disabled={page <= 1}
        variant="ghost"
        onClick={() => setPage((page) => page - 1, { scroll: true })}
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
            onClick={() => setPage(index + 1, { scroll: true })}
          >
            <Text className={styles.number} size="2">
              {index + 1}
            </Text>
          </IconButton>
        );
      })}
      <IconButton
        highContrast
        color="gray"
        disabled={page >= pages}
        variant="ghost"
        onClick={() => setPage((page) => page + 1, { scroll: true })}
      >
        <IconChevronRight size={20} />
      </IconButton>
    </Flex>
  );
};
