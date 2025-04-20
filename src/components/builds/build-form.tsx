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
import { Controller, useForm } from "react-hook-form";

import { submitBuild } from "@/lib/actions";
import { allMemories, allTravelers } from "@/lib/constants";
import {
  type BuildDetails,
  defaultBuildDetails,
  maxNumberOfEssencesPerMemory,
  maxNumberOfMemories,
} from "@/lib/schemas";
import { buildDetailsSchema } from "@/lib/schemas";
import { routes, siteUrl } from "@/lib/site-config";

import { EssenceSelect } from "./essence-select";
// import { FormPersist } from "./form-persist";
import { MemorySelect } from "./memory-select";
import { StatsDataList } from "./stats-data-list";
import { TravelerSelect } from "./traveler-select";

const startingMemoryLocations = ["q", "r", "identity", "movement"] as const;

const getStartingMemory = (
  traveler: string,
  travelerMemoryLocation: string,
) => {
  if (!traveler) return "";

  return (
    allMemories.find(
      (memory) =>
        memory.traveler === traveler &&
        memory.travelerMemoryLocation === travelerMemoryLocation,
    )?.id ?? ""
  );
};

export interface BuildFormProps
  extends Omit<FlexProps, "asChild" | "children"> {
  defaultValues?: BuildDetails;
}

export const BuildForm: FC<BuildFormProps> = ({ defaultValues, ...props }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setError,
    trigger,
    watch,
  } = useForm({
    defaultValues: defaultValues ?? defaultBuildDetails,
    mode: "onTouched",
    criteriaMode: "all",
    resolver: valibotResolver(buildDetailsSchema),
  });

  const travelerId = watch("traveler.id");
  const startingMemoryQ = watch("traveler.startingMemories.q");
  const startingMemoryR = watch("traveler.startingMemories.r");

  const startingMemoriesError =
    errors.traveler?.startingMemories?.q?.message ??
    errors.traveler?.startingMemories?.r?.message;

  const nameId = useId();
  const descriptionId = useId();

  const [hashId, setHashId] = useState<string>();
  const buildUrl = hashId && `${siteUrl}${routes.builds.pathname}/${hashId}`;

  const urlCopiedTimeoutRef = useRef<NodeJS.Timeout>(undefined);
  const [urlCopied, setUrlCopied] = useState(false);
  useEffect(() => () => clearTimeout(urlCopiedTimeoutRef.current), []);

  return (
    <>
      {/* <FormPersist control={control} reset={reset} /> */}

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
                        setValue(
                          "traveler.startingMemories",
                          {
                            q: getStartingMemory(id, "Q"),
                            r: getStartingMemory(id, "R"),
                            identity: getStartingMemory(id, "Identity"),
                            movement: getStartingMemory(id, "Movement"),
                          },
                          { shouldValidate: true },
                        );
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
                          const options = travelerId
                            ? allMemories.filter(
                                ({ traveler, travelerMemoryLocation }) =>
                                  traveler === travelerId &&
                                  travelerMemoryLocation ===
                                    location[0].toUpperCase() +
                                      location.slice(1),
                              )
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

                  {startingMemoriesError && (
                    <Box asChild maxWidth="292px">
                      <Text as="p" color="red" size="2" wrap="pretty">
                        {startingMemoriesError}
                      </Text>
                    </Box>
                  )}
                </Flex>

                <StatsDataList
                  traveler={allTravelers.find(({ id }) => id === travelerId)}
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
                    const error =
                      errors.memories?.[memoryIndex]?.id?.message ??
                      errors.memories?.[memoryIndex]?.essences?.find?.(Boolean)
                        ?.message;

                    return (
                      <Flex key={memoryIndex} direction="column" gap="1">
                        <Flex gap="3">
                          <Controller
                            control={control}
                            name={`memories.${memoryIndex}.id`}
                            render={({ field: { onChange, ...field } }) => (
                              <MemorySelect
                                {...field}
                                options={allMemories.filter(
                                  ({ id, traveler }) =>
                                    id !== "St_C_Sneeze" &&
                                    (!traveler ||
                                      id === startingMemoryQ ||
                                      id === startingMemoryR),
                                )}
                                onChange={(id) => {
                                  onChange(id);
                                  void trigger("traveler.startingMemories");
                                }}
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

                        {error && (
                          <Text as="p" color="red" size="2" wrap="pretty">
                            {error}
                          </Text>
                        )}
                      </Flex>
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
                  <Box asChild flexBasis="0%" flexGrow="1" minHeight="350px">
                    <TextArea
                      {...field}
                      autoCapitalize="on"
                      id={descriptionId}
                      mt="1"
                    />
                  </Box>
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

            <Button loading={isSubmitting} type="submit">
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
