"use client";

import { Check, ChevronDown, RotateCcw, Search } from "lucide-react";
import { debounce, useQueryStates } from "nuqs";
import { type ComponentProps, useTransition } from "react";

import {
  getMemoryRarities,
  getMemoryTags,
  getMemoryTypes,
} from "@/lib/memories";
import { memoriesSearchParams } from "@/lib/search-params";
import { getTravelerIds } from "@/lib/travelers";
import { cn } from "@/lib/utils";

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

  const selects = [
    {
      pending: raritiesPending,
      options: rarities,
      label: "Rarity",
      value: queryStates.rarities,
      onValueChange: (rarity: (typeof rarities)[number]) =>
        setQueryStates(
          (prev) => ({
            ...prev,
            rarities: prev.rarities.includes(rarity)
              ? prev.rarities.filter((r) => r !== rarity)
              : [...prev.rarities, rarity],
          }),
          { startTransition: raritiesStartTransition },
        ),
      onReset: () =>
        setQueryStates((prev) => ({ ...prev, rarities: [] }), {
          startTransition: raritiesStartTransition,
        }),
    },
    {
      pending: typesPending,
      options: types,
      label: "Type",
      value: queryStates.types,
      onValueChange: (type: (typeof types)[number]) =>
        setQueryStates(
          (prev) => ({
            ...prev,
            types: prev.types.includes(type)
              ? prev.types.filter((t) => t !== type)
              : [...prev.types, type],
          }),
          { startTransition: typesStartTransition },
        ),
      onReset: () =>
        setQueryStates((prev) => ({ ...prev, types: [] }), {
          startTransition: typesStartTransition,
        }),
    },
    {
      pending: travelersPending,
      options: travelers,
      label: "Traveler",
      value: queryStates.travelers,
      onValueChange: (traveler: (typeof travelers)[number]) =>
        setQueryStates(
          (prev) => ({
            ...prev,
            travelers: prev.travelers.includes(traveler)
              ? prev.travelers.filter((t) => t !== traveler)
              : [...prev.travelers, traveler],
          }),
          { startTransition: travelersStartTransition },
        ),
      onReset: () =>
        setQueryStates((prev) => ({ ...prev, travelers: [] }), {
          startTransition: travelersStartTransition,
        }),
    },
    {
      pending: tagsPending,
      options: tags,
      label: "Tag",
      value: queryStates.tags,
      onValueChange: (tag: (typeof tags)[number]) =>
        setQueryStates(
          (prev) => ({
            ...prev,
            tags: prev.tags.includes(tag)
              ? prev.tags.filter((t) => t !== tag)
              : [...prev.tags, tag],
          }),
          { startTransition: tagsStartTransition },
        ),
      onReset: () =>
        setQueryStates((prev) => ({ ...prev, tags: [] }), {
          startTransition: tagsStartTransition,
        }),
    },
  ] as const;

  return (
    <header className={cn("grid grid-cols-2 gap-4", className)} {...props}>
      <label className="input col-span-2 w-full">
        <Search className="shrink-0" size="1.2em" />
        <input
          aria-label="Search memories"
          placeholder="Search..."
          type="search"
          value={queryStates.search}
          onChange={(e) =>
            setQueryStates(
              (prev) => ({
                ...prev,
                search: e.currentTarget.value,
              }),
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
                (prev) => ({
                  ...prev,
                  search: e.currentTarget.value,
                }),
                { startTransition: searchStartTransition },
              );
            }
          }}
        />
        {searchPending && <span className="loading loading-xs shrink-0" />}
      </label>

      {selects.map(
        ({ pending, options, label, value, onValueChange, onReset }) => (
          <div key={label} className="dropdown">
            <summary
              className="input cursor-pointer select-none"
              role="button"
              tabIndex={0}
            >
              <span className="flex-1">{label}</span>
              {value.length > 0 && (
                <div className="badge badge-sm badge-primary">
                  {value.length}
                </div>
              )}
              {pending ? (
                <span className="loading loading-xs" />
              ) : (
                <ChevronDown size="1.2em" />
              )}
            </summary>
            <ul
              className="menu dropdown-content card card-border mt-2 max-h-64 w-full overflow-x-auto shadow-2xl sm:min-w-48"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- needed by daisyUI to prevent focus loss
              tabIndex={0}
            >
              {options.map((option) => (
                <li key={option}>
                  <button onClick={() => onValueChange(option)}>
                    {option}
                    {value.includes(option) && (
                      <Check className="ml-auto" size="1.2em" />
                    )}
                  </button>
                </li>
              ))}
              <li />
              <li>
                <button
                  className="btn btn-ghost"
                  disabled={value.length === 0}
                  onClick={() => onReset()}
                >
                  Reset
                </button>
              </li>
            </ul>
          </div>
        ),
      )}
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
