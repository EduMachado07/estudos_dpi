import { useState } from "react";
import type { Editor } from "@tiptap/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { List, ListOrdered, ChevronDown } from "lucide-react";

interface ListOption {
  type: "bulletList" | "orderedList";
  label: string;
  icon: React.ElementType;
}

const listOptions: ListOption[] = [
  { type: "bulletList", label: "Lista não ordenada", icon: List },
  { type: "orderedList", label: "Lista ordenada", icon: ListOrdered },
];

export function ListDropdown({ editor }: { editor: Editor }) {
  const [selectedList, setSelectedList] = useState<ListOption>(listOptions[0]);
  const ActiveIcon = selectedList.icon;

  const isActive = editor.isActive(selectedList.type);

  // Aplica o tipo de lista selecionado de forma segura e tipada
  const applyList = (type: ListOption["type"]) => {
    const chain = editor.chain().focus();

    if (type === "bulletList") chain.toggleBulletList().run();
    else if (type === "orderedList") chain.toggleOrderedList().run();
  };

  const handleSelect = (option: ListOption) => {
    setSelectedList(option);
    applyList(option.type);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isActive ? "active" : "ghost"}
          size="sm"
          className="flex items-center p-0"
          title={selectedList.label}
          onClick={() => applyList(selectedList.type)}
        >
          <ActiveIcon className="size-4" />
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-44">
        {listOptions.map((option) => {
          const Icon = option.icon;
          const active = editor.isActive(option.type);
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
