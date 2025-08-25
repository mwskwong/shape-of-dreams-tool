"use client";

import { RotateCcw, Search } from "lucide-react";
import { debounce, useQueryStates } from "nuqs";
import { type ComponentProps, useTransition } from "react";

import {
  getMemoryRarities,
  getMemoryTags,
  getMemoryTypes,
} from "@/lib/memories";
import { memoriesSearchParams } from "@/lib/search-params";
import { getTravelerById, getTravelerIds } from "@/lib/travelers";
import { cn } from "@/lib/utils";

import { Select } from "../select";

const rarities = getMemoryRarities();
const types = getMemoryTypes();
const travelers = getTravelerIds();
const tags = getMemoryTags();

export type MemoriesToolbarProps = Omit<ComponentProps<"div">, "children">;
export const MemoriesToolbar = ({
  className,
  ...props
}: MemoriesToolbarProps) => {
  const [queryStates, setQueryStates] = useQueryStates(memoriesSearchParams);

  const [searchPending, searchStartTransition] = useTransition();
  const [raritiesPending, raritiesStartTransition] = useTransition();
  const [typesPending, typesStartTransition] = useTransition();
  const [travelersPending, travelersStartTransition] = useTransition();
  const [tagsPending, tagsStartTransition] = useTransition();
  const [resetPending, resetStartTransition] = useTransition();

  return (
    <header
      className={cn("grid grid-cols-2 gap-4 md:flex", className)}
      {...props}
    >
      <label className="input col-span-2 w-full md:w-72">
        <Search className="shrink-0" size="1.2em" />
        <input
          aria-label="Search memories"
          placeholder="Search..."
          type="search"
          value={queryStates.search}
          onChange={(e) =>
            setQueryStates(
              { search: e.currentTarget.value },
              {
                startTransition: searchStartTransition,
                limitUrlUpdates:
                  e.currentTarget.value === "" ? undefined : debounce(500),
              },
            )
          }
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              void setQueryStates(
                { search: e.currentTarget.value },
                { startTransition: searchStartTransition },
              );
            }
          }}
        />
        {searchPending && <span className="loading loading-xs shrink-0" />}
      </label>

      <Select
        label="Rarity"
        options={rarities}
        pending={raritiesPending}
        value={queryStates.rarities}
        onReset={() =>
          setQueryStates(
            { rarities: [] },
            { startTransition: raritiesStartTransition },
          )
        }
        onValueChange={(rarities) =>
          setQueryStates(
            { rarities },
            { startTransition: raritiesStartTransition },
          )
        }
      />

      <Select
        label="Type"
        options={types}
        pending={typesPending}
        value={queryStates.types}
        onReset={() =>
          setQueryStates(
            { types: [] },
            { startTransition: typesStartTransition },
          )
        }
        onValueChange={(types) =>
          setQueryStates({ types }, { startTransition: typesStartTransition })
        }
      />

      <Select
        label="Traveler"
        optionFormatter={(id) => getTravelerById(id)?.name ?? id}
        options={travelers}
        pending={travelersPending}
        value={queryStates.travelers}
        onReset={() =>
          setQueryStates(
            { travelers: [] },
            { startTransition: travelersStartTransition },
          )
        }
        onValueChange={(travelers) =>
          setQueryStates(
            { travelers },
            { startTransition: travelersStartTransition },
          )
        }
      />

      <Select
        label="Tag"
        options={tags}
        pending={tagsPending}
        value={queryStates.tags}
        onReset={() =>
          setQueryStates({ tags: [] }, { startTransition: tagsStartTransition })
        }
        onValueChange={(tags) =>
          setQueryStates({ tags }, { startTransition: tagsStartTransition })
        }
      />

      <button
        className="btn btn-soft col-span-2"
        disabled={Object.values(queryStates).every((v) => v.length === 0)}
        onClick={() =>
          // eslint-disable-next-line unicorn/no-null
          setQueryStates(null, { startTransition: resetStartTransition })
        }
      >
        {resetPending ? (
          <span className="loading loading-xs" />
        ) : (
          <RotateCcw size="1.2em" />
        )}
        Reset
      </button>
    </header>
  );
};
