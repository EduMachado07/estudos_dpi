import { AxiosInstance } from "../AxiosInstance";
import type { ILogoutUserService } from "../IAuthService";

export class LogoutUserService implements ILogoutUserService {
  async exec(): Promise<void> {
    await AxiosInstance.post("/logout");
  }
}
