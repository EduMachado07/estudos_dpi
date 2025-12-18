import type { SchemaCreateStudies } from "./createStudies.schema";
import * as z from "zod";

export type SchemaCreateStudiesType = z.infer<typeof SchemaCreateStudies>