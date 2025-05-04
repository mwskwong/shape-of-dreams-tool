"use client";

import { Badge } from "@radix-ui/themes/components/badge";
import { Box } from "@radix-ui/themes/components/box";
import { Button, type ButtonProps } from "@radix-ui/themes/components/button";
import { Flex } from "@radix-ui/themes/components/flex";
import { Inset } from "@radix-ui/themes/components/inset";
import * as Popover from "@radix-ui/themes/components/popover";
import { Reset } from "@radix-ui/themes/components/reset";
import { ScrollArea } from "@radix-ui/themes/components/scroll-area";
import { Separator } from "@radix-ui/themes/components/separator";
import { Spinner } from "@radix-ui/themes/components/spinner";
import { Text } from "@radix-ui/themes/components/text";
import * as TextField from "@radix-ui/themes/components/text-field";
import { IconCheck, IconChevronDown, IconSearch } from "@tabler/icons-react";
import { clsx } from "clsx";
import {
  type FC,
  type MouseEventHandler,
  useDeferredValue,
  useState,
} from "react";

import styles from "./select.module.css";

export interface SelectProps extends ButtonProps {
  options?: { group?: string; items: { value: string; name?: string }[] }[];
  loading?: boolean;
  name?: string;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  onReset?: MouseEventHandler<HTMLButtonElement>;
  multiple?: boolean;
}

export const Select: FC<SelectProps> = ({
  options: optionsProp = [],
  loading = false,
  name,
  value = [],
  onValueChange,
  onReset,
  multiple,
  className,
  ...props
}) => {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const numberOfOptions = optionsProp.reduce(
    (total, { items }) => total + items.length,
    0,
  );
  const showSearch = numberOfOptions > 7;
  const showReset = multiple;

  const options = showSearch
    ? optionsProp
        .map(({ group, items }) => ({
          group,
          items: items.filter(({ name, value }) =>
            (name ?? value)
              .toLowerCase()
              .includes(deferredSearch.toLowerCase()),
          ),
        }))
        .filter(({ items }) => items.length > 0)
    : optionsProp;

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button
          className={clsx("rt-SelectTrigger", className)}
          color="gray"
          variant="surface"
          {...props}
        >
          {multiple ? (
            <>
              {name}
              {value.length > 0 && <Badge color="indigo">{value.length}</Badge>}
            </>
          ) : (
            (optionsProp
              .flatMap(({ items }) => items)
              .find((item) => item.value === value[0])?.name ?? value)
          )}
          <Spinner loading={loading}>
            <IconChevronDown size={16} />
          </Spinner>
        </Button>
      </Popover.Trigger>

      <Popover.Content>
        <Flex
          direction="column"
          gap="3"
          mb={showReset ? undefined : "-2"}
          mt={showSearch ? undefined : "-2"}
        >
          {showSearch && (
            <TextField.Root
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            >
              <TextField.Slot>
                <IconSearch size={16} />
              </TextField.Slot>
            </TextField.Root>
          )}
          <Inset side="x">
            <Box asChild maxHeight="250px">
              <ScrollArea type="auto">
                {options.map(({ group = "", items }, index) => (
                  <Box key={group} mx="2">
                    {index > 0 && <Separator mb="2" mt="1" size="4" />}
                    {group && (
                      <Box asChild px="2">
                        <Text color="gray" size="1">
                          {group}
                        </Text>
                      </Box>
                    )}
                    {items.map((item) => {
                      const selected = value.includes(item.value);
                      const itemElement = (
                        <Flex
                          key={multiple ? item.value : undefined}
                          asChild
                          align="center"
                          className={styles.item}
                          gap="3"
                          height="32px"
                          justify="between"
                          px="2"
                          width="100%"
                        >
                          <Reset>
                            <button
                              onClick={() => {
                                if (!multiple) {
                                  onValueChange?.([item.value]);
                                  return;
                                }

                                if (selected) {
                                  onValueChange?.(
                                    value.filter((v) => v !== item.value),
                                  );
                                } else {
                                  onValueChange?.([...value, item.value]);
                                }
                              }}
                            >
                              <Text size="2">{item.name ?? item.value}</Text>
                              {selected ? (
                                <IconCheck size={16} />
                              ) : (
                                <Box width="16px" />
                              )}
                            </button>
                          </Reset>
                        </Flex>
                      );

                      return multiple ? (
                        itemElement
                      ) : (
                        <Popover.Close key={item.value}>
                          {itemElement}
                        </Popover.Close>
                      );
                    })}
                  </Box>
                ))}
              </ScrollArea>
            </Box>
          </Inset>

          {showReset && (
            <Popover.Close>
              <Button color="gray" variant="ghost" onClick={onReset}>
                Reset
              </Button>
            </Popover.Close>
          )}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};
