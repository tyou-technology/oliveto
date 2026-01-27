import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, name, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor={name} className="text-sm text-gray-400">
          {label}
        </label>
        <input
          id={name}
          name={name}
          ref={ref}
          className={cn(
            "w-full px-4 py-4 bg-[#111] border border-[#222] text-white rounded-lg focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";
