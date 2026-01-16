interface LoadMoreButtonProps {
  text: string;
  onClick?: () => void;
}

export function LoadMoreButton({ text, onClick }: LoadMoreButtonProps) {
  return (
    <div className="border-t border-muted pt-8">
      <button
        onClick={onClick}
        className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
      >
        {text}
      </button>
    </div>
  );
}
