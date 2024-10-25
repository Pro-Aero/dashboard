"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { DeleteIcon, Trash2 } from "lucide-react";
import { ActionDeleteTemplate } from "./actions";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  templateId: string;
}

export function DialogDeleteTemplate({ templateId }: Props) {
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="gap-2 text-[#FF3C3C] hover:text-[#FA0101]"
        >
          <Trash2 className="mr-2 size-4" strokeWidth={3} />
          <span>Excluir</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            <form
              id="delete_template"
              action={async (FormData) => {
                try {
                  const res = await ActionDeleteTemplate(FormData);
                  if (res) {
                    toast.success("Template deletado com sucesso!");
                    return router.refresh();
                  }
                  toast.error("Não foi possível deletar esse template.");
                  return;
                } catch (error) {
                  toast.error("Algo inesperado deu errado.");
                }
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 text-center items-center gap-4">
                  <Input
                    id="templateId"
                    name="templateId"
                    type="text"
                    className="col-span-3 hidden"
                    value={templateId}
                  />
                </div>
              </div>
            </form>
            Essa ação não pode ser revertida. O template será apagado
            permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction form="delete_template" type="submit">
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
