import { Check, ChevronDown } from "lucide-react";
import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

export interface SelectProps<Option extends string>
  extends Omit<ComponentProps<"div">, "children"> {
  pending?: boolean;
  options?: Option[];
  label?: string;
  value?: Option[];
  onValueChange?: (value: Option[]) => void;
  onReset?: () => void;
  optionFormatter?: (option: Option) => string;
}

export const Select = <Option extends string>({
  pending,
  options = [],
  label,
  value = [],
  onValueChange,
  onReset,
  optionFormatter,
  className,
}: SelectProps<Option>) => (
  <div key={label} className={cn("dropdown", className)}>
    <summary
      className="input w-full cursor-pointer select-none"
      role="button"
      tabIndex={0}
    >
      <span className="flex-1">{label}</span>
      {value.length > 0 && (
        <div className="badge badge-sm badge-primary">{value.length}</div>
      )}
      {pending ? (
        <span className="loading loading-xs" />
      ) : (
        <ChevronDown size="1.2em" />
      )}
    </summary>
    <ul
      className="menu dropdown-content card card-border mt-2 max-h-[calc(100svh-144px)] w-full flex-nowrap overflow-y-auto shadow-2xl md:min-w-48"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- needed by daisyUI to prevent focus loss
      tabIndex={0}
    >
      {options.map((option) => (
        <li key={option}>
          <button
            onClick={() =>
              onValueChange?.(
                value.includes(option)
                  ? value.filter((v) => v !== option)
                  : [...value, option],
              )
            }
          >
            {optionFormatter ? optionFormatter(option) : option}
            {value.includes(option) && (
              <Check className="ml-auto" size="1.2em" />
            )}
          </button>
        </li>
      ))}
      <li />
      <li>
        <button
          className="btn btn-ghost"
          disabled={value.length === 0}
          onClick={() => onReset?.()}
        >
          Reset
        </button>
      </li>
    </ul>
  </div>
);
