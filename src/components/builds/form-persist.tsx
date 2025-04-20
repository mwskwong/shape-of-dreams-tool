// ref: https://github.com/tiaanduplessis/react-hook-form-persist/blob/master/src/index.tsx
// and based on https://github.com/tiaanduplessis/react-hook-form-persist/issues/33#issuecomment-2091368616

import { debounce } from "lodash-es";
import { useParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { type Control, type UseFormSetValue, useWatch } from "react-hook-form";

import { type BuildDetails } from "@/lib/schemas";

export interface FormPersistProps {
  control: Control<BuildDetails>;
  setValue: UseFormSetValue<BuildDetails>;
}

// Make this a component instead of a hook because `useWatch` will re-render this component only
// if this is a hook, then the parent component (i.e. the entire form) will also be re-rendered, which is unnecessary
export const FormPersist: FC<FormPersistProps> = ({ control, setValue }) => {
  const watchedValues = useWatch({ control });
  const params = useParams<{ hashId?: string }>();

  const storageKey = params.hashId ? `buildForm:${params.hashId}` : `buildForm`;
  const timeout = 24 * 60 * 60 * 1000; // 24 hr

  useEffect(() => {
    const str = localStorage.getItem(storageKey);

    if (str) {
      const { _timestamp = 0, ...values } = JSON.parse(str) as {
        _timestamp?: number;
      } & BuildDetails;

      if (Date.now() - _timestamp > timeout) {
        localStorage.removeItem(storageKey);
        return;
      }

      for (const [key, value] of Object.entries(values)) {
        // @ts-expect-error -- restore form value
        setValue(key, value);
      }
    }
  }, [setValue, storageKey, timeout]);

  const debouncedPersist = debounce(() => {
    if (Object.keys(watchedValues).length > 0) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          ...watchedValues,
          _timestamp: Date.now(),
        }),
      );
    }
  }, 500);

  useEffect(() => {
    debouncedPersist();
    return () => debouncedPersist.cancel();
  }, [debouncedPersist]);

  // eslint-disable-next-line unicorn/no-null
  return null;
};
