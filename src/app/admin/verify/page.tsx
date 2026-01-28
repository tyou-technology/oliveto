"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useConfirmRegistration } from "@/features/auth/hooks/useConfirmRegistration";
import { ROUTES } from "@/lib/config/routes";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const { mutate: confirmRegistration, isPending, isSuccess, isError } =
    useConfirmRegistration();
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    if (token && !hasAttempted) {
      setHasAttempted(true);
      confirmRegistration({ verificationToken: token });
    }
  }, [token, confirmRegistration, hasAttempted]);

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 text-white">
        <div className="max-w-md w-full text-center space-y-6">
          <XCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold">Link Inválido</h1>
          <p className="text-gray-400">
            O link de verificação é inválido ou está incompleto.
          </p>
          <Link
            href={ROUTES.ADMIN.LOGIN}
            className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
          >
            Voltar para Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 text-white">
      <div className="mb-12">
        <Image src="/logo.png" alt="Logo" width={150} height={150} />
      </div>

      <div className="max-w-md w-full bg-[#111] border border-white/10 rounded-2xl p-8 text-center space-y-6">
        {isPending && (
          <>
            <Loader2 className="w-16 h-16 text-[#00FF90] animate-spin mx-auto" />
            <h1 className="text-2xl font-bold">Verificando...</h1>
            <p className="text-gray-400">
              Aguarde enquanto confirmamos seu cadastro.
            </p>
          </>
        )}

        {isSuccess && (
          <>
            <CheckCircle2 className="w-16 h-16 text-[#00FF90] mx-auto" />
            <h1 className="text-2xl font-bold">Conta Verificada!</h1>
            <p className="text-gray-400">
              Seu cadastro foi confirmado com sucesso. Você já pode acessar o
              painel.
            </p>
            <button
              onClick={() => router.push(ROUTES.ADMIN.DASHBOARD.HOME)}
              className="w-full py-3 bg-[#00FF90] text-black font-semibold rounded-xl hover:bg-[#00FF90]/90 transition-colors"
            >
              Acessar Dashboard
            </button>
          </>
        )}

        {isError && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h1 className="text-2xl font-bold">Erro na Verificação</h1>
            <p className="text-gray-400">
              Não foi possível verificar sua conta. O link pode ter expirado ou já
              foi utilizado.
            </p>
            <Link
              href={ROUTES.ADMIN.LOGIN}
              className="block w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              Voltar para Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
