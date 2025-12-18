import { UpdateStudyView } from "./updateStudy.view";
import { useUpdateStudyModel } from "./updateStudy.model";
import { GetStudyBySlugService } from "@/service/implementations/GetStudyBySlugService";
import { UpdateStudyService } from "@/service/implementations/UpdateStudyService";

export const UpdateStudyPage = () => {
  const getStudyBySlugService = new GetStudyBySlugService();
  const updateStudyService = new UpdateStudyService();
  const methods = useUpdateStudyModel({
    getStudyBySlugService,
    updateStudyService,
  });
  return <UpdateStudyView {...methods} />;
};