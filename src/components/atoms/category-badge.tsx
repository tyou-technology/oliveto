import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  color?: string;
  className?: string;
}

export function CategoryBadge({ category, color, className }: CategoryBadgeProps) {
  return (
    <span 
      className={cn("text-sm font-medium px-2 py-0.5 rounded-md bg-opacity-10 border border-opacity-20", className)}
      style={{
        color: color || '#00FF90',
        backgroundColor: color ? `${color}20` : '#00FF9020',
        borderColor: color ? `${color}40` : '#00FF9040'
      }}
    >
      {category}
    </span>
  );
}
