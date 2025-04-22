"use client";

import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Separator } from "@radix-ui/themes/components/separator";
import { Spinner } from "@radix-ui/themes/components/spinner";
import * as TextField from "@radix-ui/themes/components/text-field";
import { IconSearch } from "@tabler/icons-react";
import { groupBy } from "lodash-es";
import { useQueryState } from "nuqs";
import { type FC, useTransition } from "react";

import { allEssences, allMemories, allTravelers } from "@/lib/constants";
import { buildSearchParams } from "@/lib/utils";

import { Select } from "../select";

import styles from "./builds-toolbar.module.css";

export type BuildsToolbarProps = Omit<FlexProps, "children">;

const memoryOptions = Object.entries(
  groupBy(
    allMemories.filter(({ id }) => id !== "St_C_Sneeze"),
    "rarity",
  ),
).map(([rarity, memories]) => ({
  group: rarity,
  items: memories.map(({ id, name }) => ({ name, value: id })),
}));

const essenceOptions = Object.entries(groupBy(allEssences, "rarity")).map(
  ([rarity, essences]) => ({
    group: rarity,
    items: essences.map(({ id, name }) => ({ name, value: id })),
  }),
);

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Most Liked", value: "mostLiked" },
];

export const BuildsToolbar: FC<BuildsToolbarProps> = (props) => {
  const [searchPending, searchStartTransition] = useTransition();
  const [search, setSearch] = useQueryState(
    "search",
    buildSearchParams.search.withOptions({
      startTransition: searchStartTransition,
    }),
  );

  const [travelersPending, travelersStartTransition] = useTransition();
  const [travelers, setTravelers] = useQueryState(
    "travelers",
    buildSearchParams.travelers.withOptions({
      startTransition: travelersStartTransition,
    }),
  );

  const [memoriesPending, memoriesStartTransition] = useTransition();
  const [memories, setMemories] = useQueryState(
    "memories",
    buildSearchParams.memories.withOptions({
      startTransition: memoriesStartTransition,
    }),
  );

  const [essencesPending, essencesStartTransition] = useTransition();
  const [essences, setEssences] = useQueryState(
    "essences",
    buildSearchParams.essences.withOptions({
      startTransition: essencesStartTransition,
    }),
  );

  const [sortPending, sortStartTransition] = useTransition();
  const [sort, setSort] = useQueryState(
    "sort",
    buildSearchParams.sort.withOptions({
      startTransition: sortStartTransition,
    }),
  );

  const [, setPage] = useQueryState("page", buildSearchParams.page);

  return (
    <Flex align="center" gap="3" wrap="wrap" {...props}>
      <Box asChild width={{ initial: "100%", xs: "250px" }}>
        <TextField.Root
          className={styles.search}
          placeholder="Search..."
          type="search"
          value={search}
          onInput={(e) => {
            void setSearch((e.target as HTMLInputElement).value);
            void setPage(1);
          }}
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
        value={travelers}
        options={[
          { items: allTravelers.map(({ id, name }) => ({ name, value: id })) },
        ]}
        onReset={() => {
          void setTravelers([]);
          void setPage(1);
        }}
        onValueChange={(value) => {
          void setTravelers(value);
          void setPage(1);
        }}
      />
      <Select
        multiple
        loading={memoriesPending}
        name="Memory"
        options={memoryOptions}
        value={memories}
        onReset={() => {
          void setMemories([]);
          void setPage(1);
        }}
        onValueChange={(value) => {
          void setMemories(value);
          void setPage(1);
        }}
      />
      <Select
        multiple
        loading={essencesPending}
        name="Essence"
        options={essenceOptions}
        value={essences}
        onReset={() => {
          void setEssences([]);
          void setPage(1);
        }}
        onValueChange={(value) => {
          void setEssences(value);
          void setPage(1);
        }}
      />
      <Select
        loading={sortPending}
        name="Sort"
        options={[{ items: sortOptions }]}
        value={[sort]}
        onValueChange={([value]) => setSort(value as typeof sort)}
      />
      <Separator orientation="vertical" size="2" />
      <Button
        color="gray"
        variant="ghost"
        onClick={() => {
          void setSearch("");
          void setTravelers([]);
          void setMemories([]);
          void setEssences([]);
          void setSort("newest");
          void setPage(1);
        }}
      >
        Reset
      </Button>
    </Flex>
  );
};
