"use client";

import { RotateCcw, Search } from "lucide-react";
import { debounce, useQueryStates } from "nuqs";
import { type ComponentProps, useId, useTransition } from "react";

import { getEssenceRarities } from "@/lib/essences";
import { essencesSearchParams } from "@/lib/search-params";
import { cn } from "@/lib/utils";

import { Select } from "../select";

const rarities = getEssenceRarities();

const qualitySliderConfig = {
  min: essencesSearchParams.quality.defaultValue,
  max: 1000,
  step: 100,
};

export type EssencesToolbarProps = Omit<ComponentProps<"div">, "children">;
export const EssencesToolbar = ({
  className,
  ...props
}: EssencesToolbarProps) => {
  const [queryStates, setQueryStates] = useQueryStates(essencesSearchParams);

  const [searchPending, searchStartTransition] = useTransition();
  const [raritiesPending, raritiesStartTransition] = useTransition();
  const [qualityPending, qualityStartTransition] = useTransition();
  const [resetPending, resetStartTransition] = useTransition();

  const qualitySliderId = useId();

  return (
    <header
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-center",
        className,
      )}
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

      <div className="min-w-52">
        <div className="flex items-center text-xs">
          <label className="opacity-60" htmlFor={qualitySliderId}>
            Quality:
          </label>
          <span>&nbsp;{queryStates.quality}%</span>
          {qualityPending && <span className="loading ml-1 w-[1em]" />}
        </div>
        <input
          className="range range-xs w-full"
          id={qualitySliderId}
          value={queryStates.quality}
          {...qualitySliderConfig}
          type="range"
          onChange={(e) =>
            setQueryStates(
              { quality: Number.parseInt(e.target.value) },
              {
                startTransition: qualityStartTransition,
                limitUrlUpdates: debounce(500),
              },
            )
          }
        />
        <div className="mx-1.5 mt-1 flex justify-between">
          {Array.from(
            { length: qualitySliderConfig.max / qualitySliderConfig.step },
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
        className="btn btn-soft"
        disabled={Object.values(queryStates).every((queryState) =>
          typeof queryState === "number"
            ? queryState === essencesSearchParams.quality.defaultValue
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
        Reset
      </button>
    </header>
  );
};

export type EssencesToolbarFallbackProps = Omit<
  ComponentProps<"div">,
  "children"
>;
export const EssencesToolbarFallback = ({
  className,
  ...props
}: EssencesToolbarFallbackProps) => {
  const qualitySliderId = useId();
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
        />
      </label>

      <Select label="Rarity" />

      <div className="min-w-52">
        <div className="flex items-center text-xs">
          <label className="opacity-60" htmlFor={qualitySliderId}>
            Quality:
          </label>
          <span>&nbsp;{essencesSearchParams.quality.defaultValue}%</span>
        </div>
        <input
          className="range range-xs w-full"
          id={qualitySliderId}
          value={essencesSearchParams.quality.defaultValue}
          {...qualitySliderConfig}
          type="range"
        />
        <div className="mx-1.5 mt-1 flex justify-between">
          {Array.from(
            { length: qualitySliderConfig.max / qualitySliderConfig.step },
            (_, index) => (
              <div
                key={index}
                className="bg-base-content h-1.5 w-px opacity-20"
              />
            ),
          )}
        </div>
      </div>

      <button disabled className="btn btn-soft">
        <RotateCcw size="1.2em" />
        Reset
      </button>
    </header>
  );
};
