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
import {
  CloudUpload,
  CloudOff,
  AlertTriangle,
  ArrowLeft,
  Copy,
  SquarePlay,
  ImageUp,
} from "lucide-react";
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
    status,
    onSubmit,
    inputImageRef,
    previewImage,
    setPreviewImage,
    inputVideoRef,
    previewVideo,
    setPreviewVideo,
    copied,
    handleCopyLink,
  } = props;

  return (
    <main>
      {/* Estado: carregando */}
      {status === "pending" && (
        <div className="py-10 flex flex-col items-center gap-4">
          <div className="">
            <CloudUpload className="size-10 text-blue-600" />
          </div>
          <h1 className="font-title text-lg">Carregando estudo...</h1>
        </div>
      )}

      {/* Estado: erro */}
      {status === "error" && (
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
      {status === "success" && !data && (
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
        {status === "success" && data && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-6"
            >
              <h1 className="text-2xl font-title text-blue-600">
                Atualize o estudo
              </h1>
              {/* Thumbnail */}
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <section>
                        {/* Preview da imagem */}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => inputImageRef.current?.click()}
                          className="p-4 flex shadow-2xs max-sm:flex-col justify-left gap-4 items-start sm:items-center w-full border-[#b9b9b9] border-2 object-cover rounded-md"
                        >
                          <div className="w-full h-full sm:w-2/6 sm:h-full flex justify-center items-center">
                            {previewImage ? (
                              <img
                                src={previewImage}
                                alt="Preview"
                                className="shadow-lg w-full h-full object-cover rounded-md"
                              />
                            ) : (
                              <ImageUp className="size-18 sm:size-18 stroke-blue-600" />
                            )}
                          </div>
                          <div className="max-sm:w-full flex flex-col items-start gap-1">
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
                              // onClick={() => inputRef.current?.click()}
                              size="default"
                              variant={"default"}
                              className="mt-1 max-sm:self-end"
                            >
                              Escolher imagem
                            </Button>
                          </div>
                        </div>
                        <Input
                          type="file"
                          accept="image/png, image/jpeg, image/webp, image/avif, image/svg+xml"
                          ref={inputImageRef}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file); // salva no react-hook-form
                              setPreviewImage(URL.createObjectURL(file)); // gera preview
                            }
                          }}
                        />
                      </section>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* video */}
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vídeo</FormLabel>
                    <FormControl>
                      <div className="p-4 shadow-2xs flex max-sm:flex-col justify-left gap-6 sm:items-center items-start w-full border-[#b9b9b9] border-2 rounded-md">
                        {/* Preview */}
                        <div
                          className={`${
                            previewVideo
                              ? "h-65 sm:w-1/2 w-full"
                              : "h-40 sm:w-1/5 w-full"
                          } flex justify-center items-center`}
                        >
                          {previewVideo ? (
                            <video
                              src={previewVideo}
                              controls
                              className="shadow-lg w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <SquarePlay className="size-18 stroke-blue-600" />
                          )}
                        </div>

                        <div className="max-sm:w-full flex flex-col items-start gap-1">
                          <p className="font-body text-sm text-muted-foreground">
                            Tamanho máximo: <strong>30MB</strong>
                          </p>
                          <p className="font-body text-sm text-muted-foreground">
                            Formatos aceitos: <strong>MP4</strong>
                          </p>
                          <p className="font-body text-sm text-muted-foreground">
                            Recomendado: <strong>720p (1280×720)</strong>
                          </p>
                          <p className="font-body text-sm text-muted-foreground">
                            Duração ideal: <strong>3–5 minutos</strong>
                          </p>

                          <section className="w-full flex justify-end gap-2 mt-1">
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => inputVideoRef.current?.click()}
                            >
                              Escolher vídeo
                            </Button>

                            {previewVideo && (
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setPreviewVideo(null);

                                  field.onChange(null);

                                  if (inputVideoRef.current) {
                                    inputVideoRef.current.value = "";
                                  }
                                }}
                              >
                                Remover vídeo
                              </Button>
                            )}
                          </section>
                        </div>

                        {/* Input escondido */}
                        <Input
                          type="file"
                          accept="video/mp4"
                          ref={inputVideoRef}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                              setPreviewVideo(URL.createObjectURL(file));
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
                        maxLength={200}
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
                        onChange={(html) =>
                          form.setValue("body", html, { shouldDirty: true })
                        }
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
                        <SelectTrigger className="md:w-50 w-full">
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

              <section className="w-full flex max-md:flex-col gap-2 justify-between items-center">
                <Button
                  size={"default"}
                  variant="outline"
                  onClick={() => handleCopyLink(data.slug)}
                  className="max-sm:self-start max-sm:mb-2"
                >
                  <Copy /> {copied ? "Copiado!" : "Copiar link"}
                </Button>

                <div className="max-sm:w-full flex max-sm:items-end max-md:flex-col gap-2">
                  <DeleteStudyPage id={data?.id || ""} />

                  <Button
                    size={"lg"}
                    type="submit"
                    disabled={props.status === "pending"}
                    className="md:px-12 max-sm:w-full"
                  >
                    Atualizar estudo
                  </Button>
                </div>
              </section>
            </form>

            <Toaster />
          </Form>
        )}
      </section>
    </main>
  );
};
