import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, name, error, className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    let inputType = type;
    if (isPassword) {
      inputType = showPassword ? "text" : "password";
    }

    return (
      <div className="space-y-2">
        <label htmlFor={name} className="text-sm text-gray-400">
          {label}
        </label>
        <div className="relative">
          <input
            id={name}
            name={name}
            type={inputType}
            ref={ref}
            className={cn(
              "w-full px-4 py-4 bg-[#111] border border-[#222] text-white rounded-lg focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600",
              error && "border-red-500",
              isPassword && "pr-12", // Add padding for the eye icon
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";
