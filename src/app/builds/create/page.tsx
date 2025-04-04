"use client";

import "@radix-ui/themes/tokens/colors/red.css";

import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import { TextArea } from "@radix-ui/themes/components/text-area";
import * as TextField from "@radix-ui/themes/components/text-field";
import { useForm, useStore, useTransform } from "@tanstack/react-form";
import { initialFormState, mergeForm } from "@tanstack/react-form/nextjs";
import { type FC, useActionState, useId } from "react";

import { EssenceSelect } from "@/components/builds/essence-select";
import { MemorySelect } from "@/components/builds/memory-select";
import { TravelerSelect } from "@/components/builds/traveler-select";
import { submitBuild } from "@/lib/actions";
import { allMemoryEntries } from "@/lib/constants";
import { formOptions } from "@/lib/form";

import styles from "./page.module.css";

const allMemories = allMemoryEntries
  .filter(([id]) => id !== "St_C_Sneeze")
  .map(([id, memory]) => ({ id, ...memory }));

const CreateBuild: FC = () => {
  const [{ formState }, action] = useActionState(submitBuild, {
    formState: initialFormState,
  });
  const form = useForm({
    ...formOptions,
    transform: useTransform(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (baseForm) => mergeForm(baseForm, formState!),
      [formState],
    ),
  });

  const buildNameId = useId();
  const buildDescriptionId = useId();

  const formErrors = useStore(form.store, (formState) => formState.errors);
  console.log({ formErrors });

  return (
    <Flex asChild direction="column" gap="3" pt="3">
      <form action={action} onSubmit={() => form.handleSubmit()}>
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
                      {state.value.map((_, memoryIndex) => (
                        <div key={memoryIndex}>
                          <Flex gap="3">
                            <form.Field name={`memories[${memoryIndex}].id`}>
                              {({
                                name,
                                state,
                                handleChange,
                                handleBlur,
                                form,
                              }) => (
                                <MemorySelect
                                  name={name}
                                  value={state.value}
                                  options={allMemories.filter(
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

                            <form.Field
                              mode="array"
                              name={`memories[${memoryIndex}].essences`}
                            >
                              {({ state }) =>
                                state.value.map((_, essenceIndex) => (
                                  <form.Field
                                    key={essenceIndex}
                                    name={`memories[${memoryIndex}].essences[${essenceIndex}]`}
                                  >
                                    {({
                                      name,
                                      state,
                                      handleChange,
                                      handleBlur,
                                    }) => (
                                      <EssenceSelect
                                        name={name}
                                        value={state.value}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      />
                                    )}
                                  </form.Field>
                                ))
                              }
                            </form.Field>
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
              {({ name, state, handleChange, handleBlur }) => (
                <TextArea
                  autoCapitalize="on"
                  className={styles.buildDescriptionTextArea}
                  id={buildDescriptionId}
                  my="1"
                  name={name}
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
