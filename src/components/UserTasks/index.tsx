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
  tasks: TasksResponse;
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
            Plano
          </TableHead>
          <TableHead className="font-semibold text-base text-black dark:text-white text-left p-2">
            Horas
          </TableHead>
          <TableHead className="font-semibold text-base text-black dark:text-white text-left p-2">
            Responsável
          </TableHead>

          <TableHead className="font-semibold text-base text-black dark:text-white text-left p-2">
            Prioridade
          </TableHead>
          <TableHead className="font-semibold text-base text-black dark:text-white text-center p-2">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      {tasks.data.length > 0 ? (
        <TableBody>
          {tasks.data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-base text-black dark:text-white text-left p-2">
                {item.title.split("{")[0].trim()}
              </TableCell>

              <TableCell className="font-base text-black dark:text-white text-left p-2">
                {item.planner.title}
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
                {item.priority === 1
                  ? "Urgente"
                  : item.priority === 3
                  ? "Importante"
                  : item.priority === 5
                  ? "Alta"
                  : "Baixa"}
              </TableCell>

              <TableCell className="font-base text-black dark:text-white text-center p-2">
                <Badge
                  className={`${
                    item.status === "Overdue"
                      ? "bg-red-800 hover:bg-red-800"
                      : item.status === "NextOverdue"
                      ? "bg-orange-600 hover:bg-orange-600"
                      : item.status === null ||
                        item.status === "" ||
                        item.status === "NotStarted"
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
                    : item.status === null ||
                      item.status === "" ||
                      item.status === "NotStarted"
                    ? "Não iniciado"
                    : item.status === "InProgress"
                    ? "Em progresso"
                    : "Concluído"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={6}
              className="font-base text-base text-black dark:text-white p-2 text-center"
            >
              Não há tarefas.
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
}
