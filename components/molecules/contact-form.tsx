"use client";

import { useState } from "react";
import type { ContactFormData } from "@/lib/types/contact-form";
import {
  contactPageContent,
  formPlaceholders,
  COMPANY_WHATSAPP,
} from "@/lib/constants/contact-page";
import { InputField } from "@/components/atoms/input-field";
import { TextareaField } from "@/components/atoms/textarea-field";
import { SubmitButton } from "@/components/atoms/submit-button";

const initialFormState: ContactFormData = {
  nome: "",
  email: "",
  cidade: "",
  telefone: "",
  mensagem: "",
};

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const message = encodeURIComponent(
      `*Nova mensagem do site - Oliveto*\\n\\n` +
        `*Nome:* ${formData.nome}\\n` +
        `*Email:* ${formData.email}\\n` +
        `*Cidade:* ${formData.cidade}\\n` +
        `*Telefone:* ${formData.telefone}\\n\\n` +
        `*Mensagem:*\\n${formData.mensagem}`
    );

    const whatsappUrl = `https://wa.me/${COMPANY_WHATSAPP}?text=${message}`;

    // Simulate a small delay for better UX
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setLoading(false);
      setFormData(initialFormState);
    }, 1000);
  };

  return (
    <div className="pt-12">
      <p className="text-white font-medium mb-1">
        {contactPageContent.formTitle}
      </p>
      <p className="text-white mb-8">{contactPageContent.formSubtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder={formPlaceholders.nome}
            required
          />
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={formPlaceholders.email}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            placeholder={formPlaceholders.cidade}
          />
          <InputField
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder={formPlaceholders.telefone}
            required
          />
        </div>
        <TextareaField
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          placeholder={formPlaceholders.mensagem}
          required
          rows={6}
        />
        <SubmitButton
          loading={loading}
          loadingText={contactPageContent.submitButtonLoadingText}
          submitText={contactPageContent.submitButtonText}
        />
      </form>
    </div>
  );
}
