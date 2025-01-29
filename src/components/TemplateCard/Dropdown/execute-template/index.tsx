"use client";

import * as React from "react";
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
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import type { TemplateResponse } from "@/services/templates";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserResponse } from "@/services/users";
import type { PlannerResponse } from "@/services/planners";
import { ActionExecuteTemplate } from "./actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { TemplateSchemaData } from "./schema";

interface Props {
  templateData: TemplateResponse;
  users: UserResponse[];
  planners: PlannerResponse[];
}

export function ModalExecuteTemplate({ templateData, users, planners }: Props) {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      plan: "",
      templateId: templateData.id,
      tasks: templateData.tasks.map((task) => ({
        ...task,
        responsibleId: "",
      })),
    },
    resolver: zodResolver(TemplateSchemaData),
  });

  const { errors } = formState;

  const [open, setOpen] = React.useState(false);

  const onSubmit = async (data: any) => {
    const assignments = data.tasks.reduce(
      (acc: Record<string, string>, task: any) => {
        if (task.responsibleId) {
          acc[task.id] = task.responsibleId;
        }
        return acc;
      },
      {}
    );

    const requestData = {
      assignments,
      templateId: data.templateId,
      plan: data.plan,
    };

    const res = await ActionExecuteTemplate(requestData);

    if (res) {
      toast.success("Template executado com sucesso!");
    } else {
      toast.error(
        "O template não foi executado com sucesso! Por favor, tente novamente mais tarde."
      );
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="text-2xl font-semibold text-black cursor-pointer">
          {templateData.title}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Template - {templateData.title}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <label
              htmlFor="plan"
              className="mr-40 text-sm font-medium text-gray-700"
            >
              Plano
            </label>
            <Controller
              name="plan"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Selecionar plano" />
                  </SelectTrigger>
                  <SelectContent>
                    {planners.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.plan && (
              <p className="text-red-500 text-sm">{errors.plan.message}</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Tarefas do template</h3>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-sm text-gray-600">
                      Descrição
                    </TableHead>
                    <TableHead className="font-semibold text-sm text-gray-600">
                      Horas
                    </TableHead>
                    <TableHead className="font-semibold text-sm text-gray-600">
                      Prioridade
                    </TableHead>
                    <TableHead className="font-semibold text-sm text-gray-600">
                      Responsável
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templateData.tasks.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-sm text-gray-700">
                        {item.title}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700">
                        {item.hours}
                      </TableCell>
                      <TableCell className="text-sm text-gray-700">
                        {item.priority === 1
                          ? "Urgente"
                          : item.priority === 3
                          ? "Importante"
                          : item.priority === 5
                          ? "Media"
                          : "Baixa"}
                      </TableCell>
                      <TableCell>
                        <Controller
                          name={`tasks.${index}.responsibleId`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecionar responsável" />
                              </SelectTrigger>
                              <SelectContent>
                                {users.map((user) => (
                                  <SelectItem key={user.id} value={user.id}>
                                    {user.displayName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.tasks?.[index]?.responsibleId && (
                          <p className="text-red-500 text-sm">
                            {errors.tasks[index].responsibleId.message}
                          </p>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          <div className="flex">
            <Button
              type="submit"
              className="w-[400px] mx-auto text-lg text-white hover:text-white hover:border-0 rounded-lg bg-[#044AB8] hover:bg-[#0449b8bd]"
            >
              Executar template
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
