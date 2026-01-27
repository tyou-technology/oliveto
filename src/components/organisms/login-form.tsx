"use client";

import { useState } from "react";
import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Phone, Mail } from "lucide-react";
import { FormField } from "@/components/atoms/form-field";
import type {
  LoginFormData,
  RegisterFormData,
  Toast,
  ToastType,
} from "@/lib/types/auth";
import {
  loginPageContent,
  COMPANY_WHATSAPP,
  COMPANY_EMAIL,
} from "@/lib/constants/login-page";

interface LoginFormProps {
  onShowToast: (type: ToastType, title: string, message: string) => void;
  onRegisterSuccess: (name: string) => void;
}

export function LoginForm({ onShowToast, onRegisterSuccess }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    name: "",
    phone: "",
    company: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = () => {
    setIsSubmitting(true);
    onShowToast(
      "loading",
      loginPageContent.verifyingToast.title,
      loginPageContent.verifyingToast.message
    );

    setTimeout(() => {
      setIsSubmitting(false);

      const form = document.getElementById("login-form");
      form?.classList.add("animate-shake");
      setTimeout(() => form?.classList.remove("animate-shake"), 500);

      onShowToast(
        "error",
        loginPageContent.invalidCredentialsToast.title,
        loginPageContent.invalidCredentialsToast.message
      );
    }, 1500);
  };

  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      onShowToast(
        "error",
        loginPageContent.passwordMismatchToast.title,
        loginPageContent.passwordMismatchToast.message
      );
      return;
    }

    setIsSubmitting(true);
    onShowToast(
      "loading",
      loginPageContent.sendingToast.title,
      loginPageContent.sendingToast.message
    );

    const message = encodeURIComponent(
      `*Nova solicitação de cadastro - Oliveto*\\n\\n` +
        `*Nome:* ${formData.name}\\n` +
        `*Email:* ${formData.email}\\n` +
        `*Telefone:* ${formData.phone}\\n` +
        `*Empresa:* ${formData.company || "Não informado"}\\n\\n` +
        `Solicitação enviada via site.`
    );

    const whatsappUrl = `https://wa.me/${COMPANY_WHATSAPP}?text=${message}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, "_blank");
      onRegisterSuccess(formData.name || "Cliente");
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

  return (
    <div className="w-full max-w-md">
      {/* Mobile Logo */}
      <Link href="/public" className="lg:hidden block mb-12">
        <Image src="/logo.png" alt="Logo" width={150} height={150} />
      </Link>

      {/* Form Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">
          {isLogin
            ? loginPageContent.loginTitle
            : loginPageContent.registerTitle}
        </h2>
        <p className="text-gray-500">
          {isLogin
            ? loginPageContent.loginSubtitle
            : loginPageContent.registerSubtitle}
        </p>
      </div>

      {/* Toggle Tabs */}
      <div className="flex mb-8 bg-[#111] rounded-lg p-1">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-3 text-center font-medium text-sm rounded-md transition-all ${
            isLogin
              ? "bg-primary text-black"
              : "text-gray-400 hover:text-white cursor-pointer"
          }`}
        >
          {loginPageContent.loginTab}
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-3 text-center font-medium text-sm rounded-md transition-all cursor-pointer ${
            !isLogin
              ? "bg-primary text-black"
              : "text-gray-400 hover:text-white cursor-pointer"
          }`}
        >
          {loginPageContent.registerTab}
        </button>
      </div>

      {/* Form */}
      <form id="login-form" onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <>
            <FormField
              label={loginPageContent.nameLabel}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={loginPageContent.namePlaceholder}
              required={!isLogin}
            />
            <FormField
              label={loginPageContent.phoneLabel}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={loginPageContent.phonePlaceholder}
              required={!isLogin}
            />
            <FormField
              label={`${loginPageContent.companyLabel} ${loginPageContent.companyOptional}`}
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder={loginPageContent.companyPlaceholder}
            />
          </>
        )}

        <FormField
          label={loginPageContent.emailLabel}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={loginPageContent.emailPlaceholder}
          required
        />

        <FormField
          label={loginPageContent.passwordLabel}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={loginPageContent.passwordPlaceholder}
          required
        />

        {!isLogin && (
          <FormField
            label={loginPageContent.confirmPasswordLabel}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder={loginPageContent.passwordPlaceholder}
            required={!isLogin}
          />
        )}

        {isLogin && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 bg-[#111] border border-[#222] rounded accent-primary"
              />
              <span className="text-sm text-gray-400">
                {loginPageContent.rememberMeLabel}
              </span>
            </label>
            <Link
              href="/recuperar-senha"
              className="text-sm text-primary hover:underline"
            >
              {loginPageContent.forgotPasswordLink}
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
              <span>
                {isLogin
                  ? loginPageContent.loginButtonText
                  : loginPageContent.registerButtonText}
              </span>
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
            {loginPageContent.registerDisclaimer}
          </p>
        )}
      </form>

      {!isLogin && (
        <div className="mt-8 p-4 bg-[#111] border border-[#222] rounded-lg">
          <p className="text-sm text-gray-400 mb-3">
            {loginPageContent.contactPreference}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${COMPANY_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-4 bg-[#0a0a0a] border border-[#222] rounded-lg text-gray-300 hover:border-primary hover:text-primary transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{loginPageContent.whatsappButtonText}</span>
            </a>
            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="flex items-center justify-center gap-2 py-2 px-4 bg-[#0a0a0a] border border-[#222] rounded-lg text-gray-300 hover:border-primary hover:text-primary transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              <span>{loginPageContent.emailButtonText}</span>
            </a>
          </div>
        </div>
      )}

      {/* Back Link */}
      <div className="mt-10 text-center">
        <Link
          href="/public"
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
          {loginPageContent.backLinkText}
        </Link>
      </div>
    </div>
  );
}
