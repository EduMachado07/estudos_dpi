import type { IStudies } from "@/lib/IStudies";

export interface IStudiesResponse {
  data: IStudies[];
  next: { offset: number; limit: number } | null;
  author: { name: string; role: string };
}