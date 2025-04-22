import { type FC, useEffect } from "react";
import { type Control, useFormState } from "react-hook-form";

import { type BuildDetails } from "@/lib/schemas";

export interface FormBeforeUnloadProps {
  control: Control<BuildDetails>;
}

export const FormBeforeUnload: FC<FormBeforeUnloadProps> = ({ control }) => {
  const { isDirty } = useFormState({ control });

  useEffect(() => {
    if (isDirty) {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        event.returnValue = true;
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () =>
        window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, [isDirty]);

  return <></>;
};
