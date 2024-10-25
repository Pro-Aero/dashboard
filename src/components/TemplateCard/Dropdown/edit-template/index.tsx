"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActionEditTemplate } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TemplateResponse } from "@/services/templates";
import { FormDataTemplateSchemaEdit } from "./schema";

type Inputs = z.infer<typeof FormDataTemplateSchemaEdit>;

interface Props {
  templateData: TemplateResponse;
}

export function ModalEditTemplate({ templateData }: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataTemplateSchemaEdit),
    defaultValues: {
      nameTemplate: templateData.title,
      tasks: templateData.tasks,
    },
  });

  const { refresh, replace } = useRouter();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const [expandedTasks, setExpandedTasks] = React.useState<boolean[]>([true]);
  const [open, setOpen] = React.useState(false);

  const onSubmit = async (data: Inputs) => {
    const res = await ActionEditTemplate(data);

    if (res) {
      toast.success("Template editado com sucesso!");
      refresh();
    } else {
      toast.error("Não foi possível editar esse template.");
    }
    setOpen(false);
    reset();
    refresh();
  };

  const toggleTaskExpansion = (index: number) => {
    setExpandedTasks((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="gap-2">
          <Pencil className="mr-2 size-4" strokeWidth={3} />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edição de template</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <Input
              id="templateId"
              value={templateData.id}
              className="hidden"
              {...register("templateId")}
            />
            <label
              htmlFor="nameTemplate"
              className="text-sm font-medium text-gray-700"
            >
              Nome do template
            </label>
            <Input
              id="nameTemplate"
              placeholder="Ex: MEL"
              {...register("nameTemplate")}
            />
            {errors.nameTemplate && (
              <p className="text-sm text-red-500">
                {errors.nameTemplate.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Tarefas do template</h3>
              <Button
                type="button"
                onClick={() => {
                  append({ title: "", hours: 0, priority: 5 });
                  setExpandedTasks((prev) => [...prev, true]);
                }}
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
            <ScrollArea className="h-[300px] w-full rounded-md p-4">
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="border rounded-md">
                    <div
                      className="flex justify-between items-center p-2 cursor-pointer"
                      onClick={() => toggleTaskExpansion(index)}
                    >
                      <span className="font-medium">Tarefa {index + 1}</span>
                      <div className="flex items-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            remove(index);
                            setExpandedTasks((prev) => {
                              const newExpanded = [...prev];
                              newExpanded.splice(index, 1);
                              return newExpanded;
                            });
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                        {expandedTasks[index] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                    {expandedTasks[index] && (
                      <div className="p-2 space-y-2">
                        <div>
                          <label
                            htmlFor={`tasks.${index}.title`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Título
                          </label>
                          <Input
                            id={`tasks.${index}.title`}
                            placeholder="Ex: Implementar feature X"
                            {...register(`tasks.${index}.title` as const)}
                          />
                          {errors.tasks?.[index]?.title && (
                            <p className="text-sm text-red-500">
                              {errors.tasks[index]?.title?.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor={`tasks.${index}.hours`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Horas
                          </label>
                          <Controller
                            name={`tasks.${index}.hours` as const}
                            control={control}
                            render={({ field }) => (
                              <Input
                                id={`tasks.${index}.hours`}
                                placeholder="Digite as horas estimadas"
                                type="number"
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? parseInt(e.target.value, 10)
                                      : 0
                                  )
                                }
                                value={field.value ?? ""}
                              />
                            )}
                          />
                          {errors.tasks?.[index]?.hours && (
                            <p className="text-sm text-red-500">
                              {errors.tasks[index]?.hours?.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor={`tasks.${index}.priority`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Prioridade
                          </label>
                          <Controller
                            name={`tasks.${index}.priority` as const}
                            control={control}
                            render={({ field }) => (
                              <Select
                                onValueChange={(value) =>
                                  field.onChange(
                                    value ? parseInt(value, 10) : undefined
                                  )
                                }
                                value={field.value?.toString()}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Selecione a prioridade" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="9">Baixa</SelectItem>
                                  <SelectItem value="5">Média</SelectItem>
                                  <SelectItem value="1">Urgente</SelectItem>
                                  <SelectItem value="3">Importante</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.tasks?.[index]?.priority && (
                            <p className="text-sm text-red-500">
                              {errors.tasks[index]?.priority?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <Button
            type="submit"
            className="w-full text-lg text-white hover:text-white hover:border-0 rounded-lg bg-[#044AB8] hover:bg-[#0449b8bd]"
          >
            Editar Templates
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
