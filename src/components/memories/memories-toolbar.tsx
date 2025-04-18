"use client";

import { Badge } from "@radix-ui/themes/components/badge";
import { Button } from "@radix-ui/themes/components/button";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Separator } from "@radix-ui/themes/components/separator";
import * as TextField from "@radix-ui/themes/components/text-field";
import { IconSearch } from "@tabler/icons-react";
import { useQueryState } from "nuqs";
import { type FC } from "react";

import { CheckboxGroupSelect } from "@/components/checkbox-group-select";
import {
  allMemoryRarities,
  allMemoryTags,
  allMemoryTypes,
  allTravelerEntries,
} from "@/lib/constants";
import { searchParams } from "@/lib/utils";

import styles from "./memories-toolbar.module.css";

export type MemoriesToolbarProps = Omit<FlexProps, "children">;
export const MemoriesToolbar: FC<MemoriesToolbarProps> = (props) => {
  const [search, setSearch] = useQueryState("search", searchParams.search);
  const [rarities, setRarities] = useQueryState(
    "rarities",
    searchParams.rarities,
  );
  const [types, setTypes] = useQueryState("types", searchParams.types);
  const [travelers, setTravelers] = useQueryState(
    "travelers",
    searchParams.travelers,
  );
  const [tags, setTags] = useQueryState("tags", searchParams.tags);

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
        options={allMemoryRarities.map((rarity) => ({ value: rarity }))}
        value={rarities}
        onReset={() => setRarities([])}
        onValueChange={setRarities}
      >
        Rarity
        {rarities.length > 0 && <Badge color="indigo">{rarities.length}</Badge>}
      </CheckboxGroupSelect>
      <CheckboxGroupSelect
        options={allMemoryTypes.map((type) => ({ value: type }))}
        value={types}
        onReset={() => setTypes([])}
        onValueChange={setTypes}
      >
        Type
        {types.length > 0 && <Badge color="indigo">{types.length}</Badge>}
      </CheckboxGroupSelect>
      <CheckboxGroupSelect
        value={travelers}
        options={allTravelerEntries.map(([key, { name }]) => ({
          value: key,
          name,
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
        options={allMemoryTags.map((tag) => ({ value: tag }))}
        value={tags}
        onReset={() => setTags([])}
        onValueChange={setTags}
      >
        Tag
        {tags.length > 0 && <Badge color="indigo">{tags.length}</Badge>}
      </CheckboxGroupSelect>
      <Separator orientation="vertical" size="2" />
      <Button
        color="gray"
        variant="ghost"
        onClick={() => {
          void setSearch("");
          void setRarities([]);
          void setTypes([]);
          void setTravelers([]);
          void setTags([]);
        }}
      >
        Reset
      </Button>
    </Flex>
  );
};
