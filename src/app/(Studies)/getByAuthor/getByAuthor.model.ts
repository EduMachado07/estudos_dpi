import { useInfiniteQuery } from "@tanstack/react-query";
import type { IStudiesResponse } from "./getByAuthor.type";
import type { IStudies } from "@/lib/IStudies";
import type { IGetStudiesByAuthorService } from "@/service/IStudyService";

type GetStudiesByAuthorModelProps = {
  getAllStudiesByAuthorService: IGetStudiesByAuthorService;
};

export const useGetStudiesByAuthorModel = ({
  getAllStudiesByAuthorService,
}: GetStudiesByAuthorModelProps) => {
  const fetchStudiesByAuthor = async ({
    pageParam,
  }: {
    pageParam: { offset?: number; limit?: number };
  }): Promise<IStudiesResponse> => {
    const limit = pageParam.limit ?? 9;

    try {
      const res = await getAllStudiesByAuthorService.exec(
        pageParam.offset,
        pageParam.limit
      );

      return {
        data: res.studies,
        author: res.author,
        next: res.next !== null ? { offset: res.next, limit } : null,
      };
    } catch (error) {
      console.error("Erro ao buscar estudos por autor:", error);
      throw error;
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["studiesAuthor"],
      queryFn: ({ pageParam }) => fetchStudiesByAuthor({ pageParam }),
      initialPageParam: { offset: 0, limit: 9 },
      getNextPageParam: (lastPage) => lastPage.next || undefined,
      retry: 1,
      staleTime: 1000 * 60 * 1, // 1 minuto de cache
    });

  const allStudies: IStudies[] = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    allStudies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
