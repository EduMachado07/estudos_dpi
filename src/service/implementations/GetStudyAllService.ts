import type { IStudies } from "@/lib/IStudies";
import { AxiosInstance } from "../AxiosInstance";
import type { IGetStudyAllService } from "../IStudyService";

export class GetStudyAllService implements IGetStudyAllService {
  async exec(
    offset?: number,
    limit?: number
  ): Promise<{
    studies: IStudies[];
    next: number | null;
    previous: number | null;
    length: number;
  }> {
    const { data } = await AxiosInstance.get("/study", {
      params: { offset, limit },
    });

    return {
      studies: data.studies.data,
      next: data.studies.next,
      previous: data.studies.previous,
      length: data.studies.length,
    };
  }
}

// export class MockGetStudyAllService implements IGetStudyAllService {
//   async exec(): Promise<{ studies: IStudies[]; total: number }> {
//     return {
//       studies: [
//         {
//           id: "1",
//           title: "Estudo 1",
//           description: "Descrição do estudo 1",
//           thumbnailUrl: "https://via.placeholder.com/150",
//           tag: "Tag1",
//           body: "Conteúdo do estudo 1",
//           authorName: "Autor 1",
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//           slug: "estudo-1",
//         },
//       ],
//       total: 1,
//     };
//   }
// }
