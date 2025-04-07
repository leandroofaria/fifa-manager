"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/utils/shadcn/dialog";
import { GenericForm } from "@/utils/shadcn/genericForm";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  titulo: z.string().min(3, "Título é obrigatório"),
  conteudo: z.string().min(10, "Conteúdo deve ter pelo menos 10 caracteres"),
  autor: z.string().min(2, "Autor é obrigatório"),
  data: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data inválida. Use o formato AAAA-MM-DD",
    }),
});

export function FormDialog() {
  const [open, setOpen] = useState(false);

  async function handlePostNoticia(data: z.infer<typeof schema>) {
    await fetch("http://localhost:3000/api/noticias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        foto: "/fotos/24-25/default.jpg",
      }),
    });

    // Fecha o dialog e atualiza a página
    setOpen(false);
    window.location.reload();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm font-medium px-4 py-2 rounded bg-mediumgreen text-white hover:brightness-110 transition">
          Nova Notícia
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogTitle>Nova Notícia</DialogTitle>
        <GenericForm
          schema={schema}
          defaultValues={{
            titulo: "",
            conteudo: "",
            autor: "",
            data: "",
          }}
          onSubmit={handlePostNoticia}
          fields={[
            {
              name: "titulo",
              label: "Título",
              placeholder: "Ex: Nova Revelação",
            },
            {
              name: "conteudo",
              label: "Conteúdo",
              placeholder: "Texto da notícia",
            },
            {
              name: "autor",
              label: "Autor",
              placeholder: "Ex: ESPN",
            },
            {
              name: "data",
              label: "Data",
              placeholder: "AAAA-MM-DD",
              description: "Formato: 2024-09-23",
            },
          ]}
        />
      </DialogContent>
    </Dialog>
  );
}
