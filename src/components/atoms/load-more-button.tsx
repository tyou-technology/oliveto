import { Spinner } from './spinner'
import { cn } from '@/lib/utils'

interface LoadMoreButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function LoadMoreButton({ text, onClick, disabled = false, loading = false }: LoadMoreButtonProps) {
  return (
    <div className="border-t border-muted pt-8 flex justify-center">
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={cn(
          "group flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 ease-in-out",
          "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-4 py-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          loading && "cursor-wait"
        )}
        aria-busy={loading}
      >
        {loading && <Spinner className="size-4 animate-spin text-primary" />}
        <span>{text}</span>
      </button>
    </div>
  );
}
