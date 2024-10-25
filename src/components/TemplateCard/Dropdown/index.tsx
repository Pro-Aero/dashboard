"use client";

import * as React from "react";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogDeleteTemplate } from "./delete-template";
import { ModalEditTemplate } from "./edit-template";
import { TemplateResponse } from "@/services/templates";

export function Dropdown({
  templateId,
  templateData,
}: {
  templateId: string;
  templateData: TemplateResponse;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30 flex flex-col">
        <DropdownMenuItem asChild>
          <ModalEditTemplate templateData={templateData} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DialogDeleteTemplate templateId={templateId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
