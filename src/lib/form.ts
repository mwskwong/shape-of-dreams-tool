import { formOptions as createFormOptions } from "@tanstack/react-form/nextjs";
import {
  type InferOutput,
  array,
  check,
  checkItems,
  length,
  nonEmpty,
  object,
  picklist,
  pipe,
  string,
} from "valibot";

import {
  allEssenceEntries,
  allMemoryEntries,
  allTravelerEntries,
} from "@/lib/constants";

export const schema = pipe(
  object({
    name: pipe(string(), nonEmpty("Build name cannot be empty.")),
    traveler: pipe(
      object({
        id: picklist(allTravelerEntries.map(([id]) => id)),
        startingMemories: object({
          q: picklist(
            allMemoryEntries
              .filter(
                ([, { travelerMemoryLocation }]) =>
                  travelerMemoryLocation === "Q",
              )
              .map(([id]) => id),
          ),
          r: picklist(
            allMemoryEntries
              .filter(
                ([, { travelerMemoryLocation }]) =>
                  travelerMemoryLocation === "R",
              )
              .map(([id]) => id),
          ),
          identity: picklist(
            allMemoryEntries
              .filter(
                ([, { travelerMemoryLocation }]) =>
                  travelerMemoryLocation === "Identity",
              )
              .map(([id]) => id),
          ),
          movement: picklist(
            allMemoryEntries
              .filter(
                ([, { travelerMemoryLocation }]) =>
                  travelerMemoryLocation === "Movement",
              )
              .map(([id]) => id),
          ),
        }),
      }),
      check(({ id, startingMemories }) =>
        Object.values(startingMemories).every((memoryId) => {
          const memory = allMemoryEntries.find(
            ([key]) => key === memoryId,
          )?.[1];
          return memory?.traveler === id;
        }),
      ),
    ),
    memories: pipe(
      array(
        object({
          id: picklist(
            allMemoryEntries
              .filter(
                ([, { travelerMemoryLocation }]) =>
                  travelerMemoryLocation !== "Identity" &&
                  travelerMemoryLocation !== "Movement",
              )
              .map(([id]) => id),
          ),
          essences: pipe(
            array(picklist(allEssenceEntries.map(([id]) => id))),
            length(3),
          ),
        }),
      ),
      length(4),
      checkItems(({ essences }, _, array) => {
        const allEssences = array.flatMap(({ essences }) => essences);
        const essenceCounts = new Map<string, number>();
        for (const essence of allEssences) {
          essenceCounts.set(essence, (essenceCounts.get(essence) ?? 0) + 1);
        }

        for (const essence of essences) {
          if (essence && (essenceCounts.get(essence) ?? 0) > 1) {
            return false;
          }
        }

        return true;
      }, "Essences must be unique."),
    ),
    description: string(),
  }),
  check(
    ({ traveler, memories }) =>
      memories.every(({ id }) => {
        const memory = allMemoryEntries.find(
          ([memoryId]) => memoryId === id,
        )?.[1];
        if (!memory?.traveler) return true;

        return (
          id === traveler.startingMemories.q ||
          id === traveler.startingMemories.r
        );
      }),
    "Traveler rarity memories must match the starting memories.",
  ),
);

export const formOptions = createFormOptions({
  defaultValues: {
    name: "",
    traveler: {
      id: "",
      startingMemories: { q: "", r: "", identity: "", movement: "" },
    },
    memories: Array.from({ length: 4 }, () => ({
      id: "",
      essences: Array.from({ length: 3 }, () => ""),
    })),
    description: "",
  } satisfies InferOutput<typeof schema>,
  validators: { onChange: schema },
});
