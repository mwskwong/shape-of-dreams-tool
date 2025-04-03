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
  checkItems,
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
      checkItems(
        ({ id }, _, array) =>
          !id || array.filter((memory) => memory.id === id).length <= 1,
        "Memories must be unique.",
      ),
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
      description: "",
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
                {error && (
                  <Text color="red" size="2">
                    {error}
                  </Text>
                )}
              </Box>
            );
          }}
        </form.Field>

        <Flex
          direction={{ initial: "column", sm: "row" }}
          gapX="9"
          gapY="3"
          wrap="wrap"
        >
          <form.Field name="traveler">
            {({ state, handleChange, handleBlur }) => (
              <TravelerSelect
                flexGrow={{ sm: "1", md: "0" }}
                value={state.value}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            )}
          </form.Field>

          <Flex direction="column" flexGrow={{ sm: "1", md: "0" }} gap="3">
            <Text as="p" size="2" weight="bold">
              Memories and Essences
            </Text>

            <form.Field mode="array" name="memories">
              {({ state }) => {
                return (
                  <>
                    <Flex
                      align={{ initial: "center", sm: "start" }}
                      direction="column"
                      gap="3"
                    >
                      {state.value.map(({ essences }, memoryIndex) => (
                        <div key={memoryIndex}>
                          <Flex gap="3">
                            <form.Field name={`memories[${memoryIndex}].id`}>
                              {({ state, handleChange, handleBlur, form }) => (
                                <MemorySelect
                                  value={state.value}
                                  options={sortedMemories.filter(
                                    ({ id, traveler }) =>
                                      !traveler ||
                                      id ===
                                        form.state.values.traveler
                                          .startingMemories.q ||
                                      id ===
                                        form.state.values.traveler
                                          .startingMemories.r,
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              )}
                            </form.Field>

                            {essences.map((_, essenceIndex) => (
                              <form.Field
                                key={essenceIndex}
                                name={`memories[${memoryIndex}].essences[${essenceIndex}]`}
                              >
                                {({ state, handleChange, handleBlur }) => (
                                  <EssenceSelect
                                    value={state.value}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                )}
                              </form.Field>
                            ))}
                          </Flex>

                          <form.Subscribe
                            selector={(state) =>
                              state.errors[0]?.[`memories[${memoryIndex}]`]?.[0]
                                .message
                            }
                          >
                            {(memoryError) =>
                              memoryError && (
                                <Text as="div" color="red" mt="1" size="2">
                                  {memoryError}
                                </Text>
                              )
                            }
                          </form.Subscribe>
                        </div>
                      ))}
                    </Flex>
                  </>
                );
              }}
            </form.Field>
          </Flex>

          <Flex direction="column" flexGrow="1">
            <Text
              as="label"
              htmlFor={buildDescriptionId}
              size="2"
              weight="bold"
            >
              Build description
            </Text>
            <form.Field name="description">
              {({ state, handleChange, handleBlur }) => (
                <TextArea
                  autoCapitalize="on"
                  className={styles.buildDescriptionTextArea}
                  id={buildDescriptionId}
                  my="1"
                  value={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                />
              )}
            </form.Field>
          </Flex>
        </Flex>

        <form.Subscribe
          selector={(state) => state.errors[0]?.[""]?.[0].message}
        >
          {(globalError) =>
            globalError && (
              <Text color="red" mt="" size="2">
                {globalError}
              </Text>
            )
          }
        </form.Subscribe>

        <Flex
          direction={{ initial: "column", sm: "row" }}
          gap="3"
          justify="end"
          pt="6"
        >
          <Button
            color="gray"
            type="reset"
            variant="soft"
            onClick={(e) => {
              e.preventDefault();
              form.reset();
            }}
          >
            Reset
          </Button>
          <form.Subscribe
            selector={({ isTouched, canSubmit, isSubmitting }) => ({
              isTouched,
              canSubmit,
              isSubmitting,
            })}
          >
            {({ isTouched, canSubmit, isSubmitting }) => (
              <Button
                disabled={!isTouched || !canSubmit}
                loading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            )}
          </form.Subscribe>
        </Flex>
      </form>
    </Flex>
  );
};

export default CreateBuild;
