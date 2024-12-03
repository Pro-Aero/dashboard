"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TasksResponse } from "@/services/tasks";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  tasks: TasksResponse;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export function TableTasks({
  tasks,
  currentPage,
  totalPages,
  itemsPerPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="p-0">
            <TableHead className="font-semibold text-base text-black dark:text-white w-[40%]">
              Nome
            </TableHead>
            <TableHead className="font-semibold text-base text-black dark:text-white w-[10%]">
              Horas
            </TableHead>
            <TableHead className="font-semibold text-base text-black dark:text-white w-[15%]">
              Responsável
            </TableHead>
            <TableHead className="font-semibold text-base text-black dark:text-white w-[10%]">
              Plano
            </TableHead>
            <TableHead className="font-semibold text-base text-black dark:text-white w-[10%]">
              Prioridade
            </TableHead>
            <TableHead className="font-semibold text-base text-black dark:text-white w-[15%] text-center">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks &&
            tasks.data.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-base text-black dark:text-white">
                    <div>
                      {item.title
                        ? item.title
                            .replace(/$$[^)]*$$/g, "")
                            .split("{")[0]
                            .trim()
                        : "No Title"}
                    </div>
                  </TableCell>
                  <TableCell className="font-base text-black dark:text-white">
                    {item.hours ? item.hours : "-"}
                  </TableCell>
                  <TableCell className="font-base text-black dark:text-white">
                    {Array.isArray(item.assignments) &&
                    item.assignments.length > 0
                      ? item.assignments.map((resp) => resp.name).join(", ")
                      : "-"}
                  </TableCell>
                  <TableCell className="font-base text-black dark:text-white">
                    {item.planner?.title || "-"}
                  </TableCell>
                  <TableCell className="font-base text-black dark:text-white">
                    {item.priority === 1
                      ? "Urgente"
                      : item.priority === 3
                      ? "Importante"
                      : item.priority === 5
                      ? "Alta"
                      : "Baixa"}
                  </TableCell>
                  <TableCell className="font-base text-black text-center dark:text-white">
                    <Badge
                      className={`${
                        item.status === "Overdue"
                          ? "bg-red-800 hover:bg-red-800"
                          : item.status === "NextOverdue"
                          ? "bg-orange-600 hover:bg-orange-600"
                          : item.status === null || item.status === ""
                          ? "bg-zinc-800 hover:bg-zinc-800"
                          : item.status === "InProgress"
                          ? "bg-blue-800 hover:bg-blue-800"
                          : "bg-green-800 hover:bg-green-800"
                      } text-white text-xs font-semibold`}
                    >
                      {item.status === "Overdue"
                        ? "Atrasado"
                        : item.status === "NextOverdue"
                        ? "Próximo do vencimento"
                        : item.status === null || item.status === ""
                        ? "Não iniciado"
                        : item.status === "InProgress"
                        ? "Em progresso"
                        : "Concluído"}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <div>
          Página {currentPage} de {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
