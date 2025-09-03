"use client";

import { RotateCcw, Search } from "lucide-react";
import { debounce, useQueryStates } from "nuqs";
import { type ComponentProps, useId, useTransition } from "react";

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

const levelSliderConfig = {
  min: memoriesSearchParams.level.defaultValue,
  max: 10,
  step: 1,
};

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
  const [levelPending, levelStartTransition] = useTransition();
  const [resetPending, resetStartTransition] = useTransition();

  const levelSliderId = useId();

  return (
    <header
      className={cn("grid grid-cols-2 gap-4 lg:flex", className)}
      {...props}
    >
      <label className="input col-span-2 w-full lg:w-72">
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

      <div className="col-span-2 lg:w-52">
        <div className="flex w-full items-center text-sm">
          <label className="opacity-60" htmlFor={levelSliderId}>
            Level
          </label>
          {levelPending && <span className="loading loading-xs ml-2" />}
          <span className="ml-auto">{queryStates.level}</span>
        </div>
        <input
          className="range range-sm w-full"
          id={levelSliderId}
          value={queryStates.level}
          {...levelSliderConfig}
          type="range"
          onChange={(e) =>
            setQueryStates(
              { level: Number.parseInt(e.target.value) },
              {
                startTransition: levelStartTransition,
                limitUrlUpdates: debounce(500),
              },
            )
          }
        />
        <div className="mx-2 mt-1 flex justify-between">
          {Array.from(
            { length: levelSliderConfig.max / levelSliderConfig.step },
            (_, index) => (
              <div
                key={index}
                className="bg-base-content h-1.5 w-px opacity-20"
              />
            ),
          )}
        </div>
      </div>

      <button
        className="btn btn-soft col-span-2"
        disabled={Object.values(queryStates).every((queryState) =>
          typeof queryState === "number"
            ? queryState === memoriesSearchParams.level.defaultValue
            : queryState.length === 0,
        )}
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
        Resetopacity-20
      </button>
    </header>
  );
};

export type MemoriesToolbarFallbackProps = Omit<
  ComponentProps<"div">,
  "children"
>;
export const MemoriesToolbarFallback = ({
  className,
  ...props
}: MemoriesToolbarFallbackProps) => {
  const levelSliderId = useId();

  return (
    <header
      className={cn("grid grid-cols-2 gap-4 lg:flex", className)}
      {...props}
    >
      <label className="input col-span-2 w-full lg:w-72">
        <Search className="shrink-0" size="1.2em" />
        <input
          aria-label="Search memories"
          placeholder="Search..."
          type="search"
        />
      </label>

      <Select label="Rarity" options={rarities} />
      <Select label="Type" options={types} />
      <Select
        label="Traveler"
        optionFormatter={(id) => getTravelerById(id)?.name ?? id}
        options={travelers}
      />
      <Select label="Tag" options={tags} />

      <div className="col-span-2 lg:w-52">
        <div className="flex w-full items-center text-sm">
          <label className="opacity-60" htmlFor={levelSliderId}>
            Level
          </label>
          <span className="ml-auto">
            {memoriesSearchParams.level.defaultValue}
          </span>
        </div>
        <input
          className="range range-sm w-full"
          id={levelSliderId}
          value={memoriesSearchParams.level.defaultValue}
          {...levelSliderConfig}
          type="range"
        />
        <div className="mx-2 mt-1 flex justify-between">
          {Array.from(
            { length: levelSliderConfig.max / levelSliderConfig.step },
            (_, index) => (
              <div
                key={index}
                className="bg-base-content h-2 w-px opacity-20"
              />
            ),
          )}
        </div>
      </div>

      <button disabled className="btn btn-soft col-span-2">
        <RotateCcw size="1.2em" />
        Reset
      </button>
    </header>
  );
};
