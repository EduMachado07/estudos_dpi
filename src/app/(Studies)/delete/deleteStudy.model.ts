import { useMutation } from "@tanstack/react-query";
import { DeleteStudyService } from "@/service/implementations/DeleteStudyService";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";

type DeleteStudyModelProps = {
  deleteStudyService: DeleteStudyService;
  id: string;
};

export const useDeleteStudyModel = ({
  deleteStudyService,
  id,
}: DeleteStudyModelProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, status } = useMutation({
    mutationFn: async () => {
      await deleteStudyService.exec(id);
    },
    onMutate: () => {
      toast.loading("Excluindo estudo...", { id: "delete-study" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studiesAuthor"] }),
      toast.success("Estudo excluído com sucesso!", {
        id: "delete-study",
        duration: 1500,
        onAutoClose: () => navigate("/profile"),
      });
    },
    onError: () => {
      toast.error("Erro ao excluir o estudo. Tente novamente.", {
        id: "delete-study",
      });
    },
  });

  const isDeleting = status === "pending";

  return { deleteStudy: mutate, isDeleting };
};
