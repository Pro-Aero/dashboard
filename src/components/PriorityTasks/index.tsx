"use client";

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

interface Props {
  tasks: TasksResponse[];
}

export function TableTasks({ tasks }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="p-0">
          <TableHead className="font-semibold text-base text-black dark:text-white">
            Nome
          </TableHead>

          <TableHead className="font-semibold text-base text-black dark:text-white">
            Horas
          </TableHead>

          <TableHead className="font-semibold text-base text-black dark:text-white">
            Responsável
          </TableHead>

          <TableHead className="font-semibold text-base text-black dark:text-white">
            Plano
          </TableHead>

          <TableHead className="font-semibold text-base text-black dark:text-white">
            Prioridade
          </TableHead>

          <TableHead className="font-semibold text-base text-black dark:text-white text-center">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      {tasks &&
        tasks.slice(0, 5).map((item, index) => (
          <TableBody key={index}>
            <TableRow>
              <TableCell className="font-base text-black dark:text-white w-[100px]">
                <div className="">
                  {
                    item.title
                      .replace(/\([^)]*\)/g, "") // Remove tudo que está entre parênteses
                      .split("{")[0] // Divide a string pelo "-"
                      .trim() // Remove espaços em branco extras
                  }
                </div>
              </TableCell>

              <TableCell className="font-base text-black text-center dark:text-white">
                {item.hours ? item.hours : "-"}
              </TableCell>

              <TableCell className="font-base text-black dark:text-white ">
                {Array.isArray(item.assignments) && item.assignments.length > 0
                  ? item.assignments.map((resp) => resp.name).join(", ")
                  : "-"}
              </TableCell>

              <TableCell className="font-base text-black dark:text-white">
                {item.planner.title}
              </TableCell>

              <TableCell className="font-base text-black dark:text-white">
                {
                  <TableCell className="font-base text-black text-center dark:text-white">
                    {item.priority === 1
                      ? "Urgente"
                      : item.priority === 3
                      ? "Importante"
                      : item.priority === 5
                      ? "Alta"
                      : "Baixa "}
                  </TableCell>
                }
              </TableCell>

              <TableCell className="font-base text-black text-center dark:text-white ">
                <Badge
                  className={`${
                    item.status === "Overdue"
                      ? "bg-red-800 hover:bg-red-800"
                      : item.status === null || item.status === ""
                      ? "bg-zinc-800 hover:bg-zinc-800"
                      : item.status === "InProgress"
                      ? "bg-blue-800 hover:bg-blue-800"
                      : "bg-green-800 hover:bg-green-800"
                  } text-white text-xs font-semibold`}
                >
                  {item.status === "Overdue"
                    ? "Atrasado"
                    : item.status === null || item.status === ""
                    ? "Não iniciado"
                    : item.status === "InProgress"
                    ? "Em progresso"
                    : "Concluído"}
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
    </Table>
  );
}
