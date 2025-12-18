import { GetStudyBySlugService } from "@/service/implementations/GetStudyBySlugService";
import { useGetStudyBySlugModel } from "./getStudyBySlug.model";
import { GetStudyBySlugView } from "./getStudyBySlug.view";

export const GetStudyBySlugPage = () => {
  const getStudyBySlugService = new GetStudyBySlugService();
  const methods = useGetStudyBySlugModel({
    getStudyBySlugService: getStudyBySlugService,
  });
  return <GetStudyBySlugView {...methods} />;
};
