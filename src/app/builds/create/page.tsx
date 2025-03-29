"use client";

import "@radix-ui/themes/tokens/colors/red.css";

import { Button } from "@radix-ui/themes/components/button";
import { Flex } from "@radix-ui/themes/components/flex";
import { Text } from "@radix-ui/themes/components/text";
import * as TextField from "@radix-ui/themes/components/text-field";
import { useForm } from "@tanstack/react-form";
import { type FC } from "react";
import { type InferOutput, nonEmpty, object, pipe, string } from "valibot";

const schema = object({
  name: pipe(string(), nonEmpty("Name is required.")),
});

const CreateBuild: FC = () => {
  const form = useForm({
    defaultValues: { name: "" } satisfies InferOutput<typeof schema>,
    validators: { onChange: schema },
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
        <form.Field name="name">
          {({ state, handleChange, handleBlur }) => (
            <>
              <TextField.Root
                color={state.meta.errors.length > 0 ? "red" : undefined}
                placeholder="My Build"
                value={state.value}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
              />
              <Text color="red" size="2">
                {state.meta.errors[0]?.message}
              </Text>
            </>
          )}
        </form.Field>
        <Button type="submit">Submit</Button>
      </form>
    </Flex>
  );
};

export default CreateBuild;
