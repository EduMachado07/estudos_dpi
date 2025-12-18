import { LogoutUserService } from "@/service/implementations/LogoutUserService";
import { LogoutView } from "./logout.view";
import { useLogoutModel } from "./logout.model";

export const LogoutPage = () => {
  const logoutUserService = new LogoutUserService();
  const methods = useLogoutModel({
    logoutUserService,
  });
  return <LogoutView {...methods} />;
};
