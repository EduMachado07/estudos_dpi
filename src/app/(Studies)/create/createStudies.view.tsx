import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { ImageUp, SquarePlay } from "lucide-react";
import { useRef, useState } from "react";
import { TipTapEditor } from "@/components/TipTap/TipTapEditor";
import type { useCreateStudiesModel } from "./createStudies.model";
import { Textarea } from "@/components/ui/textarea";

type CreateStudiesViewProps = ReturnType<typeof useCreateStudiesModel>;

export const CreateStudiesView = (props: CreateStudiesViewProps) => {
  const inputImageRef = useRef<HTMLInputElement>(null);
  const inputVideoRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const { onSubmit, form } = props;

  return (
    <>
      <main className="bg-[#efefef] px-[0vw] lg:px-[12vw] w-full min-h-screen flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-6"
          >
            <h1 className="text-2xl font-title text-blue-600">
              Crie o seu estudo
            </h1>
            {/* thumbnail */}
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
                        className="p-4 shadow-2xs flex max-sm:flex-col justify-left gap-4 items-start sm:items-center w-full border-[#b9b9b9] border-2 object-cover rounded-md"
                      >
                        <div className={`w-full h-45 sm:w-2/6 sm:h-full flex justify-center items-center`}>
                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="shadow-lg w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <ImageUp className="size-12 sm:size-18 stroke-blue-600" />
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
                            Recomendado: <strong>1920×1080 ou 1080×1920</strong>
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
                  <FormLabel>Video</FormLabel>
                  <FormControl>
                    <div>
                      {/* Preview da imagem */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => inputVideoRef.current?.click()}
                        className="p-4 shadow-2xs flex max-sm:flex-col justify-left gap-6 sm:items-center items-start w-full border-[#b9b9b9] border-2 object-cover rounded-md"
                      >
                        <div
                          className={`${
                            previewVideo ? "h-65 sm:w-1/2 w-full" : "h-40 sm:w-2/6 w-full"
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
                            Duração ideal: <strong>3-5 minutos máximo</strong>
                          </p>
                          <section className="w-full flex sm:justify-start justify-end gap-2 mt-1">
                            <Button
                              type="button"
                              size="default"
                              variant={"default"}
                            >
                              Escolher video
                            </Button>
                            {previewVideo && (
                              <Button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPreviewVideo(null);
                                  field.onChange(undefined); // limpa o form também
                                }}
                                size="default"
                                variant={"outline"}
                              >
                                Remover video
                              </Button>
                            )}
                          </section>
                        </div>
                      </div>
                      <Input
                        type="file"
                        accept="video/mp4"
                        ref={inputVideoRef}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file); // salva no react-hook-form
                            setPreviewVideo(URL.createObjectURL(file)); // gera preview
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* titulo */}
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
            {/* description */}
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

            {/* body */}
            {/* componente TipTap */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Corpo</FormLabel>
                  <FormControl>
                    <TipTapEditor
                      content={field.value}
                      onChange={field.onChange}
                      placeholder="Escreva o conteúdo do estudo aqui..."
                    />
                    {/* <Input placeholder="Descrição breve do estudo" {...field} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* tag */}
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="md:w-[200px] w-2/2">
                        <SelectValue placeholder="Identificador" />
                      </SelectTrigger>
                    </FormControl>
                    <FormDescription>
                      <SelectContent>
                        <SelectItem value="Salvação">Salvação</SelectItem>
                        <SelectItem value="Espírito Santo">
                          Espírito Santo
                        </SelectItem>
                        <SelectItem value="Cura">Cura</SelectItem>
                        <SelectItem value="Apocalipse">Apocalipse</SelectItem>
                        <SelectItem value="Família">Família</SelectItem>
                      </SelectContent>
                    </FormDescription>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size={"lg"}
              type="submit"
              className="self-end md:px-12 max-md:w-1/2"
            >
              Criar estudo
            </Button>
          </form>

          <Toaster />
        </Form>
      </main>
    </>
  );
};
