"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";

import { useState } from "react";

export function AddButton() {
  const [statusForm, setStatusForm] = useState(false);
  // const handleSync = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   setStatusForm(true);

  //   try {
  //     const res = await sync();

  //     if (res) {
  //       toast.success("Sincronização realizada com sucesso!");
  //       setStatusForm(false);
  //       return;
  //     } else {
  //       toast.error(
  //         "Não foi possível realizar a sincronização. Tente novamente ou informe o suporte."
  //       );
  //       setStatusForm(false);
  //       return;
  //     }
  //   } catch (error) {
  //     toast.error("Ocorreu um erro durante a sincronização.");
  //   }
  // };
  return (
    <form>
      <Button variant={"default"} className="border-0 hover:border-0 bg-[#044AB8] px-10 rounded-2xl text">
        <Plus className="mr-2 size-4" strokeWidth={4}/>
        Criar Template
      </Button>
    </form>
  );
}