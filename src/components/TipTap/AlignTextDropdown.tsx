import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ChevronDown,
} from "lucide-react";
import type { Editor } from "@tiptap/react";

interface AlignOption {
  type: "left" | "center" | "right" | "justify";
  label: string;
  icon: React.ElementType;
}

const alignOptions: AlignOption[] = [
  { type: "left", label: "Alinhar à esquerda", icon: AlignLeft },
  { type: "center", label: "Centralizar", icon: AlignCenter },
  { type: "right", label: "Alinhar à direita", icon: AlignRight },
  { type: "justify", label: "Justificar", icon: AlignJustify },
];

export function AlignTextDropdown({ editor }: { editor: Editor }) {
  const [selectedAlign, setSelectedAlign] = useState<AlignOption>(
    alignOptions[0]
  );

  const handleSelect = (option: AlignOption) => {
    setSelectedAlign(option);
    editor.chain().focus().setTextAlign(option.type).run();
  };

  const ActiveIcon = selectedAlign.icon;
  const isActive = editor.isActive({ textAlign: selectedAlign.type });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isActive ? "active" : "ghost"}
          size="sm"
          className="flex items-center gap-1"
          title={selectedAlign.label}
        >
          <ActiveIcon className="size-4" />
          <ChevronDown className="size-3" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-46">
        {alignOptions.map((option) => {
          const Icon = option.icon;
          const active = editor.isActive({ textAlign: option.type });
          return (
            <DropdownMenuItem
              key={option.type}
              onClick={() => handleSelect(option)}
              className={`flex items-center gap-2 ${
                active ? "bg-muted/50" : ""
              }`}
            >
              <Icon className="size-4" />
              <span>{option.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
