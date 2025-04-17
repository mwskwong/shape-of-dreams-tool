"use client";

import "@radix-ui/themes/tokens/colors/red.css";
import "@radix-ui/themes/tokens/colors/green.css";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import { TextArea } from "@radix-ui/themes/components/text-area";
import * as TextField from "@radix-ui/themes/components/text-field";
import { type FC, useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { type InferOutput, safeParse } from "valibot";

import {
  maxNumberOfEssencesPerMemory,
  maxNumberOfMemories,
  schema,
} from "@/lib/build-form";
import { allMemoryEntries, allTravelerEntries } from "@/lib/constants";

import styles from "./build-form.module.css";
import { EssenceSelect } from "./essence-select";
import { MemorySelect } from "./memory-select";
import { StatsDataList } from "./stats-data-list";
import { TravelerSelect } from "./traveler-select";

const allMemories = allMemoryEntries
  .filter(([id]) => id !== "St_C_Sneeze")
  .map(([id, memory]) => ({ id, ...memory }));

const startingMemoryLocations = ["q", "r", "identity", "movement"] as const;

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
  defaultValues?: InferOutput<typeof schema>;
}

export const BuildForm: FC<BuildFormProps> = ({ defaultValues, ...props }) => {
  // eslint-disable-next-line react-compiler/react-compiler
  "use no memo";

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues:
      defaultValues ??
      ({
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
      } satisfies InferOutput<typeof schema>),
    mode: "onTouched",
    resolver: valibotResolver(schema),
  });
  const selectedTraveler = watch("traveler");

  const nameId = useId();
  const descriptionId = useId();

  return (
    <>
      <Flex asChild direction="column" gap="3" {...props}>
        <form
          onSubmit={handleSubmit(
            (data) => {
              console.log({ data });
              console.log({ result: safeParse(schema, data) });
            },
            (error) => console.error({ error }),
          )}
        >
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Box maxWidth="400px" width="100%">
                <Text as="label" htmlFor={nameId} size="2" weight="bold">
                  Build name
                </Text>
                <TextField.Root
                  {...field}
                  autoCapitalize="on"
                  color={fieldState.error ? "red" : undefined}
                  id={nameId}
                  mt="1"
                  placeholder="My Build"
                />
                {fieldState.error && (
                  <Text color="red" mt="1" size="2">
                    {fieldState.error.message}
                  </Text>
                )}
              </Box>
            )}
          />

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

              <Flex align="center" direction="column" gap="3" width="100%">
                <Controller
                  control={control}
                  name="traveler.id"
                  render={({ field: { onChange, ...field } }) => (
                    <TravelerSelect
                      {...field}
                      onChange={(id) => {
                        onChange(id);
                        setValue("traveler.startingMemories", {
                          q: getStartingMemory(id, "Q"),
                          r: getStartingMemory(id, "R"),
                          identity: getStartingMemory(id, "Identity"),
                          movement: getStartingMemory(id, "Movement"),
                        });
                      }}
                    />
                  )}
                />

                <Flex align="center" direction="column" gap="1">
                  <Flex gap="3">
                    {startingMemoryLocations.map((location) => (
                      <Controller
                        key={location}
                        control={control}
                        name={`traveler.startingMemories.${location}`}
                        render={({ field: { disabled, ...field } }) => {
                          const options = selectedTraveler.id
                            ? allMemoryEntries
                                .filter(
                                  ([, { traveler, travelerMemoryLocation }]) =>
                                    traveler === selectedTraveler.id &&
                                    travelerMemoryLocation ===
                                      location[0].toUpperCase() +
                                        location.slice(1),
                                )
                                .map(([key, memory]) => ({
                                  id: key,
                                  ...memory,
                                }))
                            : [];

                          return (
                            <MemorySelect
                              {...field}
                              disabled={disabled ?? options.length <= 1}
                              options={options}
                              size="1"
                            />
                          );
                        }}
                      />
                    ))}
                  </Flex>

                  {(errors.traveler?.startingMemories?.q ??
                    errors.traveler?.startingMemories?.r) && (
                    <Text
                      className={styles.startingMemoriesError}
                      color="red"
                      size="2"
                      wrap="pretty"
                    >
                      {errors.traveler.startingMemories.q?.message ??
                        errors.traveler.startingMemories.r?.message}
                    </Text>
                  )}
                </Flex>

                <StatsDataList
                  traveler={
                    allTravelerEntries.find(
                      ([id]) => id === selectedTraveler.id,
                    )?.[1]
                  }
                />
              </Flex>
            </Flex>

            <Flex direction="column" flexGrow={{ sm: "1", md: "0" }} gap="3">
              <Text as="p" size="2" weight="bold">
                Memories and Essences
              </Text>

              <Flex
                align={{ initial: "center", sm: "start" }}
                direction="column"
                gap="3"
              >
                {Array.from(
                  { length: maxNumberOfMemories },
                  (_, memoryIndex) => {
                    const memoryError = errors.memories?.[memoryIndex]?.id;
                    const firstEssenceError =
                      errors.memories?.[memoryIndex]?.essences?.find?.(Boolean);

                    return (
                      <div key={memoryIndex}>
                        <Flex gap="3">
                          <Controller
                            control={control}
                            name={`memories.${memoryIndex}.id`}
                            render={({ field }) => (
                              <MemorySelect
                                {...field}
                                options={allMemories.filter(
                                  ({ id, traveler }) =>
                                    !traveler ||
                                    id ===
                                      selectedTraveler.startingMemories.q ||
                                    id === selectedTraveler.startingMemories.r,
                                )}
                              />
                            )}
                          />

                          {Array.from(
                            { length: maxNumberOfEssencesPerMemory },
                            (_, essenceIndex) => (
                              <Controller
                                key={essenceIndex}
                                control={control}
                                name={`memories.${memoryIndex}.essences.${essenceIndex}`}
                                render={({ field }) => (
                                  <EssenceSelect {...field} />
                                )}
                              />
                            ),
                          )}
                        </Flex>

                        {(memoryError ?? firstEssenceError) && (
                          <Text
                            as="p"
                            color="red"
                            mt="1"
                            size="2"
                            wrap="pretty"
                          >
                            {memoryError?.message ?? firstEssenceError?.message}
                          </Text>
                        )}
                      </div>
                    );
                  },
                )}
              </Flex>
            </Flex>

            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Flex direction="column" flexGrow="1" minWidth="249px">
                  <Text
                    as="label"
                    htmlFor={descriptionId}
                    size="2"
                    weight="bold"
                  >
                    Build description
                  </Text>
                  <TextArea
                    {...field}
                    autoCapitalize="on"
                    className={styles.buildDescriptionTextArea}
                    id={descriptionId}
                    mt="1"
                  />
                </Flex>
              )}
            />
          </Flex>

          <Button type="submit">Submit</Button>
        </form>
      </Flex>
    </>
  );
};
