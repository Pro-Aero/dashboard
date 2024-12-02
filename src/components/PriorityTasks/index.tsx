"use client";

import { TasksResponse } from "@/services/tasks";
import { Badge } from "@/components/ui/badge";
import { differenceInDays, parseISO } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  tasks: TasksResponse[];
}

export function TableTasks({ tasks }: Props) {
  return (
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
          tasks.map((item, index) => {
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
  );
}
