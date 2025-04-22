"use client";

import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Separator } from "@radix-ui/themes/components/separator";
import { Spinner } from "@radix-ui/themes/components/spinner";
import * as TextField from "@radix-ui/themes/components/text-field";
import { IconSearch } from "@tabler/icons-react";
import { useQueryState } from "nuqs";
import { type FC, useTransition } from "react";

import { allEssenceRarities } from "@/lib/constants";
import { itemSearchParams } from "@/lib/utils";

import { Select } from "../select";

export type EssencesToolbarProps = Omit<FlexProps, "children">;

export const EssencesToolbar: FC<EssencesToolbarProps> = (props) => {
  const [searchPending, searchStartTransition] = useTransition();
  const [search, setSearch] = useQueryState(
    "search",
    itemSearchParams.search.withOptions({
      startTransition: searchStartTransition,
    }),
  );

  const [raritiesPending, raritiesStartTransition] = useTransition();
  const [rarities, setRarities] = useQueryState(
    "rarities",
    itemSearchParams.rarities.withOptions({
      startTransition: raritiesStartTransition,
    }),
  );

  return (
    <Flex align="center" gap="3" wrap="wrap" {...props}>
      <Box asChild width={{ initial: "100%", xs: "250px" }}>
        <TextField.Root
          placeholder="Search..."
          type="search"
          value={search}
          onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
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
        loading={raritiesPending}
        name="Rarity"
        value={rarities}
        options={[
          { items: allEssenceRarities.map((rarity) => ({ value: rarity })) },
        ]}
        onReset={() => setRarities([])}
        onValueChange={setRarities}
      />
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
