import { X, CheckCircle, Phone } from "lucide-react";
import { loginPageContent, COMPANY_WHATSAPP } from "@/lib/constants/login-page";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

export function SuccessModal({ isOpen, onClose, name }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface border border-neutral-800 rounded-2xl p-8 max-w-md w-full animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center ">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">
            {loginPageContent.successModalTitle}
          </h3>
          <p className="text-gray-400">
            {loginPageContent.successModalGreeting}{" "}
            <span className="text-primary font-medium">{name}</span>,{" "}
            {loginPageContent.successModalMessage}
          </p>
          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 space-y-2">
            <p className="text-sm text-gray-500">
              {loginPageContent.successModalStepsTitle}
            </p>
            <ul className="text-sm text-gray-300 space-y-2 text-left">
              {loginPageContent.successModalSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-gray-500">
            {loginPageContent.successModalFooter}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href={`https://wa.me/${COMPANY_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-white hover:border-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm">
              {loginPageContent.whatsappButtonText}
            </span>
          </a>
          <button
            onClick={onClose}
            className="py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
          >
            {loginPageContent.successModalUnderstood}
          </button>
        </div>
      </div>
    </div>
  );
}
