import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SchemaCreateStudies,
  type SchemaCreateStudiesType,
} from "./createStudies.schema";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ICreateStudyService } from "@/service/IStudyService";
import { toast } from "sonner";
import { useNavigate } from "react-router";

type CreateStudyModelProps = {
  createStudyService: ICreateStudyService;
};

const MAX_VIDEO_SIZE_MB = 30;
const MAX_THUMBNAIL_SIZE_MB = 5;

export const useCreateStudiesModel = ({
  createStudyService,
}: CreateStudyModelProps) => {
  const navigate = useNavigate();

  const form = useForm<SchemaCreateStudiesType>({
    resolver: zodResolver(SchemaCreateStudies),
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tag: "",
    },
  });

  const { mutate } = useMutation<
    void,
    AxiosError<{ message: string }>,
    FormData
  >({
    mutationFn: async (formData) => {
      await createStudyService.exec(formData);
    },

    onMutate: () => {
      toast.loading("Criando estudo...", { id: "create-study" });
    },

    onSuccess: () => {
      toast.success("Estudo criado com sucesso!", {
        id: "create-study",
        duration: 1500,
        onAutoClose: () => navigate("/profile"),
      });
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ??
        "Erro ao criar estudo. Tente novamente.";

      toast.error(message, { id: "create-study" });
    },
  });

  const onSubmit = (
    data: SchemaCreateStudiesType & {
      video?: File;
      thumbnail?: File;
    }
  ) => {
    // VALIDAÇÃO DE TAMANHO DOS ARQUIVOS
    // VIDEO
    if (data.video) {
      const maxVideoSize = MAX_VIDEO_SIZE_MB * 1024 * 1024;
      
      if (data.video.size > maxVideoSize) {
        toast.error(`O vídeo deve ter no máximo ${MAX_VIDEO_SIZE_MB}MB`);
        return;
      }
    }
    // THUMBNAIL
    if (data.thumbnail) {
      const maxThumbSize = MAX_THUMBNAIL_SIZE_MB * 1024 * 1024;

      if (data.thumbnail.size > maxThumbSize) {
        toast.error(
          `A thumbnail deve ter no máximo ${MAX_THUMBNAIL_SIZE_MB}MB`
        );
        return;
      }
    }

    const formData = new FormData();

    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }

    if (data.video) {
      formData.append("video", data.video);
    }

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("body", data.body);
    formData.append("tag", data.tag);

    mutate(formData);
  };

  return {
    form,
    onSubmit,
  };
};
