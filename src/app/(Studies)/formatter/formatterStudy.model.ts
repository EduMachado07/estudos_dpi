import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { IFormatterStudyService } from "@/service/IStudyService";
import {
  SchemaFormatterStudy,
  type SchemaFormatterStudyType,
} from "./formatterStudy.schema";

type FormatterStudyModelProps = {
  formatterStudyService: IFormatterStudyService;
  onFormatted: (html: string) => void;
};

export const useFormatterStudyModel = ({
  formatterStudyService,
  onFormatted,
}: FormatterStudyModelProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<SchemaFormatterStudyType>({
    resolver: zodResolver(SchemaFormatterStudy),
    defaultValues: {
      body: "",
    },
  });

  const { mutate, isPending } = useMutation<
    { formattedContent: string },
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: (body) => formatterStudyService.exec(body),

    onMutate: () => {
      setErrorMessage(null);
    },

    onError: (error) => {
      setErrorMessage(
        error.response?.data.message ?? "Erro ao formatar conteúdo"
      );
    },

    onSuccess: ({ formattedContent }) => {
      onFormatted(formattedContent);
      setOpen(false);
    },
  });

  const onSubmit = (data: SchemaFormatterStudyType) => {
    mutate(data.body);
  };

  return {
    form,
    onSubmit,
    isPending,
    errorMessage,
    open,
    setOpen,
  };
};
