import { z } from "zod";

export const SchemaGetStudiesByAuthor = z.object({
  offset: z.number().optional(),
  limit: z.number().optional(),
});

export type SchemaGetStudiesByAuthorType = z.infer<typeof SchemaGetStudiesByAuthor>;