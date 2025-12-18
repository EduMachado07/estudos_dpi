import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Heading1, Heading2, Heading3, ChevronDown } from "lucide-react";
import type { Editor } from "@tiptap/react";

interface HeadingOption {
  level: 1 | 2 | 3;
  label: string;
  icon: React.ElementType;
}

const headingOptions: HeadingOption[] = [
  { level: 1, label: "Heading 1", icon: Heading1 },
  { level: 2, label: "Heading 2", icon: Heading2 },
  { level: 3, label: "Heading 3", icon: Heading3 },
];

export function HeadingDropdown({ editor }: { editor: Editor }) {
  const [selectedHeading, setSelectedHeading] = useState<HeadingOption>(
    headingOptions[0]
  );

  const handleSelect = (option: HeadingOption) => {
    setSelectedHeading(option);
    editor.chain().focus().toggleHeading({ level: option.level }).run();
  };

  const ActiveIcon = selectedHeading.icon;
  const isActive = editor.isActive("heading", {
    level: selectedHeading.level,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isActive ? "active" : "ghost"}
          size="sm"
          className="flex items-center p-0"
          title={`Heading ${selectedHeading.level}`}
        >
          <ActiveIcon className="size-4"/>
          <ChevronDown className="size-3" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-36">
        {headingOptions.map((option) => {
          const Icon = option.icon;
          const active = editor.isActive("heading", { level: option.level });
          return (
            <DropdownMenuItem
              key={option.level}
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
