"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { SocialLogin } from "@/components/social-login";

const COMPANY_WHATSAPP = "5543991231726";
const COMPANY_EMAIL = "contato@olivetocontabilidade.com";

type ToastType = "success" | "error" | "loading";

interface Toast {
  show: boolean;
  type: ToastType;
  title: string;
  message: string;
}

function SuccessModal({
  isOpen,
  onClose,
  name,
}: {
  isOpen: boolean;
  onClose: () => void;
  name: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#111] border border-[#222] rounded-2xl p-8 max-w-md w-full animate-in fade-in zoom-in duration-300">
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
            Solicitação enviada!
          </h3>
          <p className="text-gray-400">
            Olá <span className="text-primary font-medium">{name}</span>,
            recebemos sua solicitação de cadastro.
          </p>
          <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-4 space-y-2">
            <p className="text-sm text-gray-500">O que acontece agora?</p>
            <ul className="text-sm text-gray-300 space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">1.</span>
                Nossa equipe analisará seus dados
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">2.</span>
                Entraremos em contato em até 24h úteis
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">3.</span>
                Você receberá suas credenciais de acesso
              </li>
            </ul>
          </div>
          <p className="text-xs text-gray-500">
            Dúvidas? Entre em contato pelo WhatsApp
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href={`https://wa.me/${COMPANY_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 bg-[#0a0a0a] border border-[#222] rounded-lg text-white hover:border-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm">WhatsApp</span>
          </a>
          <button
            onClick={onClose}
            className="py-3 bg-primary text-black font-semibold rounded-lg hover:bg-[#00dd00] transition-colors cursor-pointer"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}

function ToastNotification({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: () => void;
}) {
  if (!toast.show) return null;

  const iconMap = {
    success: <CheckCircle className="w-5 h-5 text-primary" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    loading: <Loader2 className="w-5 h-5 text-primary animate-spin" />,
  };

  const borderColorMap = {
    success: "border-primary/30",
    error: "border-red-500/30",
    loading: "border-primary/30",
  };

  return (
    <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
      <div
        className={`bg-[#111] border ${
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

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    company: "",
    confirmPassword: "",
  });
  const [toast, setToast] = useState<Toast>({
    show: false,
    type: "success",
    title: "",
    message: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleLogin = () => {
    setIsSubmitting(true);
    showToast("loading", "Verificando...", "Validando suas credenciais");

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setToast((prev) => ({ ...prev, show: false }));

      // Show error with shake animation on form
      const form = document.getElementById("login-form");
      form?.classList.add("animate-shake");
      setTimeout(() => form?.classList.remove("animate-shake"), 500);

      showToast(
        "error",
        "Credenciais inválidas",
        "Verifique seu email e senha ou entre em contato com nossa equipe para obter acesso."
      );
    }, 1500);
  };

  const handleRegister = () => {
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      showToast(
        "error",
        "Senhas não conferem",
        "Por favor, verifique se as senhas são iguais."
      );
      return;
    }

    setIsSubmitting(true);
    showToast("loading", "Enviando...", "Processando sua solicitação");

    // Prepare message for WhatsApp
    const message = encodeURIComponent(
      `*Nova solicitação de cadastro - Oliveto*\n\n` +
        `*Nome:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Telefone:* ${formData.phone}\n` +
        `*Empresa:* ${formData.company || "Não informado"}\n\n` +
        `Solicitação enviada via site.`
    );

    // Open WhatsApp in new tab (silently)
    const whatsappUrl = `https://wa.me/${COMPANY_WHATSAPP}?text=${message}`;

    // Simulate API call and open WhatsApp
    setTimeout(() => {
      setIsSubmitting(false);
      setToast((prev) => ({ ...prev, show: false }));

      // Open WhatsApp link
      window.open(whatsappUrl, "_blank");

      // Show success modal
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        email: "",
        password: "",
        name: "",
        phone: "",
        company: "",
        confirmPassword: "",
      });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
        name={formData.name || "Cliente"}
      />

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
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute select-none">
              <Image
                src="/simbolo_branco.png"
                alt="Logo"
                width={2000}
                height={2000}
              />
            </div>
          </div>

          {/* Decorative Lines */}
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-20 left-12 right-12 h-px bg-gradient-to-r from-primary/50 to-transparent" />

          {/* Logo */}
          <Link href="/" className="relative z-10">
            <Image src="/logo.png" alt="Logo" width={150} height={150} />
          </Link>

          {/* Content */}
          <div className="relative z-10 space-y-6">
            <h1 className="text-5xl font-bold text-white leading-tight">
              Contabilidade com
              <br />
              <span className="text-primary">olhar estratégico.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              Acesse sua conta para gerenciar documentos, acompanhar processos e
              ter acesso completo aos nossos serviços.
            </p>
          </div>

          {/* Footer Info */}
          <div className="relative z-10 flex items-center gap-8 text-sm text-gray-500">
            <span>Perícia</span>
            <span className="w-1 h-1 bg-primary rounded-full" />
            <span>Contabilidade</span>
            <span className="w-1 h-1 bg-primary rounded-full" />
            <span>Auditoria</span>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto">
          <div className="min-h-full w-full flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md">
              {/* Mobile Logo */}
              <Link href="/" className="lg:hidden block mb-12">
                <Image src="/logo.png" alt="Logo" width={150} height={150} />
              </Link>

              {/* Form Header */}
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {isLogin ? "Bem-vindo de volta." : "Criar conta."}
                </h2>
                <p className="text-gray-500">
                  {isLogin
                    ? "Entre com suas credenciais para acessar sua conta."
                    : "Preencha os dados abaixo para solicitar acesso."}
                </p>
              </div>

              {/* Toggle Tabs */}
              <div className="flex mb-8 bg-[#111] rounded-lg p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 text-center font-medium text-sm rounded-md transition-all ${
                    isLogin
                      ? "bg-primary text-black"
                      : "text-gray-400 hover:text-white cursor-pointer"
                  }`}
                >
                  Entrar
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 text-center font-medium text-sm rounded-md transition-all cursor-pointer ${
                    !isLogin
                      ? "bg-primary text-black"
                      : "text-gray-400 hover:text-white cursor-pointer"
                  }`}
                >
                  Cadastrar
                </button>
              </div>

              {/* Form */}
              <form
                id="login-form"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-[#111] border border-[#222] text-white rounded-lg focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
                        placeholder="Seu nome"
                        required={!isLogin}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-[#111] border border-[#222] text-white rounded-lg focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
                        placeholder="(00) 00000-0000"
                        required={!isLogin}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">
                        Empresa{" "}
                        <span className="text-gray-600">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-[#111] border border-[#222] text-white rounded-lg focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-[#111] border border-[#222] text-white rounded-lg focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
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
                    className="w-full px-4 py-4 bg-[#111] border border-[#222] text-white rounded-lg focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">
                      Confirmar senha
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-[#111] border border-[#222] text-white rounded-lg focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600"
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
                        className="w-4 h-4 bg-[#111] border border-[#222] rounded accent-primary"
                      />
                      <span className="text-sm text-gray-400">Lembrar-me</span>
                    </label>
                    <Link
                      href="/recuperar-senha"
                      className="text-sm text-primary hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-4 bg-primary cursor-pointer text-black font-semibold rounded-lg hover:bg-[#00dd00] transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>{isLogin ? "Entrar" : "Solicitar acesso"}</span>
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

                {!isLogin && (
                  <p className="text-xs text-center text-gray-500 mt-4">
                    Ao solicitar acesso, seus dados serão enviados para nossa
                    equipe que entrará em contato para finalizar seu cadastro.
                  </p>
                )}
              </form>

              {/* {isLogin && <SocialLogin />} */}

              {!isLogin && (
                <div className="mt-8 p-4 bg-[#111] border border-[#222] rounded-lg">
                  <p className="text-sm text-gray-400 mb-3">
                    Prefere falar diretamente conosco?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://wa.me/${COMPANY_WHATSAPP}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-2 px-4 bg-[#0a0a0a] border border-[#222] rounded-lg text-gray-300 hover:border-primary hover:text-primary transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={`mailto:${COMPANY_EMAIL}`}
                      className="flex items-center justify-center gap-2 py-2 px-4 bg-[#0a0a0a] border border-[#222] rounded-lg text-gray-300 hover:border-primary hover:text-primary transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Back Link */}
              <div className="mt-10 text-center">
                <Link
                  href="/"
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
          </div>
        </div>
      </main>
    </>
  );
}
