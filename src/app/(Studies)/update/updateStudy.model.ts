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

const MAX_VIDEO_SIZE_MB = 30;
const MAX_THUMBNAIL_SIZE_MB = 5;

export const useUpdateStudyModel = ({
  getStudyBySlugService,
  updateStudyService,
}: UpdateStudyModelProps) => {
  const { "*": slug } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const originalStudyRef = useRef<SchemaUpdateStudyType | null>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const inputVideoRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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
      setPreviewImage(study.thumbnailUrl);
    }
    if (study.videoUrl) {
      setPreviewVideo(study.videoUrl);
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
      console.log(error);
      toast.error(
        error.response?.data?.message ?? "Erro ao atualizar estudo.",
        { id: "update-study" }
      );
    },

    onSuccess: (updatedStudy) => {
      queryClient.setQueryData(["study", updatedStudy.id], updatedStudy);
      queryClient.invalidateQueries({ queryKey: ["studiesAuthor"] });
      queryClient.invalidateQueries({ queryKey: ["study-by-slug"] });

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

  const onSubmit = (
    data: SchemaUpdateStudyType & {
      thumbnail?: File;
      video?: File | null;
    }
  ) => {
    if (!originalStudyRef.current) return;

    const original = originalStudyRef.current;
    const payload = new FormData();
    let hasChanges = false;

    (["title", "description", "body", "tag"] as const).forEach((field) => {
      if (data[field] !== original[field]) {
        payload.append(field, data[field] ?? "");
        hasChanges = true;
      }
    });

    // VALIDAÇÕES DE ARQUIVOS
    // Thumbnail
    if (data.thumbnail) {
      const maxThumbSize = MAX_THUMBNAIL_SIZE_MB * 1024 * 1024;

      if (data.thumbnail.size > maxThumbSize) {
        toast.error(
          `A thumbnail deve ter no máximo ${MAX_THUMBNAIL_SIZE_MB}MB`
        );
        return;
      }

      payload.append("thumbnail", data.thumbnail);
      hasChanges = true;
    }

    // Vídeo
    if (data.video instanceof File) {
      const maxVideoSize = MAX_VIDEO_SIZE_MB * 1024 * 1024;

      if (data.video.size > maxVideoSize) {
        toast.error(`O vídeo deve ter no máximo ${MAX_VIDEO_SIZE_MB}MB`);
        return;
      }

      payload.append("video", data.video);
      hasChanges = true;
    }

    // remoção explícita de vídeo
    if (data.video === null && study?.videoUrl) {
      payload.append("removeVideo", "true");
      hasChanges = true;
    }

    if (!hasChanges) {
      toast.info("Nenhuma alteração foi feita.");
      return;
    }

    mutate(payload);
  };

  // FUNÇÃO PARA COPIAR LINK DO ESTUDO
  const handleCopyLink = async (slug: string) => {
    try {
      const publicUrl = `${window.location.origin}/study/${slug}`;
      await navigator.clipboard.writeText(publicUrl);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar link:", err);
    }
  };

  return {
    form,
    data: study,
    status: getStatus,
    onSubmit,
    inputImageRef,
    previewImage,
    setPreviewImage,
    inputVideoRef,
    previewVideo,
    setPreviewVideo,
    refetch,
    copied,
    handleCopyLink,
  };
};
