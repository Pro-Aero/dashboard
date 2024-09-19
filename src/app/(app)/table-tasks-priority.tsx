"use client";

import { TasksPriority } from "@/@types";
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
  tasksPriority: TasksPriority[];
}

export function TableTasks({ tasksPriority }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="p-0">
          <TableHead className="font-semibold text-base text-black dark:text-white">
            Nome
          </TableHead>

          <TableHead className="font-semibold text-base text-black dark:text-white">
            Especificações
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
      {tasksPriority &&
        tasksPriority.slice(0, 5).map((item, index) => (
          <TableBody key={index}>
            <TableRow>
              <TableCell className="font-base text-black dark:text-white w-[100px]">
                <div className="">
                  {
                    item.title
                      .replace(/\([^)]*\)/g, "") // Remove tudo que está entre parênteses
                      .split("-")[0] // Divide a string pelo "-"
                      .trim() // Remove espaços em branco extras
                  }
                </div>
              </TableCell>

              <TableCell className="font-base text-black dark:text-white text-center">
                {item.title.split("-")[1]?.trim() || ""}
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
                    item.status === "" || item.status === null
                      ? "bg-red-800 hover:bg-red-800"
                      : item.status === "InProgress"
                      ? "bg-blue-800 hover:bg-blue-800"
                      : "bg-green-800 hover:bg-green-800"
                  } text-white text-xs font-semibold`}
                >
                  {item.status === "" || item.status === null
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
