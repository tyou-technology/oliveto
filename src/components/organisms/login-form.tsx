"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { FormField } from "@/components/atoms/form-field";
import { LoginSchema, LoginRequest } from "@/features/auth/types/auth.types";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { ROUTES } from "@/lib/config/routes";
import { SocialLogin } from "../molecules/social-login";
import { useEffect, useState } from "react";
import { LoadingScreen } from "../molecules/loading-screen";

export function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate: login, isPending } = useLogin();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = (data: LoginRequest) => {
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", data.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    login(data);
  };

  return (
    <>
      <LoadingScreen isLoading={isPending} />
      <div className="w-full max-w-md">
        <Link href={ROUTES.PUBLIC.HOME} className="lg:hidden block mb-12">
          <Image src="/logo.png" alt="Logo" width={150} height={150} />
        </Link>

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            Acesse sua conta
          </h2>
          <p className="text-gray-500">
            Bem-vindo de volta! Insira suas credenciais.
          </p>
        </div>

        <form
          id="login-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FormField
            label="Email"
            type="email"
            {...register("email")}
            placeholder="seu@email.com"
            error={errors.email?.message}
          />

          <FormField
            label="Senha"
            type="password"
            {...register("password")}
            placeholder="Sua senha"
            error={errors.password?.message}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 bg-[#111] border border-[#222] rounded accent-primary"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="text-sm text-gray-400">Lembrar-me</span>
            </label>
            {/*<Link*/}
            {/*  href="/recuperar-senha" // TODO: Create this route*/}
            {/*  className="text-sm text-primary hover:underline"*/}
            {/*>*/}
            {/*  Esqueceu a senha?*/}
            {/*</Link>*/}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 py-4 bg-primary cursor-pointer text-black font-semibold rounded-lg hover:bg-[#00dd00] transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Entrar</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </>
            )}
          </button>
        </form>

        {/*<SocialLogin />*/}

        <div className="mt-10 text-center">
          <Link
            href={ROUTES.PUBLIC.HOME}
            className="text-gray-500 hover:text-primary transition-colors text-sm inline-flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar para o site
          </Link>
        </div>
      </div>
    </>
  );
}
