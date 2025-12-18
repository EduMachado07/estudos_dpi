import { AxiosInstanceWithRefreshToken } from "../AxiosInstance";
import type { IDeleteStudyService } from "../IStudyService";

export class DeleteStudyService implements IDeleteStudyService {
  async exec(id: string): Promise<void> {
    await AxiosInstanceWithRefreshToken.delete(`/study/${id}`);
  }
}