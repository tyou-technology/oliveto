import { FilterSelect } from "@/components/atoms/filter-select";
import { yearOptions, categoryOptions } from "@/lib/constants/articles-page";

interface FilterBarProps {
  availableCount: number | string;
}

export function FilterBar({ availableCount }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-muted">
      {/* Year Filter */}
      <FilterSelect options={yearOptions} />

      {/* Category Filter */}
      <FilterSelect options={categoryOptions} />

      <span className="text-sm text-muted-foreground ml-auto">
        {availableCount} ARTIGOS DISPONÍVEIS
      </span>
    </div>
  );
}
