import { useStudiesStore } from "@/context/UserContext";
import type { ILogoutUserService } from "@/service/IAuthService";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type LogoutModelType = {
  logoutUserService: ILogoutUserService;
};

export const useLogoutModel = ({ logoutUserService }: LogoutModelType) => {
  const navigate = useNavigate();
  const { setAuthor } = useStudiesStore();

  const systemLogout = async () => {
    try {
      await logoutUserService.exec();

      setAuthor(null);

      toast.success("Logout realizado com sucesso!", {
        description: "Você foi desconectado do sistema.",
      });

      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao sair", {
        description: "Não foi possível encerrar a sessão.",
      });
    }
  };

  return { systemLogout };
};
