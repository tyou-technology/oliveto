"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import {
  contactPageContent,
  formPlaceholders,
} from "@/lib/constants/contact-page";
import { Form } from "@/components/atoms/form";
import { CustomFormField } from "@/components/molecules/custom-form-field";
import { Button } from "@/components/atoms/button";
import { useContactForm } from "@/features/leads/hooks/useContactForm";

export function ContactForm() {
  const { form, onSubmit, isPending } = useContactForm();

  const inputClasses =
    "bg-surface border-border px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors h-auto rounded-none border";

  return (
    <div className="pt-12">
      <p className="text-white font-medium mb-1">
        {contactPageContent.formTitle}
      </p>
      <p className="text-white mb-8">{contactPageContent.formSubtitle}</p>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormField
              control={form.control}
              name="nome"
              placeholder={formPlaceholders.nome}
              className={inputClasses}
              maxLength={100}
            />
            <CustomFormField
              control={form.control}
              name="email"
              type="email"
              placeholder={formPlaceholders.email}
              className={inputClasses}
              maxLength={100}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormField
              control={form.control}
              name="cidade"
              placeholder={formPlaceholders.cidade}
              className={inputClasses}
              maxLength={50}
            />
            <CustomFormField
              control={form.control}
              name="telefone"
              type="tel"
              placeholder={formPlaceholders.telefone}
              className={inputClasses}
              maxLength={20}
            />
          </div>
          <CustomFormField
            control={form.control}
            name="mensagem"
            placeholder={formPlaceholders.mensagem}
            isTextarea
            rows={6}
            className={inputClasses}
            maxLength={1000}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="h-auto w-auto rounded-none bg-transparent border border-border px-6 py-3 text-base font-medium text-white hover:bg-transparent hover:border-primary hover:text-primary transition-colors group flex items-center gap-8 disabled:opacity-50"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                {contactPageContent.submitButtonLoadingText}{" "}
                <Loader2 className="w-4 h-4 animate-spin" />
              </span>
            ) : (
              <>
                <span>{contactPageContent.submitButtonText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
