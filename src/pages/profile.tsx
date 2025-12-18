import { useGetStudiesByAuthorModel } from "@/app/(Studies)/getByAuthor/getByAuthor.model";
import { GetStudiesByAuthor } from "@/app/(Studies)/getByAuthor/getByAuthor.view";
import { Button } from "@/components/ui/button";
import { useStudiesStore } from "@/context/UserContext";
import { getAllStudiesByAuthorService } from "@/service/implementations/GetStudiesByAuthorService";
import { Plus } from "lucide-react";
import { Link } from "react-router";

export const ProfilePage = () => {
  const getStudiesByAuthor = new getAllStudiesByAuthorService();

  const methods = useGetStudiesByAuthorModel({
    getAllStudiesByAuthorService: getStudiesByAuthor,
  });

  const { author } = useStudiesStore();

  return (
    <>
      <main className="flex flex-col max-lg:flex-col gap-4">
        {/* <section className="h-fit flex flex-col gap-4 rounded-sm lg:px-6">
          <div className="space-y-2">
            <p className="text-nowrap font-body text-base">
              <span className="font-body-medium">Autor:</span> {author?.name}
            </p>
            <p className="font-body text-base">
              <span className="font-body-medium">Papel:</span> {author?.role}
            </p>
            <p className="font-body text-base">
              <span className="font-body-medium">Estudos:</span>{" "}
              {methods.allStudies.length}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <LogoutPage />
          </div>
        </section> */}

        <section className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <h1 className="font-title md:text-xl text-lg">Meus Estudos</h1>
            <Link to={author ? "/create" : "/login"} className="ml-auto">
              <Button size={"default"} className="w-fit">
                Novo Estudo <Plus />
              </Button>
            </Link>
          </div>

          <GetStudiesByAuthor {...methods} />
        </section>
      </main>
    </>
  );
};
