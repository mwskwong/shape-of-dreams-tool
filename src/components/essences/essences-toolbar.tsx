"use client";

import { RotateCcw, Search } from "lucide-react";
import { debounce, useQueryStates } from "nuqs";
import { type ComponentProps, useTransition } from "react";

import { getEssenceRarities } from "@/lib/essences";
import { essencesSearchParams } from "@/lib/search-params";
import { cn } from "@/lib/utils";

import { Select } from "../select";

const rarities = getEssenceRarities();

export type EssencesToolbarProps = Omit<ComponentProps<"div">, "children">;
export const EssencesToolbar = ({
  className,
  ...props
}: EssencesToolbarProps) => {
  const [queryStates, setQueryStates] = useQueryStates(essencesSearchParams);

  const [searchPending, searchStartTransition] = useTransition();
  const [raritiesPending, raritiesStartTransition] = useTransition();
  const [resetPending, resetStartTransition] = useTransition();

  return (
    <header
      className={cn("flex flex-col gap-4 md:flex-row", className)}
      {...props}
    >
      <label className="input w-full md:w-72">
        <Search className="shrink-0" size="1.2em" />
        <input
          aria-label="Search essences"
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

      <button
        className="btn btn-soft"
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
