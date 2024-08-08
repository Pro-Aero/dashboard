import { TaskWithUserIds } from "@/@types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserMap {
  [userId: string]: string;
}

interface PlannerMap {
  [plannerId: string]: string;
}

interface Props {
  tasks: TaskWithUserIds[];
  userMap: UserMap; // Mapeamento de IDs de usuários para nomes
  plannerMap: PlannerMap; // Mapeamento de IDs de planners para nomes
}

export function TableTasks({ tasks, userMap, plannerMap }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-medium text-base text-black dark:text-white">
            Nome
          </TableHead>

          <TableHead className="font-medium text-base text-black dark:text-white">
            Especificações
          </TableHead>

          <TableHead className="font-medium text-base text-black dark:text-white">
            Horas
          </TableHead>

          <TableHead className="font-medium text-base text-black dark:text-white">
            Responsável
          </TableHead>

          <TableHead className="font-medium text-base text-black dark:text-white">
            Plano
          </TableHead>

          <TableHead className="font-medium text-base text-black dark:text-white">
            Prioridade
          </TableHead>

          <TableHead className="font-medium text-base text-black dark:text-white text-center">
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      {tasks &&
        tasks.map((item, index) => {
          // Obter nomes dos usuários atribuídos
          const assignedUserNames = item.assignedUserIds
            .map((userId) => userMap[userId] || "Desconhecido")
            .join("/");

          // Obter o nome do planner
          const plannerName = plannerMap[item.plannerId] || "Desconhecido";

          return (
            <TableBody key={index}>
              <TableRow>
                <TableCell className="font-base text-black dark:text-white w-[100px]">
                  <div className="w-[200px]">
                    {
                      item.task.title
                        .replace(/\([^)]*\)/g, "") // Remove tudo que está entre parênteses
                        .split("-")[0] // Divide a string pelo "-"
                        .trim() // Remove espaços em branco extras
                    }
                  </div>
                </TableCell>

                <TableCell className="font-base text-black dark:text-white">
                  <div className="w-[100px]">
                    {item.task.title.match(/\(([^)]+)\)/)?.[1] || ""}
                  </div>
                </TableCell>

                <TableCell className="font-base text-black dark:text-white">
                  <div className="w-[100px]">
                    {item.task.title.split("-")[1]?.trim() || ""}
                  </div>
                </TableCell>
                <TableCell className="font-base text-black dark:text-white">
                  {assignedUserNames}
                </TableCell>
                <TableCell className="font-base text-black dark:text-white">
                  {plannerName}
                </TableCell>
                <TableCell className="font-base text-black text-center dark:text-white">
                  {item.task.priority === 1
                    ? "Urgente"
                    : item.task.priority === 3
                    ? "Importante"
                    : item.task.priority === 5
                    ? "Media"
                    : "Baixa "}
                </TableCell>
                <TableCell className="font-base text-black text-center dark:text-white w-[150px]">
                  <Badge
                    className={`${
                      item.task.percentComplete === 0
                        ? "bg-red-700 text-red-400 hover:bg-red-800"
                        : item.task.percentComplete === 50
                        ? "bg-blue-700 text-blue-400 hover:bg-blue-800"
                        : "bg-green-700 text-green-400 hover:bg-green-800"
                    } px-4 `}
                  >
                    {item.task.percentComplete === 0
                      ? "Não iniciado"
                      : item.task.percentComplete === 50
                      ? "Em progresso"
                      : "Concluído"}
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          );
        })}
    </Table>
  );
}
