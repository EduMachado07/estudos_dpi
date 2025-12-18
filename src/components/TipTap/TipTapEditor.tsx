import { ToolBar } from "./ToolBar";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { UndoRedo } from "@tiptap/extensions";
import { BulletList, OrderedList, ListItem } from "@tiptap/extension-list";
import TextAlign from "@tiptap/extension-text-align";
import { CharacterCount } from "@tiptap/extensions";
import "prosemirror-view/style/prosemirror.css";
import { Dot } from "lucide-react";
import { useEffect, useRef } from "react";

interface ITipTapEditorProps {
  content: string | undefined;
  onChange?: (value: string) => void;
  placeholder?: string;
  readonly?: boolean;
}

export const TipTapEditor = ({
  content,
  onChange,
  placeholder,
  readonly = false,
}: ITipTapEditorProps) => {
  const lastEmittedRef = useRef<string | null>(null);
  const isSettingFromOutsideRef = useRef(false);

  const editor = useEditor({
    editable: !readonly,
    extensions: [
      TextStyleKit,
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      Strike,
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      HorizontalRule,
      Link,
      UndoRedo,
      CharacterCount.configure({
        // limit,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content ?? (placeholder ? `<p>${placeholder}</p>` : ""),
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none p-4 min-h-96",
      },
    },
    onUpdate: ({ editor }) => {
      if (readonly) return;
      const html = editor.getHTML();

      // evita re-emissão do mesmo valor e loops
      if (lastEmittedRef.current !== html && !isSettingFromOutsideRef.current) {
        lastEmittedRef.current = html;
        onChange?.(html);
      }
    },
    shouldRerenderOnTransaction: false,
    immediatelyRender: true,
  });

  const { charactersCount, wordsCount } = useEditorState({
    editor,
    selector: (context) => ({
      charactersCount: context.editor.storage.characterCount.characters(),
      wordsCount: context.editor.storage.characterCount.words(),
    }),
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();

    if (typeof content === "string" && content !== current) {
      isSettingFromOutsideRef.current = true;
      try {
        editor.commands.setContent(content, { emitUpdate: false });
        lastEmittedRef.current = content;
      } finally {
        requestAnimationFrame(() => {
          isSettingFromOutsideRef.current = false;
        });
      }
    }
  }, [content, editor]);

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!readonly);
  }, [readonly, editor]);

  return (
    <section>
      {/* editor */}
      <div
        className={`${
          !readonly && "border border-[#b9b9b9]"
        } max-w-full rounded-md`}
      >
        {!readonly && (
          <div className="border-b border-[#b9b9b9] p-2 flex justify-between">
            <ToolBar editor={editor} />
          </div>
        )}
        <div className="text-justify text-pretty">
          <EditorContent editor={editor} />
        </div>
        {/* counter */}
        {!readonly && (
          <div className="border-t border-[#b9b9b9] py-1 md:py-2 pr-2 md:pr-4 w-full flex gap-1 justify-end font-semibold text-sm md:text-base">
            {charactersCount} caracteres <Dot /> {wordsCount} palavras
          </div>
        )}
      </div>
    </section>
  );
};
