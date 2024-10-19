"use client";

import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

import { sync } from "./actions";

import { useState } from "react";

export function ButtonSync() {
  const [statusForm, setStatusForm] = useState(false);
  const handleSync = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatusForm(true);

    try {
      const res = await sync();

      if (res) {
        toast.success("Sincronização realizada com sucesso!");
        setStatusForm(false);
        return;
      } else {
        toast.error(
          "Não foi possível realizar a sincronização. Tente novamente ou informe o suporte."
        );
        setStatusForm(false);
        return;
      }
    } catch (error) {
      toast.error("Ocorreu um erro durante a sincronização.");
    }
  };
  return (
    <form onSubmit={handleSync}>
      <Button variant={"ghost"} className="border-0 hover:border-0">
        {statusForm ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <>
            <RefreshCw className="mr-2 size-4" />
            Sincronizar
          </>
        )}
      </Button>
    </form>
  );
}
