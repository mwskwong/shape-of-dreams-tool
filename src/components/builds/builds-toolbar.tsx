"use client";

import { Badge } from "@radix-ui/themes/components/badge";
import { Button } from "@radix-ui/themes/components/button";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import * as Select from "@radix-ui/themes/components/select";
import { Separator } from "@radix-ui/themes/components/separator";
import * as TextField from "@radix-ui/themes/components/text-field";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import { groupBy } from "lodash-es";
import { useQueryState } from "nuqs";
import { type FC } from "react";

import { allEssences, allMemories, allTravelerEntries } from "@/lib/constants";
import { buildSearchParams } from "@/lib/utils";

import { CheckboxGroupSelect } from "../checkbox-group-select";

import styles from "./builds-toolbar.module.css";

export type BuildsToolbarProps = Omit<FlexProps, "children">;

const memoryOptions = Object.entries(groupBy(allMemories, "rarity")).map(
  ([rarity, memories]) => ({
    group: rarity,
    items: memories.map(({ id, name }) => ({ name, value: id })),
  }),
);

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
  const [search, setSearch] = useQueryState("search", buildSearchParams.search);
  const [travelers, setTravelers] = useQueryState(
    "travelers",
    buildSearchParams.travelers,
  );
  const [memories, setMemories] = useQueryState(
    "memories",
    buildSearchParams.memories,
  );
  const [essences, setEssences] = useQueryState(
    "essences",
    buildSearchParams.essences,
  );
  const [sort, setSort] = useQueryState("sort", buildSearchParams.sort);

  return (
    <Flex align="center" gap="3" wrap="wrap" {...props}>
      <TextField.Root
        className={styles.search}
        placeholder="Search..."
        type="search"
        value={search}
        onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
      >
        <TextField.Slot>
          <IconSearch size={16} />
        </TextField.Slot>
      </TextField.Root>
      <CheckboxGroupSelect
        value={travelers}
        options={allTravelerEntries.map(([value, { name }]) => ({
          name,
          value,
        }))}
        onReset={() => setTravelers([])}
        onValueChange={setTravelers}
      >
        Traveler
        {travelers.length > 0 && (
          <Badge color="indigo">{travelers.length}</Badge>
        )}
      </CheckboxGroupSelect>
      <CheckboxGroupSelect
        options={memoryOptions}
        value={memories}
        onReset={() => setMemories([])}
        onValueChange={setMemories}
      >
        Memory
        {memories.length > 0 && <Badge color="indigo">{memories.length}</Badge>}
      </CheckboxGroupSelect>
      <CheckboxGroupSelect
        options={essenceOptions}
        value={essences}
        onReset={() => setEssences([])}
        onValueChange={setEssences}
      >
        Essence
        {essences.length > 0 && <Badge color="indigo">{essences.length}</Badge>}
      </CheckboxGroupSelect>
      <Select.Root
        value={sort}
        onValueChange={(value) => setSort(value as "newest" | "mostLiked")}
      >
        <Select.Trigger className={styles.selectTrigger}>
          {/* WORKAROUND: prevent default value missing during SSR */}
          {sortOptions.find(({ value }) => value === sort)?.name}
          <IconChevronDown size={16} />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            {sortOptions.map(({ name, value }) => (
              <Select.Item key={value} value={value}>
                {name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
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
        }}
      >
        Reset
      </Button>
    </Flex>
  );
};
