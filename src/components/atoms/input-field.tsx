import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({
  name,
  placeholder,
  value,
  onChange,
  className,
  "aria-label": ariaLabel,
  ...props
}: InputFieldProps) {
  return (
    <input
      name={name}
      aria-label={ariaLabel || placeholder}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        "w-full bg-[#111] border border-border px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors",
        className
      )}
      {...props}
    />
  );
}
