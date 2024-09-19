"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";

export const FormDataSchema = z.object({
  status: z.string(),
});

export default function DialogStatus({ priority }: { priority: string }) {
  const { replace, refresh } = useRouter();

  const [open, setOpen] = useState(false);

  const [selectedValue, setSelectedValue] = useState("");
  const [shouldHandleChange, setShouldHandleChange] = useState(false);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleSubmit = () => {
    setShouldHandleChange(true);
    if (selectedValue !== "") {
      setOpen(false);
      replace(`?percentComplete=${selectedValue}&priority=${priority || ""}`);
      refresh();
    } else {
      replace(`?`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="flex mx-auto">
          <span>Status</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Status</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 text-center items-center gap-4">
            <div className="flex flex-col col-span-4">
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger
                  id="status"
                  className="border-[#788089]  text-base text-[#1E2428] font-normal border rounded-[5px] h-[40px] w-full focus:outline-none placeholder:text-[#1E2428]"
                >
                  <SelectValue placeholder={"Status do voo"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">
                    <span
                      className={
                        "bg-[#F8770026] rounded-md font-bold text-[#D36805] px-3"
                      }
                    >
                      Não iniciado
                    </span>
                  </SelectItem>
                  <SelectItem value="50">
                    <span
                      className={
                        "bg-[#3ED97226] rounded-md font-bold text-[#23B856] px-3"
                      }
                    >
                      Em progresso
                    </span>
                  </SelectItem>
                  <SelectItem value="100">
                    <span
                      className={
                        "bg-slate-300 rounded-md font-bold text-slate-500 px-3"
                      }
                    >
                      Concluído
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant={"outline"}
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            className="bg-[#3198CB] hover:bg-[#52a3cb]"
            type="button"
            onClick={handleSubmit}
          >
            Aplicar filtro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
