"use client";

import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Separator } from "@radix-ui/themes/components/separator";
import { Spinner } from "@radix-ui/themes/components/spinner";
import * as TextField from "@radix-ui/themes/components/text-field";
import { IconSearch } from "@tabler/icons-react";
import { groupBy } from "lodash-es";
import { useQueryStates } from "nuqs";
import { type FC, useTransition } from "react";

import { getEssences } from "@/lib/essences";
import { getMemories } from "@/lib/memories";
import { getTravelers } from "@/lib/travelers";
import { buildSearchParams } from "@/lib/utils";

import { Select } from "../select";

import styles from "./builds-toolbar.module.css";

export type BuildsToolbarProps = Omit<FlexProps, "children">;

const memoryOptions = Object.entries(
  groupBy(
    getMemories().filter(({ id }) => id !== "St_C_Sneeze"),
    "rarity",
  ),
).map(([rarity, memories]) => ({
  group: rarity,
  items: memories.map(({ id, name }) => ({ name, value: id })),
}));

const essenceOptions = Object.entries(groupBy(getEssences(), "rarity")).map(
  ([rarity, essences]) => ({
    group: rarity,
    items: essences.map(({ id, name }) => ({ name, value: id })),
  }),
);

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Most Liked", value: "mostLiked" },
];

const travelers = getTravelers();

export const BuildsToolbar: FC<BuildsToolbarProps> = (props) => {
  const [queryStates, setQueryStates] = useQueryStates(buildSearchParams);

  const [searchPending, searchStartTransition] = useTransition();
  const [travelersPending, travelersStartTransition] = useTransition();
  const [memoriesPending, memoriesStartTransition] = useTransition();
  const [essencesPending, essencesStartTransition] = useTransition();
  const [sortPending, sortStartTransition] = useTransition();
  const [resetPending, resetStartTransition] = useTransition();

  return (
    <Flex align="center" gap="3" wrap="wrap" {...props}>
      <Box asChild width={{ initial: "100%", xs: "250px" }}>
        <TextField.Root
          className={styles.search}
          placeholder="Search..."
          type="search"
          value={queryStates.search}
          onInput={(e) =>
            setQueryStates(
              (prev) => ({
                ...prev,
                search: (e.target as HTMLInputElement).value,
                page: 1,
              }),
              { startTransition: searchStartTransition },
            )
          }
        >
          <TextField.Slot>
            <IconSearch size={16} />
          </TextField.Slot>
          <TextField.Slot>
            <Spinner loading={searchPending} />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      <Select
        multiple
        loading={travelersPending}
        name="Traveler"
        value={queryStates.travelers}
        options={[
          { items: travelers.map(({ id, name }) => ({ name, value: id })) },
        ]}
        onReset={() =>
          setQueryStates(
            (prev) => ({
              ...prev,
              travelers: [],
              page: 1,
            }),
            { startTransition: travelersStartTransition },
          )
        }
        onValueChange={(travelers) =>
          setQueryStates(
            (prev) => ({
              ...prev,
              travelers,
              page: 1,
            }),
            { startTransition: travelersStartTransition },
          )
        }
      />
      <Select
        multiple
        loading={memoriesPending}
        name="Memory"
        options={memoryOptions}
        value={queryStates.memories}
        onReset={() =>
          setQueryStates(
            (prev) => ({
              ...prev,
              memories: [],
              page: 1,
            }),
            { startTransition: memoriesStartTransition },
          )
        }
        onValueChange={(memories) =>
          setQueryStates(
            (prev) => ({
              ...prev,
              memories,
              page: 1,
            }),
            { startTransition: memoriesStartTransition },
          )
        }
      />
      <Select
        multiple
        loading={essencesPending}
        name="Essence"
        options={essenceOptions}
        value={queryStates.essences}
        onReset={() =>
          setQueryStates(
            (prev) => ({
              ...prev,
              essences: [],
              page: 1,
            }),
            { startTransition: essencesStartTransition },
          )
        }
        onValueChange={(essences) =>
          setQueryStates(
            (prev) => ({
              ...prev,
              essences,
              page: 1,
            }),
            { startTransition: essencesStartTransition },
          )
        }
      />
      <Select
        loading={sortPending}
        name="Sort"
        options={[{ items: sortOptions }]}
        value={[queryStates.sort]}
        onValueChange={([sort]) =>
          setQueryStates(
            (prev) => ({
              ...prev,
              sort: sort as typeof queryStates.sort,
              page: 1,
            }),
            { startTransition: sortStartTransition },
          )
        }
      />
      <Separator orientation="vertical" size="2" />
      <Button
        color="gray"
        variant="ghost"
        onClick={() =>
          // eslint-disable-next-line unicorn/no-null
          setQueryStates(null, { startTransition: resetStartTransition })
        }
      >
        Reset
        <Spinner loading={resetPending} />
      </Button>
    </Flex>
  );
};
