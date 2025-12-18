import { z } from "zod";

export const SchemaFormatterStudy = z.object({
  body: z
    .string()
    .min(200, { message: "O corpo do estudo deve conter pelo menos 200 caracteres." }),
});

export type SchemaFormatterStudyType = z.infer<typeof SchemaFormatterStudy>;
