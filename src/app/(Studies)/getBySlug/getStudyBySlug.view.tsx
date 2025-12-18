// import thumb from "@/assets/no-image-available-.png";
import { TipTapEditor } from "@/components/TipTap/TipTapEditor";
import type { useGetStudyBySlugModel } from "./getStudyBySlug.model";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

type GetStudyBySlugViewProps = ReturnType<typeof useGetStudyBySlugModel>;

export const GetStudyBySlugView = (props: GetStudyBySlugViewProps) => {
  const { study, handleCopyLink, copied, formatDate } = props;

  return (
    <>
      <main className="flex flex-col items-center md:gap-10 gap-4 xl:px-[8vw]">
        {/* <Link to="/" className="self-start -mb-2">
          <Button variant={"link"} size={"sm"}>
            <ChevronLeft /> Voltar
          </Button>
        </Link> */}
        <section className="w-full flex max-lg:flex-col gap-4 md:gap-8 items-start">
          {/* thumbnail */}
          <div className="lg:w-2/6 w-full lg:h-64 h-80 overflow-hidden rounded-sm shadow-md">
            <img
              src={study?.thumbnailUrl}
              alt="Imagem do estudo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <h1 className="font-title text-3xl md:text-4xl text-pretty">
              {study?.title}
            </h1>

            <p className="text-gray-600 font-body text-lg md:text-xl leading-normal text-justify text-pretty">
              {study?.description}
            </p>

            <p className="font-body-medium text-zinc-800">
              {formatDate(study?.updatedAt)} • Tempo de leitura:{" "}
              {study?.readingTime} min
            </p>
          </div>
        </section>
        <h1 className="border-l-4 border-blue-500 text-zinc-700 pl-3 py-1 w-full text-left font-body text-lg md:text-xl">
          Escrito por{" "}
          <span className="font-body-medium text-blue-700">
            {study?.author.name}
          </span>
        </h1>
        <section className="lg:w-[95%] w-full">
          {study?.body && (
            <TipTapEditor
              key={study.body}
              content={study.body}
              readonly={true}
            />
          )}
        </section>
        <Separator />

        <section className="w-full flex justify-between items-center">
          <p
            className={`p-1 md:px-4 px-2 max-md:text-sm rounded-sm font-body-medium text-left capitalize border border-zinc-800 text-zinc-800
          `}
          >
            {study?.tag}
          </p>

          <Button variant="outline" onClick={handleCopyLink}>
            <Copy /> {copied ? "Copiado!" : "Copiar link"}
          </Button>
        </section>
      </main>
    </>
  );
};
