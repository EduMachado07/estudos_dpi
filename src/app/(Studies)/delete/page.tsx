import { DeleteStudyView } from "./deleteStudy.view";
import { useDeleteStudyModel } from "./deleteStudy.model";
import { DeleteStudyService } from "@/service/implementations/DeleteStudyService";

type DeleteStudyPageProps = {
  id: string;
};

export const DeleteStudyPage = ({id}: DeleteStudyPageProps) => {
  const deleteStudyService = new DeleteStudyService();
  const methods = useDeleteStudyModel({
    deleteStudyService,
    id
  });

  return <DeleteStudyView {...methods} />;
};