"use client";

import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { cn } from "@/lib/utils";

interface CustomFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  isTextarea?: boolean;
  className?: string; // For the input/textarea
  containerClassName?: string; // For the FormItem
  rows?: number;
  maxLength?: number;
}

export function CustomFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  isTextarea = false,
  className,
  containerClassName,
  rows,
  maxLength,
}: CustomFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {isTextarea ? (
              <Textarea
                placeholder={placeholder}
                className={cn("resize-none", className)}
                rows={rows}
                maxLength={maxLength}
                {...field}
              />
            ) : (
              <Input
                placeholder={placeholder}
                type={type}
                className={className}
                maxLength={maxLength}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
