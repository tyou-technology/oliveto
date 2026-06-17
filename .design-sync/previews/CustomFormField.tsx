import * as React from "react";
import { useForm } from "react-hook-form";
import { Form, CustomFormField } from "oliveto-contabilidade";
import { Surface } from "./_surface";

export function ContactFields() {
  const form = useForm({ defaultValues: { name: "", email: "", message: "" } });
  // shadcn's FormItem/FormMessage read useFormContext() — wrap in <Form> (FormProvider).
  return (
    <Surface>
      <Form {...form}>
        <form style={{ display: "grid", gap: 16, maxWidth: 420 }}>
          <CustomFormField control={form.control} name="name" label="Nome" placeholder="Seu nome completo" />
          <CustomFormField control={form.control} name="email" label="E-mail" type="email" placeholder="voce@empresa.com.br" />
          <CustomFormField
            control={form.control}
            name="message"
            label="Mensagem"
            isTextarea
            placeholder="Conte-nos como podemos ajudar"
            rows={3}
          />
        </form>
      </Form>
    </Surface>
  );
}
