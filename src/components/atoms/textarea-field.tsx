import { cn } from "@/lib/utils";

interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextareaField({
  name,
  placeholder,
  value,
  onChange,
  className,
  "aria-label": ariaLabel,
  ...props
}: TextareaFieldProps) {
  return (
    <textarea
      name={name}
      aria-label={ariaLabel || placeholder}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        "w-full bg-[#111] border border-border px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none",
        className
      )}
      {...props}
    />
  );
}
