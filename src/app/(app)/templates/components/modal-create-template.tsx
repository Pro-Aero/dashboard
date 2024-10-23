"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FormDataTemplateSchema } from "./schema";
import { z } from "zod";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export type Inputs = z.infer<typeof FormDataTemplateSchema>;

export function ModalCreateTemplate() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataTemplateSchema),
    defaultValues: {
      nameTemplate: "",
    },
  });

  const [tasks, setTasks] = useState([
    { hours: "", responsible: "", expanded: true },
  ]);
  const [templateName, setTemplateName] = useState("");

  const addTask = () => {
    setTasks([...tasks, { hours: "", responsible: "", expanded: true }]);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTask = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, expanded: !task.expanded } : task
      )
    );
  };

  const updateTask = (
    index: number,
    field: "hours" | "responsible",
    value: string
  ) => {
    setTasks(
      tasks.map((task, i) => (i === index ? { ...task, [field]: value } : task))
    );
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className="border-0 text-white hover:text-white hover:border-0 bg-[#044AB8] hover:bg-[#0449b8bd] px-10 rounded-2xl text"
          >
            <Plus className="mr-2 size-4" strokeWidth={4} />
            Criar Template
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Criação de template</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label
                htmlFor="templateName"
                className="text-sm font-medium text-gray-700"
              >
                Nome do template
              </label>
              <Input
                id="templateName"
                placeholder="Ex: MEL"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Tarefas do template</h3>
                <Button onClick={addTask} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
              <ScrollArea className="h-[300px] w-full rounded-md p-4">
                <div className="space-y-4">
                  {tasks.map((task, index) => (
                    <div key={index} className="border rounded-md">
                      <div
                        className="flex justify-between items-center p-2 cursor-pointer"
                        onClick={() => toggleTask(index)}
                      >
                        <span className="font-medium">Exemplo de tarefa</span>
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTask(index);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                          {task.expanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      {task.expanded && (
                        <div className="p-2 space-y-2">
                          <div>
                            <label
                              htmlFor={`hours-${index}`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Horas
                            </label>
                            <Input
                              id={`hours-${index}`}
                              placeholder="Ex: 40"
                              value={task.hours}
                              onChange={(e) =>
                                updateTask(index, "hours", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label
                              htmlFor={`responsible-${index}`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Responsável
                            </label>
                            <Select
                              value={task.responsible}
                              onValueChange={(value) =>
                                updateTask(index, "responsible", value)
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Ex: Marcelo Araujo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="marcelo">
                                  Marcelo Araujo
                                </SelectItem>
                                <SelectItem value="joao">João Silva</SelectItem>
                                <SelectItem value="maria">
                                  Maria Santos
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
          <Button
            className="w-full text-lg text-white hover:text-white hover:border-0 rounded-lg bg-[#044AB8] hover:bg-[#0449b8bd]"
            variant="outline"
          >
            Cadastrar Templates
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
