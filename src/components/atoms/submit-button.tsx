import { ArrowRight, Loader2 } from "lucide-react";

interface SubmitButtonProps {
  loading: boolean;
  loadingText: string;
  submitText: string;
}

export function SubmitButton({
  loading,
  loadingText,
  submitText,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex items-center gap-8 border border-border px-6 py-3 text-white hover:border-primary hover:text-primary transition-colors group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <span className="font-medium flex items-center gap-2">
          {loadingText} <Loader2 className="w-4 h-4 animate-spin" />
        </span>
      ) : (
        <>
          <span className="font-medium">{submitText}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
}
