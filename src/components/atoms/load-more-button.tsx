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
        className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}
