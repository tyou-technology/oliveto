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
import { toast } from "sonner";
import { useCreateLead } from "@/features/leads/hooks";
import { LeadOrigin } from "@/features/leads/types";

const initialFormState: ContactFormData = {
  nome: "",
  email: "",
  cidade: "",
  telefone: "",
  mensagem: "",
};

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormState);
  const { mutateAsync: createLead, isPending } = useCreateLead();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Save to Database via API
      await createLead({
        name: formData.nome,
        email: formData.email,
        phone: formData.telefone,
        message: `${formData.cidade ? `Cidade: ${formData.cidade}\n` : ""}${formData.mensagem}`,
        origin: LeadOrigin.CONTACT,
      });

      toast.success("Mensagem enviada com sucesso!");

      // 2. Clear Form
      setFormData(initialFormState);

    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    }
  };

  return (
    <div className="pt-12">
      <p className="text-white font-medium mb-1">
        {contactPageContent.formTitle}
      </p>
      <p className="text-white mb-8">{contactPageContent.formSubtitle}</p>

      {/* Security: maxLength limits prevent excessive payload/DoS attacks */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder={formPlaceholders.nome}
            required
            maxLength={100}
          />
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={formPlaceholders.email}
            required
            maxLength={100}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            placeholder={formPlaceholders.cidade}
            maxLength={50}
          />
          <InputField
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder={formPlaceholders.telefone}
            required
            maxLength={20}
          />
        </div>
        <TextareaField
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          placeholder={formPlaceholders.mensagem}
          required
          rows={6}
          maxLength={1000}
        />
        <SubmitButton
          loading={isPending}
          loadingText={contactPageContent.submitButtonLoadingText}
          submitText={contactPageContent.submitButtonText}
        />
      </form>
    </div>
  );
}
