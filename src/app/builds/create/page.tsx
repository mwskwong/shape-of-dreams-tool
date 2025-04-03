"use client";

import "@radix-ui/themes/tokens/colors/red.css";

import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Flex } from "@radix-ui/themes/components/flex";
import { Heading } from "@radix-ui/themes/components/heading";
import { Text } from "@radix-ui/themes/components/text";
import * as TextField from "@radix-ui/themes/components/text-field";
import { useForm } from "@tanstack/react-form";
import { type FC } from "react";
import {
  type InferOutput,
  array,
  check,
  everyItem,
  length,
  nonEmpty,
  object,
  pipe,
  string,
} from "valibot";

import { MemorySelect } from "@/components/builds/memory-select";
import { TravelerSelect } from "@/components/builds/traveler-select";
import { compareMemories } from "@/lib/utils";
import memories from "@public/data/memories.json";

const sortedMemories = Object.entries(memories)
  .filter(([id]) => id !== "St_C_Sneeze")
  .map(([id, memory]) => ({ id, ...memory }))
  .toSorted(compareMemories);

const schema = pipe(
  object({
    buildName: pipe(string(), nonEmpty("Build name is required.")),
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
      everyItem(
        ({ id }, index, array) =>
          !id || array.findIndex((memory) => memory.id === id) === index,
        "Memories must be unique.",
      ),
      everyItem(({ essences }, __, array) => {
        const allEssences = array.flatMap(({ essences }) => essences);
        return essences.every(
          (essence, index) =>
            !essence || allEssences.indexOf(essence) === index,
        );
      }, "Essences must be unique."),
    ),
  }),
  check(
    ({ traveler, memories }) =>
      memories.every(({ id }) => {
        const memory = sortedMemories.find((memory) => memory.id === id);
        if (!memory?.traveler) return true;

        return (
          id === traveler.startingMemories.q ||
          id === traveler.startingMemories.r
        );
      }),
    "Traveler rarity memories must match the starting memories.",
  ),
);

const CreateBuild: FC = () => {
  const form = useForm({
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
    } satisfies InferOutput<typeof schema>,
    validators: { onChange: schema },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value));
    },
  });

  return (
    <Flex asChild direction="column" gap="3" pt="3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.Field name="buildName">
          {({ name, state, handleChange, handleBlur }) => {
            const error = state.meta.isTouched
              ? state.meta.errors[0]?.message
              : undefined;
            return (
              <Box maxWidth="400px">
                <TextField.Root
                  color={error ? "red" : undefined}
                  name={name}
                  placeholder="My Build"
                  size="3"
                  value={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <Text as="div" color="red" mt="1" size="2">
                  {error}
                </Text>
              </Box>
            );
          }}
        </form.Field>
        <Flex direction={{ initial: "column", md: "row" }} gapX="9" gapY="3">
          <form.Field name="traveler">
            {({ state, handleChange, handleBlur }) => (
              <TravelerSelect
                value={state.value}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            )}
          </form.Field>
          <Flex direction="column" gap="3">
            <Heading as="h2" size="3">
              Memories and Essences
            </Heading>

            <form.Field name="memories">
              {({ state, handleChange, handleBlur, form }) => {
                const error = state.meta.isTouched
                  ? state.meta.errors[0]?.message
                  : undefined;
                return (
                  <>
                    <Flex direction="column" gap="3">
                      {state.value.map(({ id }, index) => (
                        <Flex key={index} gap="3">
                          <MemorySelect
                            value={id}
                            options={sortedMemories.filter(
                              ({ id, traveler }) =>
                                !traveler ||
                                id ===
                                  form.state.values.traveler.startingMemories
                                    .q ||
                                id ===
                                  form.state.values.traveler.startingMemories.r,
                            )}
                            onBlur={handleBlur}
                            onChange={(id) =>
                              handleChange((memories) => {
                                memories[index].id = id;
                                return memories;
                              })
                            }
                          />
                        </Flex>
                      ))}
                    </Flex>
                    <Text as="div" color="red" size="2">
                      {error}
                    </Text>
                  </>
                );
              }}
            </form.Field>
          </Flex>
        </Flex>
        <form.Subscribe selector={(state) => state.errors}>
          {(errors) => (
            <pre style={{ overflow: "auto" }}>
              <code>{JSON.stringify(errors, undefined, 2)}</code>
            </pre>
          )}
        </form.Subscribe>
        <Button type="submit">Submit</Button>
      </form>
    </Flex>
  );
};

export default CreateBuild;
