import {
  type InferOutput,
  array,
  check,
  length,
  literal,
  nonEmpty,
  object,
  picklist,
  pipe,
  rawCheck,
  string,
  union,
} from "valibot";

import { allEssences, allMemories, allTravelers } from "@/lib/constants";

export const maxNumberOfMemories = 4;
export const maxNumberOfEssencesPerMemory = 3;

export const buildDetailsSchema = pipe(
  object({
    name: pipe(string(), nonEmpty("Build name cannot be empty.")),
    traveler: pipe(
      object({
        id: union([picklist(allTravelers.map(({ id }) => id)), literal("")]),
        startingMemories: object({
          q: union([
            picklist(
              allMemories
                .filter(
                  ({ travelerMemoryLocation }) =>
                    travelerMemoryLocation === "Q",
                )
                .map(({ id }) => id),
            ),
            literal(""),
          ]),
          r: union([
            picklist(
              allMemories
                .filter(
                  ({ travelerMemoryLocation }) =>
                    travelerMemoryLocation === "R",
                )
                .map(({ id }) => id),
            ),
            literal(""),
          ]),
          identity: union([
            picklist(
              allMemories
                .filter(
                  ({ travelerMemoryLocation }) =>
                    travelerMemoryLocation === "Identity",
                )
                .map(({ id }) => id),
            ),
            literal(""),
          ]),
          movement: union([
            picklist(
              allMemories
                .filter(
                  ({ travelerMemoryLocation }) =>
                    travelerMemoryLocation === "Movement",
                )
                .map(({ id }) => id),
            ),
            literal(""),
          ]),
        }),
      }),
      check(({ id, startingMemories }) =>
        Object.values(startingMemories).every((memoryId) => {
          if (!memoryId) return true;

          const memory = allMemories.find(({ id }) => id === memoryId);
          return memory?.traveler === id;
        }),
      ),
    ),
    memories: pipe(
      array(
        object({
          id: union([
            picklist(
              allMemories
                .filter(
                  ({ travelerMemoryLocation }) =>
                    travelerMemoryLocation !== "Identity" &&
                    travelerMemoryLocation !== "Movement",
                )
                .map(({ id }) => id),
            ),
            literal(""),
          ]),
          essences: pipe(
            array(
              union([picklist(allEssences.map(({ id }) => id)), literal("")]),
            ),
            length(maxNumberOfEssencesPerMemory),
          ),
        }),
      ),
      length(maxNumberOfMemories),
      rawCheck(({ dataset, addIssue }) => {
        if (!dataset.typed) return;

        const memoryCounts = new Map<string, number>();
        for (const { id } of dataset.value) {
          memoryCounts.set(id, (memoryCounts.get(id) ?? 0) + 1);
        }

        for (const [index, memoryItem] of dataset.value.entries()) {
          const { id } = memoryItem;
          const memory = allMemories.find((memory) => memory.id === id);

          if (
            memory?.rarity === "Traveler" &&
            (memoryCounts.get(id) ?? 0) > 1
          ) {
            addIssue({
              message: "Traveler rarity memories must be unique.",
              path: [
                {
                  type: "array",
                  origin: "value",
                  input: dataset.value,
                  key: index,
                  value: memoryItem,
                },
                {
                  type: "object",
                  origin: "value",
                  input: memoryItem,
                  key: "id",
                  value: id,
                },
              ],
            });
          }
        }
      }),
      rawCheck(({ dataset, addIssue }) => {
        if (!dataset.typed) return;

        const essenceCounts = new Map<string, number>();
        for (const { essences } of dataset.value) {
          for (const essence of essences) {
            if (essence) {
              essenceCounts.set(essence, (essenceCounts.get(essence) ?? 0) + 1);
            }
          }
        }

        for (const [memoryIndex, memory] of dataset.value.entries()) {
          for (const [essenceIndex, essence] of memory.essences.entries()) {
            if (essence && (essenceCounts.get(essence) ?? 0) > 1) {
              addIssue({
                message: "Essences must be unique.",
                path: [
                  {
                    type: "array",
                    origin: "value",
                    input: dataset.value,
                    key: memoryIndex,
                    value: memory,
                  },
                  {
                    type: "object",
                    origin: "value",
                    input: memory,
                    key: "essences",
                    value: memory.essences,
                  },
                  {
                    type: "array",
                    origin: "value",
                    input: memory.essences,
                    key: essenceIndex,
                    value: essence,
                  },
                ],
              });
            }
          }
        }
      }),
    ),
    description: string(),
  }),
  rawCheck(({ dataset, addIssue }) => {
    if (!dataset.typed) return;

    const { traveler, memories } = dataset.value;
    for (const [location, startingMemory] of Object.entries(
      traveler.startingMemories,
    )) {
      const currentTravelerLocationMemory = memories.find(({ id }) => {
        const memory = allMemories.find((memory) => memory.id === id);
        return (
          memory?.travelerMemoryLocation ===
          location[0].toUpperCase() + location.slice(1)
        );
      });

      if (
        currentTravelerLocationMemory &&
        startingMemory !== currentTravelerLocationMemory.id
      ) {
        addIssue({
          message: "Starting memories must match the Traveler rarity memories.",
          path: [
            {
              type: "object",
              origin: "value",
              input: dataset.value,
              key: "traveler",
              value: traveler,
            },
            {
              type: "object",
              origin: "value",
              input: traveler,
              key: "startingMemories",
              value: traveler.startingMemories,
            },
            {
              type: "object",
              origin: "value",
              input: traveler.startingMemories,
              key: location,
              value: startingMemory,
            },
          ],
        });
      }
    }
  }),
);

export type BuildDetails = InferOutput<typeof buildDetailsSchema>;

export const defaultBuildDetails: BuildDetails = {
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
};
