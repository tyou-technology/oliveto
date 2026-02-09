"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useCreateLead } from "./useCreateLead";
import { LeadOrigin } from "../types";

const contactFormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").max(100),
  email: z.string().email("Email inválido").max(100),
  cidade: z.string().max(50).optional(),
  telefone: z.string().min(1, "Telefone é obrigatório").max(20),
  mensagem: z.string().min(1, "Mensagem é obrigatória").max(1000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function useContactForm() {
  const { mutateAsync: createLead, isPending } = useCreateLead();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      cidade: "",
      telefone: "",
      mensagem: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await createLead({
        name: data.nome,
        email: data.email,
        phone: data.telefone,
        message: `${data.cidade ? `Cidade: ${data.cidade}\n` : ""}${data.mensagem}`,
        origin: LeadOrigin.CONTACT,
      });

      toast.success("Mensagem enviada com sucesso!");
      form.reset();
    } catch {
      console.error("Error submitting contact form");
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
  };
}
