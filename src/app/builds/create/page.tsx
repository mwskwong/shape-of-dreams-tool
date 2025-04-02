"use client";

import "@radix-ui/themes/tokens/colors/red.css";

import { Button } from "@radix-ui/themes/components/button";
import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import * as TextField from "@radix-ui/themes/components/text-field";
import { useForm } from "@tanstack/react-form";
import { type FC } from "react";
import { type InferOutput, nonEmpty, object, pipe, string } from "valibot";

import { TravelerSelect } from "@/components/builds/traveler-select";

const schema = object({
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
});

const CreateBuild: FC = () => {
  const form = useForm({
    defaultValues: {
      buildName: "",
      traveler: {
        id: "",
        startingMemories: { q: "", r: "", identity: "", movement: "" },
      },
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
              <div>
                <TextField.Root
                  color={error ? "red" : undefined}
                  name={name}
                  placeholder="My Build"
                  value={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <Text as="div" color="red" mt="1" size="2">
                  {error}
                </Text>
              </div>
            );
          }}
        </form.Field>
        <form.Field name="traveler">
          {({ state, handleChange, handleBlur }) => (
            <TravelerSelect
              errorMessage={state.meta.errors[0]?.message}
              value={state.value}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          )}
        </form.Field>
        <Button type="submit">Submit</Button>
      </form>
    </Flex>
  );
};

export default CreateBuild;
