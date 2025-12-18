import { create } from "zustand";
import { persist } from "zustand/middleware";

type IAuthor = {
  name: string;
  role: string;
};

type StudiesStore = {
  author: IAuthor | null;
  setAuthor: (author: IAuthor | null) => void;
};

export const useStudiesStore = create<StudiesStore>()(
  persist(
    (set) => ({
      author: null,
      setAuthor: (author) => set({ author }),
    }),
    {
      name: "author-storage", // nome da chave no localStorage
    }
  )
);
