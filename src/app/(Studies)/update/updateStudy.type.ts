import type { SchemaUpdateStudy } from "./updateStudy.schema";
import * as z from "zod";

export type SchemaUpdateStudyType = z.infer<typeof SchemaUpdateStudy>;