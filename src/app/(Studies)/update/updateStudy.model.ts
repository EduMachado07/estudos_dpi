import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SchemaUpdateStudy,
  type SchemaUpdateStudyType,
} from "./updateStudy.schema";
import type {
  IGetStudyBySlugService,
  IUpdateStudyService,
} from "@/service/IStudyService";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";

type UpdateStudyModelProps = {
  getStudyBySlugService: IGetStudyBySlugService;
  updateStudyService: IUpdateStudyService;
};

export const useUpdateStudyModel = ({
  getStudyBySlugService,
  updateStudyService,
}: UpdateStudyModelProps) => {
  const { "*": slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);
  const originalStudyRef = useRef<SchemaUpdateStudyType | null>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<SchemaUpdateStudyType>({
    resolver: zodResolver(SchemaUpdateStudy),
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tag: "",
    },
  });

  const {
    data: study,
    status: getStatus,
    refetch,
  } = useQuery({
    queryKey: ["study-by-slug", slug],
    queryFn: () => {
      if (!slug) throw new Error("Slug não encontrado");
      return getStudyBySlugService.exec(slug);
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (study?.id) {
      queryClient.setQueryData(["study", study.id], study);
    }
  }, [study, queryClient]);

  useEffect(() => {
    if (!study) return;

    const initialValues = {
      title: study.title ?? "",
      description: study.description ?? "",
      body: study.body ?? "",
      tag: study.tag ?? "",
    };

    form.reset(initialValues);
    originalStudyRef.current = initialValues;

    if (study.thumbnailUrl) {
      setPreview(study.thumbnailUrl);
    }
  }, [study, form]);

  const { mutate } = useMutation<
    any,
    AxiosError<{ message: string }>,
    FormData
  >({
    mutationFn: async (formData) => {
      if (!study?.id) throw new Error("Estudo não carregado");
      return updateStudyService.exec(study.id, formData);
    },

    onMutate: () => {
      toast.loading("Atualizando estudo...", { id: "update-study" });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ?? "Erro ao atualizar estudo.",
        { id: "update-study" }
      );
    },

    onSuccess: (updatedStudy) => {
      queryClient.setQueryData(["study", updatedStudy.id], updatedStudy);
      // queryClient.invalidateQueries({ queryKey: ["study-by-slug"] });
      queryClient.invalidateQueries({ queryKey: ["studiesAuthor"] });

      toast.success("Estudo atualizado com sucesso!", {
        id: "update-study",
        duration: 1500,
        onAutoClose: () => {
          if (updatedStudy.slug && updatedStudy.slug !== slug) {
            navigate(`/studies/${updatedStudy.slug}`, { replace: true });
          } else {
            navigate("/profile");
          }
        },
      });
    },
  });

  const onSubmit = (formData: SchemaUpdateStudyType & { thumbnail?: File }) => {
    if (!originalStudyRef.current) return;

    const original = originalStudyRef.current;
    const payload = new FormData();
    let hasChanges = false;

    (["title", "description", "body", "tag"] as const).forEach((field) => {
      if (formData[field] !== original[field]) {
        payload.append(field, formData[field] ?? "");
        hasChanges = true;
      }
    });

    if (formData.thumbnail) {
      payload.append("thumbnail", formData.thumbnail);
      hasChanges = true;
    }

    if (!hasChanges) {
      toast.info("Nenhuma alteração foi feita.");
      return;
    }

    mutate(payload);
  };

  return {
    form,
    data: study,
    status,
    onSubmit,
    inputRef,
    preview,
    setPreview,
    getStatus,
    refetch,
  };
};
