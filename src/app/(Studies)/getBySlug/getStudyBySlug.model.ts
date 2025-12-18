import type { IGetStudyBySlugService } from "@/service/IStudyService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useState } from "react";

type GetStudyModelProps = {
  getStudyBySlugService: IGetStudyBySlugService;
};

export const useGetStudyBySlugModel = ({
  getStudyBySlugService,
}: GetStudyModelProps) => {
  const params = useParams();
  const slug = params["*"];

  const { data, status, error, refetch } = useQuery({
    queryKey: ["study", slug],
    queryFn: async () => {
      if (!slug) {
        throw new Error("Slug não encontrado na URL");
      }
      return await getStudyBySlugService.exec(slug);
    },
    enabled: !!slug,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });


  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar link:", err);
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const today = new Date();

    const day = date.getDate();
    const month = date.toLocaleString("pt-BR", { month: "long" });
    const year = date.getFullYear();

    const currentYear = today.getFullYear();

    // se for do ano atual, não mostra o ano
    return `${day} de ${month}${year !== currentYear ? ` de ${year}` : ""}`;
  };

  return {
    study: data,
    status,
    error,
    refetch,
    copied,
    handleCopyLink,
    formatDate
  };
};
