import { Button } from "@radix-ui/themes/components/button";
import * as CheckboxGroup from "@radix-ui/themes/components/checkbox-group";
import * as Popover from "@radix-ui/themes/components/popover";
import { IconChevronDown } from "@tabler/icons-react";
import { type FC, type MouseEventHandler, type PropsWithChildren } from "react";

export interface CheckboxGroupSelectProps
  extends PropsWithChildren,
    Omit<CheckboxGroup.RootProps, "onReset"> {
  options?: { value: string; label?: string }[];
  onReset?: MouseEventHandler<HTMLButtonElement>;
}

export const CheckboxGroupSelect: FC<CheckboxGroupSelectProps> = ({
  children,
  options = [],
  onReset,
  ...props
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button color="gray" variant="outline">
          {children}
          <IconChevronDown size={16} />
        </Button>
      </Popover.Trigger>
      <Popover.Content minWidth="150px">
        <CheckboxGroup.Root {...props}>
          {options.map(({ value, label }) => (
            <CheckboxGroup.Item key={value} value={value}>
              {label ?? value}
            </CheckboxGroup.Item>
          ))}
        </CheckboxGroup.Root>
        <Popover.Close>
          <Button color="gray" mt="4" variant="ghost" onClick={onReset}>
            Reset
          </Button>
        </Popover.Close>
      </Popover.Content>
    </Popover.Root>
  );
};
