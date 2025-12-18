import type { IStudies } from "@/lib/IStudies";

export interface ICreateStudyService {
  exec: (formData: FormData) => Promise<void>;
}

export interface IGetStudyAllService {
  exec: (
    offset?: number,
    limit?: number
  ) => Promise<{
    studies: IStudies[];
    next: number | null;
    previous: number | null;
    length: number;
  }>;
}

export interface IGetStudiesByAuthorService {
  exec: (
    offset?: number,
    limit?: number
  ) => Promise<{
    studies: IStudies[];
    next: number | null;
    previous: number | null;
    length: number;
    author: { name: string; role: string };
  }>;
}

export interface IGetStudyBySlugService {
  exec: (id: string) => Promise<IStudies>;
}
export interface IDeleteStudyService {
  exec: (id: string) => Promise<void>;
}
export interface IUpdateStudyService {
  exec: (id: string, data: FormData) => Promise<void>;
}
export interface IDeleteStudyService {
  exec: (id: string) => Promise<void>;
}
export interface IFormatterStudyService {
  exec: (content: string) => Promise<{ formattedContent: string }>;
}