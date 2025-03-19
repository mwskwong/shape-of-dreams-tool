"use client";

import { Badge } from "@radix-ui/themes/components/badge";
import { Button } from "@radix-ui/themes/components/button";
import { Flex } from "@radix-ui/themes/components/flex";
import { Separator } from "@radix-ui/themes/components/separator";
import * as TextField from "@radix-ui/themes/components/text-field";
import { IconSearch } from "@tabler/icons-react";
import { useQueryState } from "nuqs";
import { type FC } from "react";

import { CheckboxGroupSelect } from "@/components/checkbox-group-select";
import { compareRarities, searchParams } from "@/lib/utils";
import essences from "@public/data/essences.json";

import styles from "./toolbar.module.css";

const allRarities = [
  ...new Set(Object.values(essences).map(({ rarity }) => rarity)),
].toSorted(compareRarities);

export const Toolbar: FC = () => {
  const [search, setSearch] = useQueryState("search", searchParams.search);
  const [rarities, setRarities] = useQueryState(
    "rarities",
    searchParams.rarities,
  );

  return (
    <Flex align="center" gap="3" wrap="wrap">
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
        options={allRarities.map((rarity) => ({ value: rarity }))}
        value={rarities}
        onReset={() => setRarities([])}
        onValueChange={setRarities}
      >
        Rarity
        {rarities.length > 0 && <Badge color="indigo">{rarities.length}</Badge>}
      </CheckboxGroupSelect>
      <Separator orientation="vertical" size="2" />
      <Button
        color="gray"
        variant="ghost"
        onClick={() => {
          void setSearch("");
          void setRarities([]);
        }}
      >
        Reset
      </Button>
    </Flex>
  );
};
