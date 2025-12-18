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

export const useCreateStudiesModel = ({
  createStudyService,
}: CreateStudyModelProps) => {
  const form = useForm<SchemaCreateStudiesType>({
    resolver: zodResolver(SchemaCreateStudies),
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tag: "",
    },
  });
  const navigate = useNavigate();

  const { mutate } = useMutation<
    void,
    AxiosError<{ message: string; details: string }>,
    FormData
  >({
    mutationFn: async (formData) => {
      await createStudyService.exec(formData);
    },

    onMutate: () => {
      toast.loading("Criando estudo...", { id: "create-study" });
    },

    onError: (error) => {
      if (error.response) {
        toast.error("Erro ao criar estudo: " + error.response.data.message, {
          id: "create-study",
        });
      } else {
        toast.error("Erro ao criar estudo. Tente novamente.", {
          id: "create-study",
        });
      }
    },

    onSuccess: () => {
      toast.success("Estudo criado com sucesso!", {
        id: "create-study",
        duration: 1500,
        onAutoClose: () => navigate("/profile"),
      });
    },
  });

  const onSubmit = (data: SchemaCreateStudiesType & { thumbnail: File }) => {
    const study = new FormData();
    study.append("thumbnail", data.thumbnail);
    study.append("title", data.title);
    study.append("description", data.description);
    study.append("body", data.body);
    study.append("tag", data.tag);

    mutate(study);
  };

  return {
    onSubmit,
    form,
  };
};
