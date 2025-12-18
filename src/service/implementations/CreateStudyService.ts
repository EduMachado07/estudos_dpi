import { AxiosInstanceWithRefreshToken } from "../AxiosInstance";
import type { ICreateStudyService } from "../IStudyService";

export class CreateStudyService implements ICreateStudyService {
  async exec(formData: FormData): Promise<void> {
    await AxiosInstanceWithRefreshToken.post("/study", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
