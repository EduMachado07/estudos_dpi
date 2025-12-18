import { z } from "zod";

export const SchemaCreateStudies = z.object({
  thumbnail: z
    .any()
    .refine((file) => file instanceof File, "Selecione uma imagem válida."),
  title: z
    .string()
    .min(40, { message: "O título deve ter pelo menos 40 caracteres." })
    .max(100, { message: "O título deve ter no máximo 100 caracteres." })
    .trim(),
  description: z
    .string()
    .min(100, { message: "A descrição deve ter pelo menos 100 caracteres." })
    .max(300, { message: "A descrição deve ter no máximo 300 caracteres." })
    .trim(),
  body: z
    .string()
    .min(200, { message: "O corpo do estudo deve conter pelo menos 200 caracteres." }),
  tag: z.string().min(1, { message: "Selecione uma tag." }),
});

export type SchemaCreateStudiesType = z.infer<typeof SchemaCreateStudies>;
