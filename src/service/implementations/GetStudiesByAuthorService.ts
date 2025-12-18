import type { IStudies } from "@/lib/IStudies";
import type { IGetStudiesByAuthorService } from "../IStudyService";
import { AxiosInstanceWithRefreshToken } from "../AxiosInstance";

export class getAllStudiesByAuthorService
  implements IGetStudiesByAuthorService
{
  async exec(
    offset?: number,
    limit?: number
  ): Promise<{
    studies: IStudies[];
    next: number | null;
    previous: number | null;
    length: number;
    author: { name: string; role: string };
  }> {
    const {data} = await AxiosInstanceWithRefreshToken.get(`/study/author`, {
      params: { offset, limit },
    });

    return {
      studies: data.studies.data,
      next: data.studies.next,
      previous: data.studies.previous,
      length: data.studies.length,
      author: data.studies.author,
    };
  }
}
