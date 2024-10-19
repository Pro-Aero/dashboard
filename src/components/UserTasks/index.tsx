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

export function TableTasksById({ tasks }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold text-base text-black dark:text-white text-left p-2">
            Nome
          </TableHead>
          <TableHead className="font-semibold text-base text-black dark:text-white text-left p-2">
            Especificações
          </TableHead>
          <TableHead className="font-semibold text-base text-black dark:text-white text-left p-2">
            Horas
          </TableHead>
          <TableHead className="font-semibold text-base text-black dark:text-white text-left p-2">
            Responsável
          </TableHead>
          <TableHead className="font-semibold text-base text-black dark:text-white text-left p-2">
            Plano
          </TableHead>
          <TableHead className="font-semibold text-base text-black dark:text-white text-left p-2">
            Prioridade
          </TableHead>
          <TableHead className="font-semibold text-base text-black dark:text-white text-center p-2">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      {tasks.length > 0 ? (
        tasks.map((item, index) => (
          <TableBody key={index}>
            <TableRow>
              <TableCell className="font-base text-black dark:text-white text-left p-2">
                {item.title
                  .split("-")[0]
                  .trim()}
              </TableCell>

              <TableCell className="font-base text-black dark:text-white text-left p-2">
                {item.title.split("-")[1]?.trim() || ""}
              </TableCell>

              <TableCell className="font-base text-black dark:text-white text-left p-2">
                {item.hours ? item.hours : "-"}
              </TableCell>

              <TableCell className="font-base text-black dark:text-white text-left p-2">
                {Array.isArray(item.assignments) && item.assignments.length > 0
                  ? item.assignments.map((resp) => resp.name).join(", ")
                  : "-"}
              </TableCell>

              <TableCell className="font-base text-black dark:text-white text-left p-2">
                {item.planner.title}
              </TableCell>

              <TableCell className="font-base text-black dark:text-white text-left p-2">
                {item.priority === 1
                  ? "Urgente"
                  : item.priority === 3
                  ? "Importante"
                  : item.priority === 5
                  ? "Alta"
                  : "Baixa "}
              </TableCell>

              <TableCell className="font-base text-black dark:text-white text-center p-2">
                <Badge
                  className={`${
                    item.status === "Overdue"
                      ? "bg-red-800 hover:bg-red-800"
                      : item.status === null || item.status === ""
                      ? "bg-zinc-800 hover:bg-zinc-800"
                      : item.status === "InProgress"
                      ? "bg-review hover:bg-review"
                      : "bg-success hover:bg-success"
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
        ))
      ) : (
        <TableBody>
          <TableRow>
            <TableCell className="font-base text-base text-black dark:text-white p-2">
              Não há tarefas.
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
}
