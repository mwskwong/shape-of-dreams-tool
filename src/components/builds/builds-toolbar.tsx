"use client";

import { Badge } from "@radix-ui/themes/components/badge";
import { Button } from "@radix-ui/themes/components/button";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import * as Select from "@radix-ui/themes/components/select";
import { Separator } from "@radix-ui/themes/components/separator";
import * as TextField from "@radix-ui/themes/components/text-field";
import { IconSearch } from "@tabler/icons-react";
import { groupBy } from "lodash-es";
import { useQueryState } from "nuqs";
import { type FC } from "react";

import {
  allEssenceEntries,
  allMemoryEntries,
  allTravelerEntries,
} from "@/lib/constants";
import { buildSearchParams } from "@/lib/utils";

import { CheckboxGroupSelect } from "../checkbox-group-select";

import styles from "./builds-toolbar.module.css";

export type BuildsToolbarProps = Omit<FlexProps, "children">;

const memoryOptions = Object.entries(
  groupBy(allMemoryEntries, "[1].rarity"),
).map(([rarity, memoryEntries]) => ({
  group: rarity,
  items: memoryEntries.map(([value, { name }]) => ({ name, value })),
}));

const essenceOptions = Object.entries(
  groupBy(allEssenceEntries, "[1].rarity"),
).map(([rarity, essenceEntries]) => ({
  group: rarity,
  items: essenceEntries.map(([value, { name }]) => ({ name, value })),
}));

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
        defaultValue="newest"
        value={sort}
        onValueChange={(value) => setSort(value as "newest" | "mostLiked")}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Item value="newest">Newest</Select.Item>
            <Select.Item value="mostLiked">Most liked</Select.Item>
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
