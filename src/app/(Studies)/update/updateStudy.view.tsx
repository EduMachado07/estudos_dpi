import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { useUpdateStudyModel } from "./updateStudy.model";
import { CloudUpload, CloudOff, AlertTriangle, ArrowLeft } from "lucide-react";
import { TipTapEditor } from "@/components/TipTap/TipTapEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "sonner";
import { DeleteStudyPage } from "../delete/page";

type UpdateStudyViewProps = ReturnType<typeof useUpdateStudyModel>;

export const UpdateStudyView = (props: UpdateStudyViewProps) => {
  const {
    form,
    data,
    refetch,
    getStatus,
    onSubmit,
    inputRef,
    preview,
    setPreview,
  } = props;

  return (
    <main>
      {/* Estado: carregando */}
      {getStatus === "pending" && (
        <div className="py-10 flex flex-col items-center gap-4">
          <div className="">
            <CloudUpload className="size-10 text-blue-600" />
          </div>
          <h1 className="font-title text-lg">Carregando estudo...</h1>
        </div>
      )}

      {/* Estado: erro */}
      {getStatus === "error" && (
        <div className="py-10 flex flex-col items-center gap-4 text-center">
          <CloudOff className="size-14 text-red-500" />
          <h1 className="text-2xl font-bold text-red-600">
            Ocorreu um erro ao carregar o estudo.
          </h1>
          <p className="text-muted-foreground  max-w-md">
            Não conseguimos conectar ao servidor ou o estudo está
            temporariamente indisponível.
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="flex items-center gap-2"
          >
            {/* <RefreshCcw className="size-4" /> */}
            Tentar novamente
          </Button>
        </div>
      )}

      {/* Estado: estudo não encontrado */}
      {getStatus === "success" && !data && (
        <div className="py-10 flex flex-col items-center gap-4 text-center">
          <AlertTriangle className="size-14 text-gray-500" />
          <h1 className="text-2xl font-bold text-gray-700">
            Estudo não encontrado
          </h1>
          <p className="text-muted-foreground">
            O estudo solicitado pode ter sido removido ou o link está incorreto.
          </p>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="size-4" />
            Voltar
          </Button>
        </div>
      )}

      <section className="bg-[#efefef] lg:px-[12vw] w-full flex-1 flex justify-center items-center">
        {/* Estado: sucesso (formulário) */}
        {getStatus === "success" && data && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-6"
            >
              {/* Thumbnail */}
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <div>
                        {preview ? (
                          <div className="flex flex-col gap-2 md:gap-4 p-2 md:p-6 items-end shadow-sm relative border border-[#b9b9b9] rounded-md overflow-hidden">
                            <img
                              src={preview}
                              alt="Preview"
                              className="shadow-lg md:h-110 h-50 w-full object-cover rounded-md"
                            />
                            <Button
                              type="button"
                              onClick={() => inputRef.current?.click()}
                              size="sm"
                              variant={"ghost"}
                            >
                              Alterar imagem
                            </Button>
                          </div>
                        ) : (
                          <div className="shadow-2xs flex flex-col justify-center gap-1.5 items-center h-120 w-full border-[#b9b9b9] border-2 border-dashed object-cover rounded-md">
                            <CloudUpload className="size-18 stroke-blue-600" />
                            <h1 className="font-title capitalize text-lg">
                              imagem do estudo
                            </h1>
                            <p className="font-body text-sm text-muted-foreground">
                              Tamanho máximo: <strong>5MB</strong>
                            </p>
                            <p className="font-body text-sm text-muted-foreground">
                              Formatos aceitos:{" "}
                              <strong>JPEG, PNG, WEBP, AVIF, SVG</strong>
                            </p>
                            <p className="font-body text-sm text-muted-foreground">
                              Recomendado:{" "}
                              <strong>1920×1080 ou 1080×1920</strong>
                            </p>
                            <Button
                              type="button"
                              onClick={() => inputRef.current?.click()}
                              size="default"
                              variant={"default"}
                              className="mt-2"
                            >
                              Selecionar imagem
                            </Button>
                          </div>
                        )}

                        <Input
                          type="file"
                          accept="image/png, image/jpeg, image/webp, image/avif, image/svg+xml"
                          ref={inputRef}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                              setPreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Título */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={100}
                        placeholder="Título do estudo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Descrição */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        className="max-h-20"
                        maxLength={300}
                        placeholder="Descrição breve do estudo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Corpo */}
              <FormField
                control={form.control}
                name="body"
                render={() => (
                  <FormItem>
                    <FormLabel>Corpo</FormLabel>
                    <FormControl>
                      <TipTapEditor
                        key={data?.id}
                        content={form.watch("body") || ""}
                        onChange={(html) => form.setValue("body", html, { shouldDirty: true })}
                        placeholder="Escreva o conteúdo do estudo aqui..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tag */}
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag</FormLabel>
                    <FormControl>
                      <Select
                        key={field.value}
                        value={field.value ?? ""} // garante string
                        onValueChange={(v) => field.onChange(v)}
                      >
                        <SelectTrigger className="md:w-[200px] w-full">
                          <SelectValue placeholder="Identificador" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Salvação">Salvação</SelectItem>
                          <SelectItem value="Espírito Santo">
                            Espírito Santo
                          </SelectItem>
                          <SelectItem value="Cura">Cura</SelectItem>
                          <SelectItem value="Apocalipse">Apocalipse</SelectItem>
                          <SelectItem value="Família">Família</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <section className="w-full flex max-md:flex-col gap-2 justify-end">
                <DeleteStudyPage id={data?.id || ""} />

                <Button
                  size={"lg"}
                  type="submit"
                  disabled={status === "loading"}
                  className="md:px-12 max-md:w-full"
                >
                  Atualizar estudo
                </Button>
              </section>
            </form>

            <Toaster />
          </Form>
        )}
      </section>
    </main>
  );
};
