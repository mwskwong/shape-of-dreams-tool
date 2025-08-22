"use client";

import { Check, ChevronDown, RotateCcw, Search } from "lucide-react";
import { useQueryStates } from "nuqs";
import { type ComponentProps, useTransition } from "react";

import { cn, itemSearchParams } from "@/lib/utils";

export interface EssencesToolbarProps
  extends Omit<ComponentProps<"div">, "children"> {
  rarities?: string[];
}

export const EssencesToolbar = ({
  rarities = [],
  className,
  ...props
}: EssencesToolbarProps) => {
  const [queryStates, setQueryStates] = useQueryStates({
    search: itemSearchParams.search,
    rarities: itemSearchParams.rarities,
  });

  const [searchPending, searchStartTransition] = useTransition();
  const [raritiesPending, raritiesStartTransition] = useTransition();
  const [resetPending, resetStartTransition] = useTransition();

  return (
    <div
      className={cn("flex flex-col gap-4 sm:flex-row", className)}
      {...props}
    >
      <label className="input w-full sm:w-75">
        <Search className="shrink-0" size="1.2em" />
        <input
          placeholder="Search..."
          type="search"
          value={queryStates.search}
          onChange={(e) =>
            setQueryStates(
              (prev) => ({
                ...prev,
                search: e.currentTarget.value,
              }),
              { startTransition: searchStartTransition },
            )
          }
        />
        {searchPending && <span className="loading loading-xs shrink-0" />}
      </label>

      <div className="dropdown">
        <summary
          className="input w-full cursor-pointer select-none sm:w-auto"
          role="button"
          tabIndex={0}
        >
          Rarity
          {queryStates.rarities.length > 0 && (
            <div className="badge badge-sm badge-primary nth-1:ml-auto">
              {queryStates.rarities.length}
            </div>
          )}
          {raritiesPending ? (
            <span className="loading loading-xs nth-1:ml-auto" />
          ) : (
            <ChevronDown className="nth-1:ml-auto" size="1.2em" />
          )}
        </summary>
        <div
          className="dropdown-content bg-base-200 rounded-box z-1 mt-2 w-full p-2 shadow-sm md:w-48"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- needed by daisyUI to prevent focus loss
          tabIndex={0}
        >
          <ul className="menu w-full">
            {rarities.map((rarity) => (
              <li key={rarity}>
                <button
                  onClick={() =>
                    setQueryStates(
                      (prev) => ({
                        ...prev,
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
          </ul>
          <button
            className="btn btn-ghost"
            disabled={queryStates.rarities.length === 0}
            onClick={() =>
              setQueryStates((prev) => ({ ...prev, rarities: [] }), {
                startTransition: raritiesStartTransition,
              })
            }
          >
            Reset
          </button>
        </div>
      </div>
      <button
        className="btn btn-soft"
        disabled={
          queryStates.search === "" && queryStates.rarities.length === 0
        }
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
    </div>
  );
};
