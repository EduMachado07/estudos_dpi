import { Button } from "@/components/ui/button";
import type { useGetStudiesModel } from "./getStudies.model";
import { StudyCard } from "@/components/StudyCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type GetStudiesViewProps = ReturnType<typeof useGetStudiesModel>;

export const GetStudiesView = (props: GetStudiesViewProps) => {
  const {
    filteredStudies,
    tagFilters,
    selectedTag,
    setSelectedTag,
    status,
    setSearchTerm,
    searchTerm,
    refetch,
  } = props;

  return (
    <>
      <section className="flex flex-col gap-6 md:gap-8 my-0">
        <main className="flex gap-2 md:gap-4 max-lg:flex-col">
          {/* Filtros */}
          <section className="flex flex-col gap-3">
            <div className="relative">
              <label
                htmlFor="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <Search className="text-zinc-400" size={20} />
              </label>
              <Input
                id="search"
                type="text"
                placeholder="Buscar estudo"
                className="w-full pl-9"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
            <ScrollArea className="">
              <section className="w-fit flex lg:flex-col gap-1 whitespace-nowrap mb-3 max-md:text-sm">
                {tagFilters.map((filter, index) => {
                  const isActive = selectedTag === filter.tag;
                  return (
                    <section
                      key={index}
                      onClick={() => setSelectedTag(filter.tag)}
                      className={`lg:w-50 gap-2 flex justify-between items-center font-body-medium p-2 rounded-sm transition-all duration-200 cursor-pointer 
                    ${filter.color} 
                    ${
                      isActive
                        ? filter.borderColor + " " + filter.textColor
                        : "border border-transparent"
                    }
                  `}
                    >
                      {filter.tag}
                      {isActive && <span>{filteredStudies.length}</span>}
                    </section>
                  );
                })}
              </section>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Cards */}
          <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {status === "pending" &&
              Array.from({ length: 9 }).map((_, index) => (
                <StudyCard.Skeleton key={index} />
              ))}

            {status === "error" && (
              <div className="col-span-full flex flex-col gap-2 items-center justify-center">
                <p className="col-span-full text-center text-xl font-body-medium ">
                  Erro ao carregar os estudos.
                </p>
                <Button variant={"outline"} onClick={() => refetch()}>Tentar Novamente</Button>
              </div>
            )}

            {status === "success" && (
              <>
                {filteredStudies.map((study) => (
                  <StudyCard.Root key={study.id} slug={`/study/${study.slug}`}>
                    <StudyCard.Image image={study.thumbnailUrl} />
                    <StudyCard.Details
                      id={study.id!}
                      title={study.title}
                      tag={study.tag}
                      description={study.description}
                      author={study.author?.name}
                      createdAt={study.createdAt}
                    />
                  </StudyCard.Root>
                ))}
              </>
            )}

            {status === "success" && filteredStudies.length === 0 && (
              <p className="col-span-full text-center text-xl font-body-medium text-gray-600">
                Nenhum estudo encontrado.
              </p>
            )}

            {props.isFetchingNextPage &&
              Array.from({ length: 3 }).map((_, index) => (
                <StudyCard.Skeleton key={index} />
              ))}
          </section>
        </main>

        {props.hasNextPage && (
          <Button
            size={"lg"}
            variant={"outline"}
            className="w-fit self-center px-12"
            onClick={() => props.fetchNextPage()}
            disabled={!props.hasNextPage || props.isFetchingNextPage}
          >
            {props.isFetchingNextPage
              ? "Carregando..."
              : props.hasNextPage
              ? "Carregar mais"
              : "Não há mais estudos"}
          </Button>
        )}
      </section>
    </>
  );
};
