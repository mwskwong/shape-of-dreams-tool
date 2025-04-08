import { formOptions as createFormOptions } from "@tanstack/react-form/nextjs";
import {
  type InferOutput,
  array,
  check,
  checkItems,
  length,
  nonEmpty,
  object,
  pipe,
  string,
} from "valibot";

import { allMemoryEntries } from "@/lib/constants";

export const schema = pipe(
  object({
    buildName: pipe(string(), nonEmpty("Build name cannot be empty.")),
    traveler: object({
      id: string(),
      startingMemories: object({
        q: string(),
        r: string(),
        identity: string(),
        movement: string(),
      }),
    }),
    memories: pipe(
      array(
        object({
          id: string(),
          essences: pipe(array(string()), length(3)),
        }),
      ),
      length(4),
      checkItems(({ essences }, _, array) => {
        const allEssences = array.flatMap(({ essences }) => essences);
        const essenceFrequency = new Map<string, number>();
        for (const essence of allEssences) {
          essenceFrequency.set(
            essence,
            (essenceFrequency.get(essence) ?? 0) + 1,
          );
        }

        for (const essence of essences) {
          if (essence && (essenceFrequency.get(essence) ?? 0) > 1) {
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
        const memory = allMemoryEntries.find(([key]) => key === id)?.[1];
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
    buildName: "",
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
