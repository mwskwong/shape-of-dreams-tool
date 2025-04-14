import { Button } from "@radix-ui/themes/components/button";
import * as CheckboxGroup from "@radix-ui/themes/components/checkbox-group";
import * as Popover from "@radix-ui/themes/components/popover";
import { ScrollArea } from "@radix-ui/themes/components/scroll-area";
import { Text } from "@radix-ui/themes/components/text";
import { IconChevronDown } from "@tabler/icons-react";
import {
  type FC,
  Fragment,
  type MouseEventHandler,
  type PropsWithChildren,
} from "react";

import styles from "./cheeckbox-group.module.css";

interface Item {
  value: string;
  name?: string;
}

export interface CheckboxGroupSelectProps
  extends PropsWithChildren,
    Omit<CheckboxGroup.RootProps, "onReset"> {
  options?: Item[] | { group: string; items: Item[] }[];
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
        <Button className="rt-SelectTrigger" color="gray" variant="surface">
          {children}
          <IconChevronDown size={16} />
        </Button>
      </Popover.Trigger>
      <Popover.Content className={styles.popoverContent} minWidth="150px">
        <ScrollArea className={styles.scrollArea} type="scroll">
          <CheckboxGroup.Root {...props}>
            {options.map((option) =>
              "group" in option ? (
                <Fragment key={option.group}>
                  <Text color="gray" size="2">
                    {option.group}
                  </Text>
                  {option.items.map(({ name, value }) => (
                    <CheckboxGroup.Item key={value} value={value}>
                      {name ?? value}
                    </CheckboxGroup.Item>
                  ))}
                </Fragment>
              ) : (
                <CheckboxGroup.Item key={option.value} value={option.value}>
                  {option.name ?? option.value}
                </CheckboxGroup.Item>
              ),
            )}
          </CheckboxGroup.Root>
        </ScrollArea>
        <Popover.Close>
          <Button color="gray" mt="4" variant="ghost" onClick={onReset}>
            Reset
          </Button>
        </Popover.Close>
      </Popover.Content>
    </Popover.Root>
  );
};
