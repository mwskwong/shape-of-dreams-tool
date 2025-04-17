import {
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

import {
  allEssenceEntries,
  allMemoryEntries,
  allTravelerEntries,
} from "@/lib/constants";

export const maxNumberOfMemories = 4;
export const maxNumberOfEssencesPerMemory = 3;

const memoryMap = new Map(allMemoryEntries);

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
          const memory = memoryMap.get(id);

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
      const currentTravelerLocationMemory = memories
        .map(({ id }) => memoryMap.get(id))
        .find(
          (memory) =>
            memory?.travelerMemoryLocation ===
            location[0].toUpperCase() + location.slice(1),
        );

      if (!startingMemory && currentTravelerLocationMemory) {
        addIssue({
          message: `Cannot use "${currentTravelerLocationMemory.name}" when the corresponding starting memory is set to "Any".`,
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
  rawCheck(({ dataset, addIssue }) => {
    if (!dataset.typed) return;

    const { traveler, memories } = dataset.value;
    for (const [location, startingMemory] of Object.entries(
      traveler.startingMemories,
    )) {
      const currentTravelerLocationMemory = memories.find(({ id }) => {
        const memory = memoryMap.get(id);
        return (
          memory?.travelerMemoryLocation ===
          location[0].toUpperCase() + location.slice(1)
        );
      });

      if (
        startingMemory &&
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
