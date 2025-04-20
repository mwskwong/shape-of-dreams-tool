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

import {
  allMemoryRarities,
  allMemoryTags,
  allMemoryTypes,
  allTravelers,
} from "@/lib/constants";
import { itemSearchParams } from "@/lib/utils";

import { Select } from "../select";

export type MemoriesToolbarProps = Omit<FlexProps, "children">;
export const MemoriesToolbar: FC<MemoriesToolbarProps> = (props) => {
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

  const [typesPending, typesStartTransition] = useTransition();
  const [types, setTypes] = useQueryState(
    "types",
    itemSearchParams.types.withOptions({
      startTransition: typesStartTransition,
    }),
  );

  const [travelersPending, travelersStartTransition] = useTransition();
  const [travelers, setTravelers] = useQueryState(
    "travelers",
    itemSearchParams.travelers.withOptions({
      startTransition: travelersStartTransition,
    }),
  );

  const [tagsPending, tagsStartTransition] = useTransition();
  const [tags, setTags] = useQueryState(
    "tags",
    itemSearchParams.tags.withOptions({ startTransition: tagsStartTransition }),
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
          { items: allMemoryRarities.map((rarity) => ({ value: rarity })) },
        ]}
        onReset={() => setRarities([])}
        onValueChange={setRarities}
      />
      <Select
        multiple
        loading={typesPending}
        name="Type"
        options={[{ items: allMemoryTypes.map((type) => ({ value: type })) }]}
        value={types}
        onReset={() => setTypes([])}
        onValueChange={setTypes}
      />
      <Select
        multiple
        loading={travelersPending}
        name="Traveler"
        value={travelers}
        options={[
          { items: allTravelers.map(({ id, name }) => ({ name, value: id })) },
        ]}
        onReset={() => setTravelers([])}
        onValueChange={setTravelers}
      />
      <Select
        multiple
        loading={tagsPending}
        name="Tag"
        options={[{ items: allMemoryTags.map((tag) => ({ value: tag })) }]}
        value={tags}
        onReset={() => setTags([])}
        onValueChange={setTags}
      />
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
