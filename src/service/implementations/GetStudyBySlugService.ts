
import type { IGetStudyBySlugService } from "../IStudyService";
import { AxiosInstance } from "../AxiosInstance";
import type { IStudies } from "@/lib/IStudies";

export class GetStudyBySlugService implements IGetStudyBySlugService {
  async exec(slug: string): Promise<IStudies> {
    const { data } = await AxiosInstance.get(`study/${slug}`);

    return data.study;
  }
}
