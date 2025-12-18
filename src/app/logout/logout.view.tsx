import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { useLogoutModel } from "./logout.model";
import { ChevronRightIcon, LogOut } from "lucide-react";

type LogoutViewProps = ReturnType<typeof useLogoutModel>;

export const LogoutView = (props: LogoutViewProps) => {
  const { systemLogout } = props;
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {/* <Button size={"sm"} variant="destructive">Sair da Conta <LogOut /></Button> */}
          <Item className="" variant="destructive" size="sm">
            <ItemMedia>
              <LogOut className="size-5" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Sair da Conta</ItemTitle>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon className="size-4" />
            </ItemActions>
          </Item>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Encerrar sessão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja sair do sistema? <br /> Você precisará
              fazer login novamente.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button variant="destructive" onClick={systemLogout}>Sair</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
