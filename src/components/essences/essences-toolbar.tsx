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
import { allEssenceRarities } from "@/lib/constants";
import { itemSearchParams } from "@/lib/utils";

import styles from "./essences-toolbar.module.css";

export type EssencesToolbarProps = Omit<FlexProps, "children">;

export const EssencesToolbar: FC<EssencesToolbarProps> = (props) => {
  const [search, setSearch] = useQueryState("search", itemSearchParams.search);
  const [rarities, setRarities] = useQueryState(
    "rarities",
    itemSearchParams.rarities,
  );

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
        options={allEssenceRarities.map((rarity) => ({ value: rarity }))}
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
