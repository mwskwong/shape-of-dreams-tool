// ref: https://github.com/tiaanduplessis/react-hook-form-persist/blob/master/src/index.tsx
// and based on https://github.com/tiaanduplessis/react-hook-form-persist/issues/33#issuecomment-2091368616

import { debounce } from "lodash-es";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import {
  type Control,
  type FieldValues,
  type UseFormReset,
  useWatch,
} from "react-hook-form";

export interface FormPersistProps<T extends FieldValues> {
  control: Control<T>;
  reset: UseFormReset<T>;
}

// Make this a component instead of a hook because `useWatch` will re-render this component only
// if this is a hook, then the parent component (i.e. the entire form) will also be re-rendered, which is unnecessary
export const FormPersist = <T extends FieldValues>({
  control,
  reset,
}: FormPersistProps<T>) => {
  const watchedValues = useWatch({ control });
  const params = useParams<{ hashId?: string }>();

  const storageKey = params.hashId ? `buildForm:${params.hashId}` : `buildForm`;
  const timeout = 24 * 60 * 60 * 1000; // 24 hr

  useEffect(() => {
    const str = localStorage.getItem(storageKey);

    if (str) {
      const { _timestamp = 0, ...values } = JSON.parse(str) as {
        _timestamp?: number;
      } & T;

      if (Date.now() - _timestamp > timeout) {
        localStorage.removeItem(storageKey);
        return;
      }

      reset(values as T, { keepDefaultValues: true });
    }
  }, [reset, storageKey, timeout]);

  useEffect(() => {
    const debouncedPersist = debounce(() => {
      const values = Object.assign({}, watchedValues);
      if (Object.entries(watchedValues).length > 0) {
        values._timestamp = Date.now();

        localStorage.setItem(storageKey, JSON.stringify(values));
      }
    }, 500);

    debouncedPersist();

    return () => debouncedPersist.cancel();
  }, [storageKey, watchedValues]);

  // eslint-disable-next-line unicorn/no-null
  return null;
};
