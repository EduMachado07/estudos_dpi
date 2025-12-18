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
import { CloudUpload } from "lucide-react";
import { useRef, useState } from "react";
import { TipTapEditor } from "@/components/TipTap/TipTapEditor";
import type { useCreateStudiesModel } from "./createStudies.model";
import { Textarea } from "@/components/ui/textarea";

type CreateStudiesViewProps = ReturnType<typeof useCreateStudiesModel>;

export const CreateStudiesView = (props: CreateStudiesViewProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { onSubmit, form } = props;

  return (
    <>
      <main className="bg-[#efefef] px-[4vw] lg:px-[12vw] w-full min-h-screen flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-6"
          >
            {/* thumbnail */}
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <div>
                      {/* Preview da imagem */}
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
                            Recomendado: <strong>1920×1080 ou 1080×1920</strong>
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
                            field.onChange(file); // salva no react-hook-form
                            setPreview(URL.createObjectURL(file)); // gera preview
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
                    <Input maxLength={100} placeholder="Título do estudo" {...field} />
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
                    <Textarea className="max-h-20" maxLength={300} placeholder="Descrição breve do estudo" {...field} />
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
