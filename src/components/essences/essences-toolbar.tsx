"use client";

import { Check, ChevronDown, RotateCcw, Search } from "lucide-react";
import { debounce, useQueryStates } from "nuqs";
import { type ComponentProps, useTransition } from "react";

import { getEssenceRarities } from "@/lib/essences";
import { essencesSearchParams } from "@/lib/search-params";
import { cn } from "@/lib/utils";

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

      <div className="dropdown">
        <summary
          className="input w-full cursor-pointer select-none md:w-auto"
          role="button"
          tabIndex={0}
        >
          <span className="flex-1">Rarity</span>
          {queryStates.rarities.length > 0 && (
            <div className="badge badge-sm badge-primary">
              {queryStates.rarities.length}
            </div>
          )}
          {raritiesPending ? (
            <span className="loading loading-xs" />
          ) : (
            <ChevronDown size="1.2em" />
          )}
        </summary>
        <ul
          className="menu dropdown-content card card-border mt-2 w-full shadow-2xl md:min-w-48"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- needed by daisyUI to prevent focus loss
          tabIndex={0}
        >
          {rarities.map((rarity) => (
            <li key={rarity}>
              <button
                onClick={() =>
                  setQueryStates(
                    (prev) => ({
                      rarities: prev.rarities.includes(rarity)
                        ? prev.rarities.filter((r) => r !== rarity)
                        : [...prev.rarities, rarity],
                    }),
                    { startTransition: raritiesStartTransition },
                  )
                }
              >
                {rarity}
                {queryStates.rarities.includes(rarity) && (
                  <Check className="ml-auto" size="1.2em" />
                )}
              </button>
            </li>
          ))}
          <li />
          <li>
            <button
              className="btn btn-ghost"
              disabled={queryStates.rarities.length === 0}
              onClick={() =>
                setQueryStates(
                  { rarities: [] },
                  { startTransition: raritiesStartTransition },
                )
              }
            >
              Reset
            </button>
          </li>
        </ul>
      </div>
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
