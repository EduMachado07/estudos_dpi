export interface IStudies {
  id?: string;
  // authorId?: string;
  readingTime: number;
  title: string;
  description: string;
  // thumbnailId: string;
  thumbnailUrl: string;
  body: string;
  author: {
    name: string
  };
  slug: string;
  tag: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITagFilters {
  tag: string;
  color?: string; // classe usada para hover
  borderColor: string; // classe usada quando ativo
  textColor: string; // classe usada quando ativo
}