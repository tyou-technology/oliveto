import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span className={cn("text-[#00FF90] text-sm font-medium", className)}>
      {category}
    </span>
  );
}
