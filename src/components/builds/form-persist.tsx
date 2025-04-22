import { isEqual } from "lodash-es";
import { useParams } from "next/navigation";
import { type FC, useEffect, useRef } from "react";
import {
  type Control,
  type UseFormReset,
  useFormState,
  useWatch,
} from "react-hook-form";

import { type BuildDetails, defaultBuildDetails } from "@/lib/schemas";

export interface FormPersistProps {
  control: Control<BuildDetails>;
  reset: UseFormReset<BuildDetails>;
}

// Make this a component instead of a hook because `useWatch` will re-render this component only
// if this is a hook, then the parent component (i.e. the entire form) will also be re-rendered, which is unnecessary
export const FormPersist: FC<FormPersistProps> = ({ control, reset }) => {
  const { isReady } = useFormState({ control });
  const watchedValues = useWatch({ control });
  const params = useParams<{ hashId?: string }>();
  const debounceTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  const storageKey = params.hashId ? `buildForm:${params.hashId}` : `buildForm`;
  const timeout = 24 * 60 * 60 * 1000; // 24 hr
  const persistDebounceWait = 500;

  useEffect(() => {
    if (!isReady) return;
    const str = localStorage.getItem(storageKey);
    if (!str) return;

    const { _timestamp = 0, ...values } = JSON.parse(str) as {
      _timestamp?: number;
    } & BuildDetails;

    if (Date.now() - _timestamp > timeout) {
      localStorage.removeItem(storageKey);
      return;
    }

    reset(values, { keepDefaultValues: true });
  }, [isReady, reset, storageKey, timeout]);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      if (!isReady) return;
      if (isEqual(watchedValues, defaultBuildDetails)) {
        localStorage.removeItem(storageKey);
        return;
      }

      localStorage.setItem(
        storageKey,
        JSON.stringify({
          ...watchedValues,
          _timestamp: Date.now(),
        }),
      );
    }, persistDebounceWait);

    return () => clearTimeout(debounceTimeoutRef.current);
  }, [isReady, storageKey, watchedValues]);

  return <></>;
};
