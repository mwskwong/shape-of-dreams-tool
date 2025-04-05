"use client";

import "@radix-ui/themes/tokens/colors/red.css";
import "@radix-ui/themes/tokens/colors/green.css";

import * as AlertDialog from "@radix-ui/themes/components/alert-dialog";
import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Link } from "@radix-ui/themes/components/link";
import { Text } from "@radix-ui/themes/components/text";
import { TextArea } from "@radix-ui/themes/components/text-area";
import * as TextField from "@radix-ui/themes/components/text-field";
import { useForm, useTransform } from "@tanstack/react-form";
import { initialFormState, mergeForm } from "@tanstack/react-form/nextjs";
import {
  type FC,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { EssenceSelect } from "@/components/builds/essence-select";
import { MemorySelect } from "@/components/builds/memory-select";
import { TravelerSelect } from "@/components/builds/traveler-select";
import { submitBuild } from "@/lib/actions";
import { allMemoryEntries } from "@/lib/constants";
import { formOptions } from "@/lib/form";
import { routes, siteUrl } from "@/lib/site-config";

import styles from "./build-form.module.css";

const allMemories = allMemoryEntries
  .filter(([id]) => id !== "St_C_Sneeze")
  .map(([id, memory]) => ({ id, ...memory }));

const getStartingMemory = (
  traveler: string,
  travelerMemoryLocation: string,
) => {
  if (!traveler) return "";

  return (
    allMemoryEntries.find(
      ([, memory]) =>
        memory.traveler === traveler &&
        memory.travelerMemoryLocation === travelerMemoryLocation,
    )?.[0] ?? ""
  );
};

export interface BuildFormProps
  extends Omit<FlexProps, "asChild" | "children"> {
  // TODO
}

export const BuildForm: FC<BuildFormProps> = ({ ...props }) => {
  const [{ hashId, formState }, action, isSubmitting] = useActionState(
    submitBuild,
    { formState: initialFormState },
  );
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

  const buildUrlCopiedTimeoutRef = useRef<NodeJS.Timeout>(undefined);
  const [buildUrlCopied, setBuildUrlCopied] = useState(false);
  useEffect(() => () => clearTimeout(buildUrlCopiedTimeoutRef.current), []);

  return (
    <>
      <Flex asChild direction="column" gap="3" {...props}>
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
                    mt="1"
                    name={name}
                    placeholder="My Build"
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  {error && (
                    <Text color="red" mt="1" size="2">
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
            <Flex direction="column" flexGrow={{ sm: "1", md: "0" }} gap="3">
              <Text as="p" size="2" weight="bold">
                Traveler & Starting Memories
              </Text>

              <form.Field name="traveler">
                {({ handleChange }) => (
                  <form.Field name="traveler.id">
                    {({ name, state, handleBlur }) => (
                      <TravelerSelect
                        name={name}
                        value={state.value}
                        onBlur={handleBlur}
                        onChange={(id) =>
                          handleChange({
                            id,
                            startingMemories: {
                              q: getStartingMemory(id, "Q"),
                              r: getStartingMemory(id, "R"),
                              identity: getStartingMemory(id, "Identity"),
                              movement: getStartingMemory(id, "Movement"),
                            },
                          })
                        }
                      >
                        <form.Field name="traveler.startingMemories">
                          {({ state }) => (
                            <Flex gap="3">
                              {Object.entries(state.value).map(([key]) => (
                                <form.Field
                                  key={key}
                                  name={`traveler.startingMemories.${key as keyof typeof state.value}`}
                                >
                                  {({
                                    name,
                                    state,
                                    handleChange,
                                    handleBlur,
                                    form,
                                  }) => {
                                    const options = allMemoryEntries
                                      .filter(
                                        ([
                                          ,
                                          { traveler, travelerMemoryLocation },
                                        ]) =>
                                          traveler ===
                                            form.state.values.traveler.id &&
                                          travelerMemoryLocation ===
                                            key[0].toUpperCase() + key.slice(1),
                                      )
                                      .map(([key, memory]) => ({
                                        id: key,
                                        ...memory,
                                      }));

                                    return (
                                      <MemorySelect
                                        name={name}
                                        options={options}
                                        size="1"
                                        value={state.value}
                                        disabled={
                                          !form.state.values.traveler.id ||
                                          options.length <= 1
                                        }
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                      />
                                    );
                                  }}
                                </form.Field>
                              ))}
                            </Flex>
                          )}
                        </form.Field>
                      </TravelerSelect>
                    )}
                  </form.Field>
                )}
              </form.Field>
            </Flex>

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
                                state.errors[0]?.[
                                  `memories[${memoryIndex}]`
                                ]?.[0].message
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

            <Flex direction="column" flexGrow="1" minWidth="249px">
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
                    mt="1"
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
            pt="4"
          >
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button color="gray" type="reset" variant="soft">
                  Reset
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Confirm reset</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  Are you sure you want to reset? All current build settings
                  will be cleared.
                </AlertDialog.Description>

                <Flex gap="3" justify="end" mt="4">
                  <AlertDialog.Cancel>
                    <Button color="gray" variant="soft">
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action onClick={() => form.reset()}>
                    <Button color="red">Reset</Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
            <form.Subscribe
              selector={({ isTouched, canSubmit }) => ({
                isTouched,
                canSubmit,
              })}
            >
              {({ isTouched, canSubmit }) => (
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

      <form.Subscribe selector={({ isSubmitted }) => isSubmitted}>
        {(isSubmitted) => {
          const buildUrl =
            hashId && `${siteUrl}${routes.builds.pathname}/${hashId}`;

          return (
            <AlertDialog.Root open={isSubmitted && !isSubmitting}>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>
                  Build submission successful
                </AlertDialog.Title>
                <AlertDialog.Description mb="3" size="2">
                  Your build has been saved. Below is the unique URL to access
                  it. Copy the link to share or save it for later use.
                </AlertDialog.Description>

                <Link href={buildUrl} rel="noreferrer" size="2" target="_blank">
                  {buildUrl}
                </Link>

                <Flex gap="3" justify="end" mt="4">
                  <AlertDialog.Cancel>
                    <Button
                      color="gray"
                      variant="soft"
                      onClick={() => form.reset()}
                    >
                      Close
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action
                    onClick={async () => {
                      if (buildUrl) {
                        await navigator.clipboard.writeText(buildUrl);
                        setBuildUrlCopied(true);
                        buildUrlCopiedTimeoutRef.current = setTimeout(
                          () => setBuildUrlCopied(false),
                          2000,
                        );
                      }
                    }}
                  >
                    <Button color={buildUrlCopied ? "green" : undefined}>
                      {buildUrlCopied ? "Copied" : "Copy URL"}
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
          );
        }}
      </form.Subscribe>
    </>
  );
};
