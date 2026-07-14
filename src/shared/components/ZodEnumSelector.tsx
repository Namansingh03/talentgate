"use client";

import { useFormContext } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/ui/select";

type Props<T extends z.ZodEnum> = {
  name: string;
  schema: T;
};

export function ZodEnumSelect<T extends z.ZodEnum>({ name, schema }: Props<T>) {
  const { setValue, watch } = useFormContext();
  const value = watch(name);

  return (
    <Select
      value={value}
      onValueChange={(value) =>
        setValue(name, value, {
          shouldDirty: true,
          shouldValidate: true,
        })
      }
    >
      <SelectTrigger>
        <SelectValue placeholder={value && "Select..."} />
      </SelectTrigger>

      <SelectContent>
        {schema.options.map((option) => (
          <SelectItem key={option} value={option as string}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
