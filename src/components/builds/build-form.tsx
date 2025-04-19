"use client";

import "@radix-ui/themes/tokens/colors/red.css";
import "@radix-ui/themes/tokens/colors/green.css";

import { valibotResolver } from "@hookform/resolvers/valibot";
import * as AlertDialog from "@radix-ui/themes/components/alert-dialog";
import { Box } from "@radix-ui/themes/components/box";
import { Button } from "@radix-ui/themes/components/button";
import { Flex, type FlexProps } from "@radix-ui/themes/components/flex";
import { Link } from "@radix-ui/themes/components/link";
import { Text } from "@radix-ui/themes/components/text";
import { TextArea } from "@radix-ui/themes/components/text-area";
import * as TextField from "@radix-ui/themes/components/text-field";
import { type FC, useEffect, useId, useRef, useState } from "react";
import {
  type Control,
  Controller,
  type FieldPath,
  useController,
  useForm,
  useWatch,
} from "react-hook-form";

import { submitBuild } from "@/lib/actions";
import {
  type Build,
  maxNumberOfEssencesPerMemory,
  maxNumberOfMemories,
  schema,
} from "@/lib/build-form";
import { allMemoryEntries, allTravelerEntries } from "@/lib/constants";
import { routes, siteUrl } from "@/lib/site-config";

import styles from "./build-form.module.css";
import { EssenceSelect } from "./essence-select";
import { FormPersist } from "./form-persist";
import { MemorySelect, type MemorySelectProps } from "./memory-select";
import { StatsDataList, type StatsDataListProps } from "./stats-data-list";
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
  defaultValues?: Build;
}

export const BuildForm: FC<BuildFormProps> = ({ defaultValues, ...props }) => {
  // eslint-disable-next-line react-compiler/react-compiler
  "use no memo";

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    reset,
    setError,
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
      } satisfies Build),
    mode: "onTouched",
    criteriaMode: "all",
    resolver: valibotResolver(schema),
  });

  const nameId = useId();
  const descriptionId = useId();

  const [hashId, setHashId] = useState<string>();
  const buildUrl = hashId && `${siteUrl}${routes.builds.pathname}/${hashId}`;

  const urlCopiedTimeoutRef = useRef<NodeJS.Timeout>(undefined);
  const [urlCopied, setUrlCopied] = useState(false);
  useEffect(() => () => clearTimeout(urlCopiedTimeoutRef.current), []);

  return (
    <>
      <FormPersist control={control} reset={reset} />
      <Flex asChild direction="column" gap="3" {...props}>
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              const { hashId } = await submitBuild(data);
              setHashId(hashId);
            } catch (error) {
              setError("root", { type: "server", message: String(error) });
            }
          })}
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
                      <StartingMemorySelect
                        key={location}
                        control={control}
                        name={`traveler.startingMemories.${location}`}
                        size="1"
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

                <StatsDataListWatched control={control} />
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
                          <SlotMemorySelect
                            control={control}
                            name={`memories.${memoryIndex}.id`}
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

          {errors.root && (
            <Text color="red" size="2">
              {errors.root.message}
            </Text>
          )}

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
                  <AlertDialog.Action onClick={() => reset()}>
                    <Button color="red">Reset</Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>

            <Button disabled={!isValid} loading={isSubmitting} type="submit">
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>

      <AlertDialog.Root open={isSubmitSuccessful}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Build submission successful</AlertDialog.Title>
          <AlertDialog.Description mb="3" size="2">
            Your build has been saved. Below is the unique URL to access it.
            Copy the link to share or save it for later use.
          </AlertDialog.Description>

          <Link href={buildUrl} rel="noreferrer" size="2" target="_blank">
            {buildUrl}
          </Link>

          <Flex gap="3" justify="end" mt="4">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft" onClick={() => reset()}>
                Close
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action
              onClick={async () => {
                if (buildUrl) {
                  await navigator.clipboard.writeText(buildUrl);
                  setUrlCopied(true);
                  urlCopiedTimeoutRef.current = setTimeout(
                    () => setUrlCopied(false),
                    2000,
                  );
                }
              }}
            >
              <Button color={urlCopied ? "green" : undefined}>
                {urlCopied ? "Copied" : "Copy URL"}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

// these components are all depending on value of other field(s)
// extracting them such that useWatch will only re-render the individual components
// instead of the entire form

interface StartingMemorySelectProps
  extends Omit<MemorySelectProps, "options" | "disabled"> {
  name: `traveler.startingMemories.${FieldPath<Build["traveler"]["startingMemories"]>}`;
  control: Control<Build>;
}

const StartingMemorySelect: FC<StartingMemorySelectProps> = ({
  name,
  control,
  ...props
}) => {
  const {
    field: { disabled, ...field },
  } = useController({ control, name });
  const travelerId = useWatch({ control, name: "traveler.id" });
  const location = name.split(".").at(-1) ?? "";

  const options = travelerId
    ? allMemoryEntries
        .filter(
          ([, { traveler, travelerMemoryLocation }]) =>
            traveler === travelerId &&
            travelerMemoryLocation ===
              location[0].toUpperCase() + location.slice(1),
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
      {...props}
    />
  );
};

interface StatsDataListWatchedProps extends StatsDataListProps {
  control: Control<Build>;
}

const StatsDataListWatched: FC<StatsDataListWatchedProps> = ({
  control,
  traveler,
  ...props
}) => {
  const travelerId = useWatch({ control, name: "traveler.id" });

  return (
    <StatsDataList
      traveler={
        traveler ?? allTravelerEntries.find(([id]) => id === travelerId)?.[1]
      }
      {...props}
    />
  );
};

interface SlotMemorySelectProps extends Omit<MemorySelectProps, "options"> {
  name: `memories.${number}.id`;
  control: Control<Build>;
}

const SlotMemorySelect: FC<SlotMemorySelectProps> = ({
  name,
  control,
  ...props
}) => {
  const { field } = useController({ control, name });
  const startingMemoryQ = useWatch({
    control,
    name: "traveler.startingMemories.q",
  });
  const startingMemoryR = useWatch({
    control,
    name: "traveler.startingMemories.r",
  });

  return (
    <MemorySelect
      {...field}
      options={allMemories.filter(
        ({ id, traveler }) =>
          !traveler || id === startingMemoryQ || id === startingMemoryR,
      )}
      {...props}
    />
  );
};
