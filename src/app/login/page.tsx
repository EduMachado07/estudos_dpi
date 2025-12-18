import { LoginUserService } from "@/service/implementations/LoginUserService";
import { useLoginModel } from "./login.model";
import { LoginView } from "./login.view";

export const LoginPage = () => {
  const loginUserService = new LoginUserService();
  const methods = useLoginModel({
    loginUserService,
  });
  return <LoginView {...methods} />;
};
