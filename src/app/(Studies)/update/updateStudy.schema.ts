import { z } from "zod";
import { SchemaCreateStudies } from "../create/createStudies.schema";

export const SchemaUpdateStudy = SchemaCreateStudies.extend({
  thumbnail: z
    .instanceof(File)
    .optional()
    .or(z.literal(undefined)),

  video: z
  .union([z.instanceof(File), z.null()])
  .optional()

});

export type SchemaUpdateStudyType = z.infer<typeof SchemaUpdateStudy>;
