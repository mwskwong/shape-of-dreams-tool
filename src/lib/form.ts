import { formOptions as createFormOptions } from "@tanstack/react-form/nextjs";
import {
  type InferOutput,
  array,
  check,
  checkItems,
  length,
  literal,
  nonEmpty,
  object,
  picklist,
  pipe,
  string,
  union,
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
        id: union([
          picklist(allTravelerEntries.map(([id]) => id)),
          literal(""),
        ]),
        startingMemories: object({
          q: union([
            picklist(
              allMemoryEntries
                .filter(
                  ([, { travelerMemoryLocation }]) =>
                    travelerMemoryLocation === "Q",
                )
                .map(([id]) => id),
            ),
            literal(""),
          ]),
          r: union([
            picklist(
              allMemoryEntries
                .filter(
                  ([, { travelerMemoryLocation }]) =>
                    travelerMemoryLocation === "R",
                )
                .map(([id]) => id),
            ),
            literal(""),
          ]),
          identity: union([
            picklist(
              allMemoryEntries
                .filter(
                  ([, { travelerMemoryLocation }]) =>
                    travelerMemoryLocation === "Identity",
                )
                .map(([id]) => id),
            ),
            literal(""),
          ]),
          movement: union([
            picklist(
              allMemoryEntries
                .filter(
                  ([, { travelerMemoryLocation }]) =>
                    travelerMemoryLocation === "Movement",
                )
                .map(([id]) => id),
            ),
            literal(""),
          ]),
        }),
      }),
      check(({ id, startingMemories }) =>
        Object.values(startingMemories).every((memoryId) => {
          if (!memoryId) return true;

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
          id: union([
            picklist(
              allMemoryEntries
                .filter(
                  ([, { travelerMemoryLocation }]) =>
                    travelerMemoryLocation !== "Identity" &&
                    travelerMemoryLocation !== "Movement",
                )
                .map(([id]) => id),
            ),
            literal(""),
          ]),
          essences: pipe(
            array(
              union([
                picklist(allEssenceEntries.map(([id]) => id)),
                literal(""),
              ]),
            ),
            length(3),
          ),
        }),
      ),
      length(4),
      checkItems(({ essences }, _, array) => {
        const allEssences = array.flatMap(({ essences }) => essences);
        const essenceCounts = new Map<string, number>();
        for (const essence of allEssences) {
          if (essence) {
            essenceCounts.set(essence, (essenceCounts.get(essence) ?? 0) + 1);
          }
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
