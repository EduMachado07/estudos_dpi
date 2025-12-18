import type { Editor } from "@tiptap/react";
import { useFormatterStudyModel } from "./formatterStudy.model";
import { FormatterStudyView } from "./formatterStudy.view";
import { FormatterStudyService } from "@/service/implementations/FormatterStudyService";

export function FormatterStudyPage({ editor }: { editor: Editor }) {
  const formatterStudyService = new FormatterStudyService();
  const model = useFormatterStudyModel({
    formatterStudyService,
    onFormatted: (html) => {
      editor.commands.setContent(html, {
        emitUpdate: true,
      });
    },
  });

  return <FormatterStudyView {...model} />;
}
