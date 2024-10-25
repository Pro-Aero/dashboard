"use client";

import * as React from "react";
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
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { toast } from "sonner";
import { TemplateResponse } from "@/services/templates";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserResponse } from "@/services/users";

interface Props {
  templateData: TemplateResponse;
  users: UserResponse[];
}

const plans = ["Plano A", "Plano B", "Plano C"];

export function ModalExecuteTemplate({ templateData, users }: Props) {
  const { control, register } = useForm({
    defaultValues: {
      plan: "",
      tasks: templateData.tasks.map((task) => ({
        ...task,
        responsibleId: "",
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "tasks",
  });

  const [open, setOpen] = React.useState(false);

  const onSubmit = async (data: any) => {
    // Implement submission logic when API is ready
    console.log(data);
    toast.success("Template executado com sucesso!");
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
        <form onSubmit={onSubmit} className="space-y-6">
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
                    {plans.map((plan) => (
                      <SelectItem key={plan} value={plan}>
                        {plan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Tarefas do template</h3>
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
                {fields.map((item, index) => (
                  <TableRow key={item.id}>
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
                        ? "Alta"
                        : "Média"}
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
