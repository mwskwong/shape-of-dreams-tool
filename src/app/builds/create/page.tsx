"use client";

import "@radix-ui/themes/tokens/colors/red.css";

import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import { TextArea } from "@radix-ui/themes/components/text-area";
import * as TextField from "@radix-ui/themes/components/text-field";
import { useForm } from "@tanstack/react-form";
import { type FC, useId } from "react";
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

import { EssenceSelect } from "@/components/builds/essence-select";
import { MemorySelect } from "@/components/builds/memory-select";
import { TravelerSelect } from "@/components/builds/traveler-select";
import { compareMemories } from "@/lib/utils";
import memories from "@public/data/memories.json";

import styles from "./page.module.css";

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
      everyItem((_, __, array) => {
        const allEssences = array.flatMap(({ essences }) => essences);
        return allEssences.every(
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

  const buildNameId = useId();
  const buildDescriptionId = useId();

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
              <Box maxWidth="400px" width="100%">
                <Text as="label" htmlFor={buildNameId} size="2" weight="bold">
                  Build name
                </Text>
                <TextField.Root
                  autoCapitalize="on"
                  color={error ? "red" : undefined}
                  id={buildNameId}
                  my="1"
                  name={name}
                  placeholder="My Build"
                  value={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <Text color="red" size="2">
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
            <Text as="p" size="2" weight="bold">
              Memories and Essences
            </Text>

            <form.Field name="memories">
              {({ state, handleChange, handleBlur, form }) => {
                const error = state.meta.isTouched
                  ? state.meta.errors[0]?.message
                  : undefined;
                return (
                  <>
                    <Flex align="center" direction="column" gap="3">
                      {state.value.map(({ id, essences }, memoryIndex) => (
                        <Flex key={memoryIndex} gap="3">
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
                                memories[memoryIndex].id = id;
                                return memories;
                              })
                            }
                          />
                          {essences.map((essence, essenceIndex) => (
                            <EssenceSelect
                              key={essenceIndex}
                              value={essence}
                              onChange={(essence) =>
                                handleChange((memories) => {
                                  memories[memoryIndex].essences[essenceIndex] =
                                    essence;
                                  return memories;
                                })
                              }
                            />
                          ))}
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
          <Box flexGrow="1">
            <Text
              as="label"
              htmlFor={buildDescriptionId}
              size="2"
              weight="bold"
            >
              Build description
            </Text>
            <TextArea
              autoCapitalize="on"
              className={styles.buildDescriptionTextArea}
              id={buildDescriptionId}
              my="1"
            />
          </Box>
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
