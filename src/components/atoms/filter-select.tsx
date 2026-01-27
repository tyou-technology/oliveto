import { ChevronDown } from "lucide-react";

interface FilterSelectProps {
  options: (string | number)[];
  className?: string;
}

export function FilterSelect({ options, className = "" }: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        className={`appearance-none bg-background border border-muted rounded px-4 py-2 pr-10 text-sm cursor-pointer hover:border-primary transition-colors ${className}`}
      >
        {options.map((option, index) => (
          <option className="text-black" key={index}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
    </div>
  );
}
