import { CreateStudyService } from "@/service/implementations/CreateStudyService";
import { useCreateStudiesModel } from "./createStudies.model";
import { CreateStudiesView } from "./createStudies.view";

export const CreateStudyPage = () => {
  const createStudyService = new CreateStudyService()
  const methods = useCreateStudiesModel({
    createStudyService: createStudyService
  })
  return <CreateStudiesView {...methods}/>;
};
