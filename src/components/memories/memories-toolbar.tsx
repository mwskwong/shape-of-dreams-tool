"use client";

import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Separator } from "@radix-ui/themes/components/separator";
import { Spinner } from "@radix-ui/themes/components/spinner";
import * as TextField from "@radix-ui/themes/components/text-field";
import { IconSearch } from "@tabler/icons-react";
import { useQueryStates } from "nuqs";
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
  const [queryStates, setQueryStates] = useQueryStates(itemSearchParams);

  const [searchPending, searchStartTransition] = useTransition();
  const [raritiesPending, raritiesStartTransition] = useTransition();
  const [typesPending, typesStartTransition] = useTransition();
  const [travelersPending, travelersStartTransition] = useTransition();
  const [tagsPending, tagsStartTransition] = useTransition();
  const [resetPending, resetStartTransition] = useTransition();

  return (
    <Flex align="center" gap="3" wrap="wrap" {...props}>
      <Box asChild width={{ initial: "100%", xs: "250px" }}>
        <TextField.Root
          placeholder="Search..."
          type="search"
          value={queryStates.search}
          onInput={(e) =>
            setQueryStates(
              (prev) => ({
                ...prev,
                search: (e.target as HTMLInputElement).value,
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
        loading={raritiesPending}
        name="Rarity"
        value={queryStates.rarities}
        options={[
          { items: allMemoryRarities.map((rarity) => ({ value: rarity })) },
        ]}
        onReset={() =>
          setQueryStates(
            (prev) => ({
              ...prev,
              rarities: [],
            }),
            { startTransition: raritiesStartTransition },
          )
        }
        onValueChange={(rarities) =>
          setQueryStates(
            (prev) => ({
              ...prev,
              rarities,
            }),
            { startTransition: raritiesStartTransition },
          )
        }
      />
      <Select
        multiple
        loading={typesPending}
        name="Type"
        options={[{ items: allMemoryTypes.map((type) => ({ value: type })) }]}
        value={queryStates.types}
        onReset={() =>
          setQueryStates(
            (prev) => ({
              ...prev,
              types: [],
            }),
            { startTransition: typesStartTransition },
          )
        }
        onValueChange={(types) =>
          setQueryStates(
            (prev) => ({
              ...prev,
              types,
            }),
            { startTransition: typesStartTransition },
          )
        }
      />
      <Select
        multiple
        loading={travelersPending}
        name="Traveler"
        value={queryStates.travelers}
        options={[
          { items: allTravelers.map(({ id, name }) => ({ name, value: id })) },
        ]}
        onReset={() =>
          setQueryStates(
            (prev) => ({
              ...prev,
              travelers: [],
            }),
            { startTransition: travelersStartTransition },
          )
        }
        onValueChange={(travelers) =>
          setQueryStates(
            (prev) => ({
              ...prev,
              travelers,
            }),
            { startTransition: travelersStartTransition },
          )
        }
      />
      <Select
        multiple
        loading={tagsPending}
        name="Tag"
        options={[{ items: allMemoryTags.map((tag) => ({ value: tag })) }]}
        value={queryStates.tags}
        onReset={() =>
          setQueryStates(
            (prev) => ({
              ...prev,
              tags: [],
            }),
            { startTransition: tagsStartTransition },
          )
        }
        onValueChange={(tags) =>
          setQueryStates(
            (prev) => ({
              ...prev,
              tags,
            }),
            { startTransition: tagsStartTransition },
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
