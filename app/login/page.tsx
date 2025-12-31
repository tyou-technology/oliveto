"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 -left-20 text-[400px] font-bold text-[#00FF90] leading-none select-none">
            \\/
          </div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#00FF90]/30 to-transparent" />
        <div className="absolute bottom-20 left-12 right-12 h-px bg-gradient-to-r from-[#00FF90]/50 to-transparent" />

        {/* Logo */}
        <Link href="/" className="relative z-10">
          <span className="text-2xl font-bold text-white tracking-wider">
            OLI<span className="text-[#00FF90]">\\</span>VETO
          </span>
        </Link>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Contabilidade com
            <br />
            <span className="text-[#00FF90]">olhar estratégico.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md">
            Acesse sua conta para gerenciar documentos, acompanhar processos e
            ter acesso completo aos nossos serviços.
          </p>
        </div>

        {/* Footer Info */}
        <div className="relative z-10 flex items-center gap-8 text-sm text-gray-500">
          <span>Perícia</span>
          <span className="w-1 h-1 bg-[#00FF90] rounded-full" />
          <span>Contabilidade</span>
          <span className="w-1 h-1 bg-[#00FF90] rounded-full" />
          <span>Auditoria</span>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden block mb-12">
            <span className="text-2xl font-bold text-white tracking-wider">
              OLI<span className="text-[#00FF90]">\\</span>VETO
            </span>
          </Link>

          {/* Form Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? "Bem-vindo de volta." : "Criar conta."}
            </h2>
            <p className="text-gray-500">
              {isLogin
                ? "Entre com suas credenciais para acessar sua conta."
                : "Preencha os dados abaixo para criar sua conta."}
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex mb-8 bg-[#111] rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-center font-medium text-sm rounded-md transition-all ${
                isLogin
                  ? "bg-[#00FF90] text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-center font-medium text-sm rounded-md transition-all ${
                !isLogin
                  ? "bg-[#00FF90] text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Nome completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-[#111] border border-[#222] text-white rounded-lg focus:outline-none focus:border-[#00FF90] transition-colors placeholder:text-gray-600"
                  placeholder="Seu nome"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-[#111] border border-[#222] text-white rounded-lg focus:outline-none focus:border-[#00FF90] transition-colors placeholder:text-gray-600"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Senha</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-[#111] border border-[#222] text-white rounded-lg focus:outline-none focus:border-[#00FF90] transition-colors placeholder:text-gray-600"
                placeholder="••••••••"
                required
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Confirmar senha</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-[#111] border border-[#222] text-white rounded-lg focus:outline-none focus:border-[#00FF90] transition-colors placeholder:text-gray-600"
                  placeholder="••••••••"
                  required={!isLogin}
                />
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-[#111] border border-[#222] rounded accent-[#00FF90]"
                  />
                  <span className="text-sm text-gray-400">Lembrar-me</span>
                </label>
                <Link
                  href="/recuperar-senha"
                  className="text-sm text-[#00FF90] hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-4 py-4 bg-[#00FF90] text-black font-semibold rounded-lg hover:bg-[#00dd00] transition-colors flex items-center justify-center gap-2 group"
            >
              <span>{isLogin ? "Entrar" : "Criar conta"}</span>
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
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-[#222]" />
            <span className="text-gray-500 text-sm">ou continue com</span>
            <div className="flex-1 h-px bg-[#222]" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 bg-[#111] border border-[#222] rounded-lg hover:border-[#00FF90] transition-colors group">
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                Google
              </span>
            </button>

            <button className="flex items-center justify-center gap-3 py-3 bg-[#111] border border-[#222] rounded-lg hover:border-[#00FF90] transition-colors group">
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
              </svg>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                GitHub
              </span>
            </button>
          </div>

          {/* Back Link */}
          <div className="mt-10 text-center">
            <Link
              href="/"
              className="text-gray-500 hover:text-[#00FF90] transition-colors text-sm inline-flex items-center gap-2"
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
      </div>
    </main>
  );
}
