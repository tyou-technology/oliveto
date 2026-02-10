interface LoadMoreButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean
}

export function LoadMoreButton({ text, onClick, disabled=false }: LoadMoreButtonProps) {
  return (
    <div className="border-t border-muted pt-8">
      <button
        onClick={onClick}
        className="text-sm font-medium hover:text-primary transition-all duration-200 ease-in-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}
