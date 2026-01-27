"use client";

import { useState } from "react";
import type { Toast, ToastType } from "@/lib/types/auth";
import { ToastNotification } from "@/components/molecules/toast-notification";
import { SuccessModal } from "@/components/molecules/success-modal";
import { LoginBranding } from "@/components/organisms/login-branding";
import { LoginForm } from "@/components/organisms/login-form";

export default function LoginPage() {
  const [toast, setToast] = useState<Toast>({
    show: false,
    type: "success",
    title: "",
    message: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredName, setRegisteredName] = useState("");

  const showToast = (
    type: ToastType,
    title: string,
    message: string,
    duration = 4000
  ) => {
    setToast({ show: true, type, title, message });
    if (type !== "loading") {
      setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, duration);
    }
  };

  const handleRegisterSuccess = (name: string) => {
    setToast((prev) => ({ ...prev, show: false }));
    setRegisteredName(name);
    setShowSuccessModal(true);
  };

  return (
    <>
      {/* Toast Notification */}
      <ToastNotification
        toast={toast}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        name={registeredName}
      />

      {/* Shake Animation */}
      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-4px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(4px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>

      <main className="h-screen bg-[#0a0a0a] flex overflow-hidden">
        {/* Left Side - Branding */}
        <LoginBranding />

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto">
          <div className="min-h-full w-full flex items-center justify-center p-8 lg:p-12">
            <LoginForm
              onShowToast={showToast}
              onRegisterSuccess={handleRegisterSuccess}
            />
          </div>
        </div>
      </main>
    </>
  );
}
