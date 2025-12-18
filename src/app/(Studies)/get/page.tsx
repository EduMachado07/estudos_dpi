import { GetStudyAllService } from "@/service/implementations/GetStudyAllService";
import { useGetStudiesModel } from "./getStudies.model";
import { GetStudiesView } from "./getStudies.view";

export const GetStudiesPage = () => {
  const getStudyAll = new GetStudyAllService()
  const methods = useGetStudiesModel({
    getAllStudiesService: getStudyAll
  });
  return <GetStudiesView {...methods} />;
};

