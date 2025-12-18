import { useDeleteStudyModel } from "./deleteStudy.model";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

type DeleteStudyViewProps = ReturnType<typeof useDeleteStudyModel>;

export const DeleteStudyView = (props: DeleteStudyViewProps) => {
  const { deleteStudy, isDeleting } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"lg"}>
          Excluir Estudo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Estudo</DialogTitle>
          <p>
            Tem certeza que deseja excluir este estudo?
            <br /> Esta ação não pode ser desfeita.
          </p>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => deleteStudy()}
            disabled={isDeleting}
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
