import { FilterSelect } from "@/components/atoms/filter-select";
import { yearOptions, categoryOptions } from "@/lib/constants/articles-page";

interface FilterBarProps {
  availableCount: number;
}

export function FilterBar({ availableCount }: FilterBarProps) {
  const countText =
    availableCount === 1
      ? "1 ARTIGO DISPONÍVEL"
      : `${availableCount} ARTIGOS DISPONÍVEIS`;

  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      {/* Year Filter */}
      <FilterSelect options={yearOptions} />

      {/* Category Filter */}
      {/* <FilterSelect options={categoryOptions} /> */}

      <span className="text-sm text-muted-foreground ml-auto">{countText}</span>
    </div>
  );
}
