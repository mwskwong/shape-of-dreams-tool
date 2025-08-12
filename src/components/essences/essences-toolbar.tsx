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

import { getEssenceRarities } from "@/lib/essences";
import { itemSearchParams } from "@/lib/utils";

import { Select } from "../select";

const essenceRarityOptions = [
  { items: getEssenceRarities().map((rarity) => ({ value: rarity })) },
];

export type EssencesToolbarProps = Omit<FlexProps, "children">;
export const EssencesToolbar: FC<EssencesToolbarProps> = (props) => {
  const [queryStates, setQueryStates] = useQueryStates({
    search: itemSearchParams.search,
    rarities: itemSearchParams.rarities,
  });

  const [searchPending, searchStartTransition] = useTransition();
  const [raritiesPending, raritiesStartTransition] = useTransition();
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
        options={essenceRarityOptions}
        value={queryStates.rarities}
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
