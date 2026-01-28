"use client";

import { useState } from "react";
import { LoginBranding } from "@/components/organisms/login-branding";
import { LoginForm } from "@/components/organisms/login-form";
import { PublicRoute } from "@/features/auth/components/PublicRoute";
import { FullPageLoader } from "@/components/molecules/FullPageLoader";

export default function LoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  return (
    <PublicRoute>
      {isLoggingIn && <FullPageLoader />}
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
            <LoginForm setIsLoggingIn={setIsLoggingIn} />
          </div>
        </div>
      </main>
    </PublicRoute>
  );
}
