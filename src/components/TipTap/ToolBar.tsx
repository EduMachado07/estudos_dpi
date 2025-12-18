import { useState } from "react";
import "./styles.scss";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Link2,
  Link2Off,
  Minus,
  Redo2,
  Strikethrough,
  TextQuote,
  Underline,
  Undo2,
} from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { HeadingDropdown } from "./HeadingDropdown";
import { ListDropdown } from "./ListDropdown";
import { AlignTextDropdown } from "./AlignTextDropdown";
import { FormatterStudyPage } from "@/app/(Studies)/formatter/page";
// import { ScrollArea } from "@/components/ui/scroll-area"

interface ToolButtonProps {
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  isActive?: string;
  title?: string;
}

const ToolBarButton: React.FC<ToolButtonProps> = ({
  isActive = false,
  disabled = false,
  onClick,
  children,
  title,
}) => (
  <Button
    variant={isActive ? "active" : "ghost"}
    size="sm"
    disabled={disabled}
    onClick={onClick}
    title={title}
    type="button"
    className="size-8 p-0"
  >
    {children}
  </Button>
);

export function ToolBar({ editor }: { editor: Editor }) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const AddLink = () => {
    if (!url.trim()) return;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url.trim(), target: "_blank" })
      .run();

    setUrl("");
    setIsDialogOpen(false);
  };

  return (
      <div className="flex flex-wrap md:gap-1.5">
        <HeadingDropdown editor={editor} />

        <ListDropdown editor={editor} />

        <AlignTextDropdown editor={editor} />

        <Separator orientation="vertical" className="max-md:hidden" />

        <ToolBarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold") ? "is-active" : ""}
          title={"Bold (Ctrl+B)"}
        >
          <Bold />
        </ToolBarButton>
        <ToolBarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic") ? "is-active" : ""}
          title={"Italic (Ctrl+I)"}
        >
          <Italic />
        </ToolBarButton>
        <ToolBarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline") ? "is-active" : ""}
          title={"Underline (Ctrl+U)"}
        >
          <Underline />
        </ToolBarButton>
        <ToolBarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike") ? "is-active" : ""}
          title={"Strike (Ctrl+Shift+S)"}
        >
          <Strikethrough />
        </ToolBarButton>

        <Separator className="max-md:hidden" orientation="vertical" />

        <ToolBarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote") ? "is-active" : ""}
          title={"Black Quote (Ctrl+Shift+B)"}
        >
          <TextQuote />
        </ToolBarButton>

        <ToolBarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          // isActive={editor.isActive("orderedList") ? "is-active" : ""}
          title={"Horizontal Line"}
        >
          <Minus />
        </ToolBarButton>

        <ToolBarButton
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
              return;
            }

            setIsDialogOpen(true);
          }}
          isActive={editor.isActive("link") ? "is-active" : ""}
          title={editor.isActive("link") ? "Remove link" : "Add link"}
        >
          {editor.isActive("link") ? <Link2Off /> : <Link2 />}
        </ToolBarButton>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {/* <DialogTrigger>Open</DialogTrigger> */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Link</DialogTitle>
              <DialogDescription>
                Insira a URL para criar um link
              </DialogDescription>
            </DialogHeader>

            <Input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoFocus
            />
            <Button variant={"outline"} onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={AddLink}>Add Link</Button>
          </DialogContent>
        </Dialog>

        <Separator className="max-md:hidden" orientation="vertical" />

        <ToolBarButton
          onClick={() => editor.chain().focus().undo().run()}
          isActive={editor.isActive("undo") ? "is-active" : ""}
          title={"Undo (Ctrl+Z)"}
        >
          <Undo2 />
        </ToolBarButton>
        <ToolBarButton
          onClick={() => editor.chain().focus().redo().run()}
          isActive={editor.isActive("redo") ? "is-active" : ""}
          title={"Redo (Ctrl+Y)"}
        >
          <Redo2 />
        </ToolBarButton>

        <Separator className="max-md:hidden" orientation="vertical" />

        <FormatterStudyPage editor={editor} />

      </div>
  );
}
