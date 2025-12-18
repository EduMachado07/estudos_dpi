import { Button } from "./ui/button";
import { Link, NavLink } from "react-router";
import { useStudiesStore } from "@/context/UserContext";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { BookA, ChevronRightIcon, LogOut, PanelTopClose, Pencil } from "lucide-react";

export const Navbar = () => {
  const { author } = useStudiesStore();

  return (
    <header className="flex items-center justify-between pt-4">
      <section className="flex gap-10 items-center">
        <NavLink to="/" className="font-title md:text-2xl text-xl">
          Estudos DPI
        </NavLink>
      </section>
      <section className="flex gap-7 items-center">
        {author ? (
          // Se o usuário estiver autenticado
          <Sheet>
            <SheetTrigger className="flex items-center gap-2 cursor-pointer md:text-zinc-800 hover:text-zinc-950 transition-opacity">
              {/* <User size={20} className=""/> */}
              <PanelTopClose size={22} className="-rotate-90" />
              <p className="max-md:hidden font-medium">{author.name}</p>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Conta de {author.name}</SheetTitle>
                <SheetDescription>
                  Nome do autor: {author.name}
                  <br />
                  Papel: {author.role}
                </SheetDescription>
                <section className="flex flex-col gap-2 mt-2">
                  {/* Criar estudo */}
                  <Item variant="outline" size="sm" asChild>
                    <Link to="/create">
                      <ItemMedia>
                        <BookA className="size-5" />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>Criar um Estudo</ItemTitle>
                      </ItemContent>
                      <ItemActions>
                        <ChevronRightIcon className="size-4" />
                      </ItemActions>
                    </Link>
                  </Item>
                  {/* Meus Estudos */}
                  <Item variant="outline" size="sm" asChild>
                    <Link to="/profile">
                      <ItemMedia>
                        <Pencil className="size-5" />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>Editar Meus Estudos</ItemTitle>
                      </ItemContent>
                      <ItemActions>
                        <ChevronRightIcon className="size-4" />
                      </ItemActions>
                    </Link>
                  </Item>
                  {/* Logout */}
                  <Item className="" variant="destructive" size="sm" asChild>
                    <Link to="/profile">
                      <ItemMedia>
                        <LogOut className="size-5" />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>Sair da Conta</ItemTitle>
                      </ItemContent>
                      <ItemActions>
                        <ChevronRightIcon className="size-4" />
                      </ItemActions>
                    </Link>
                  </Item>
                </section>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ) : (
          // Se o usuário não estiver autenticado
          // redireciona para a página de login
          <NavLink to="/login">
            <Button variant={"outline"}>Criar Estudo</Button>
          </NavLink>
        )}
      </section>
    </header>
  );
};
