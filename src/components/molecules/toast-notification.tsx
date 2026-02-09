import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import type { Toast, ToastType } from "@/lib/types/auth";

interface ToastNotificationProps {
  toast: Toast;
  onClose: () => void;
}

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-primary" />,
  error: <AlertCircle className="w-5 h-5 text-red-500" />,
  loading: <Loader2 className="w-5 h-5 text-primary animate-spin" />,
};

const borderColorMap: Record<ToastType, string> = {
  success: "border-primary/30",
  error: "border-red-500/30",
  loading: "border-primary/30",
};

export function ToastNotification({ toast, onClose }: ToastNotificationProps) {
  if (!toast.show) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
      <div
        className={`bg-surface border ${
          borderColorMap[toast.type]
        } rounded-lg p-4 shadow-xl max-w-sm`}
      >
        <div className="flex items-start gap-3">
          {iconMap[toast.type]}
          <div className="flex-1">
            <p className="font-medium text-white">{toast.title}</p>
            <p className="text-sm text-gray-400 mt-1">{toast.message}</p>
          </div>
          {toast.type !== "loading" && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
