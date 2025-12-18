import { AxiosInstance } from "../AxiosInstance";
import type { ILoginUserService } from "../IAuthService";

export class LoginUserService implements ILoginUserService {
  async exec(
    email: string,
    password: string
  ): Promise<{
    author: { name: string; role: string };
  }> {
    const { data } = await AxiosInstance.post("/login", { email, password });

    return {
      author: data.author,
    };
  }
}
