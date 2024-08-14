import { TaskWithUserIds } from "@/@types";
import { GetUsers } from "@/api/get-users";
import { auth } from "@/auth";
import { Header } from "@/components/header";
import { redirect } from "next/navigation";
import { GetTasks } from "@/services/get-tasks";
import { GetPlanner } from "@/services/get-planner"; // Supondo que você tenha uma função para isso
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TableTasks } from "./table-tasks";

interface UserMap {
  [userId: string]: string;
}

interface PlannerMap {
  [plannerId: string]: string;
}

export const runtime = "edge";

export default async function Home() {
  const session = await auth();

  if (!session || Date.now() >= new Date(session.expires).getTime()) {
    redirect("/auth/sign-in");
  }

  const tasks: TaskWithUserIds[] = await GetTasks(session.user.accessToken);

  // Obter IDs únicos de usuários atribuídos e criadores
  const userIds = Array.from(
    new Set(tasks.flatMap((task) => [task.creatorId, ...task.assignedUserIds]))
  );

  // Buscar detalhes dos usuários
  const userDetails = await GetUsers(
    userIds as string[],
    session.user.accessToken
  );

  // Construir o mapa de IDs de usuários para nomes
  const userMap: UserMap = {};

  for (const user of userDetails) {
    if (user) {
      userMap[user.id] = user.displayName;
    }
  }

  // Obter IDs únicos de planos
  const plannerIds = Array.from(new Set(tasks.map((task) => task.plannerId)));

  // Buscar detalhes dos planos
  const plannerDetails = await Promise.all(
    plannerIds.map((plannerId) =>
      GetPlanner(plannerId, session.user.accessToken)
    )
  );

  // Construir o mapa de IDs de planos para nomes
  const plannerMap: PlannerMap = {};

  for (const planner of plannerDetails) {
    if (planner) {
      plannerMap[planner.id] = planner.title; // Supondo que o nome do plano está no campo `title`
    }
  }

  return (
    <div className="space-y-4 py-4">
      <Header />
      <div className="flex min-h-screen w-[1400px] mx-auto flex-col mt-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Tarefas</CardTitle>
              {/* <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription> */}
            </CardHeader>
            <CardContent>
              <TableTasks
                tasks={tasks}
                userMap={userMap}
                plannerMap={plannerMap}
              />
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of{" "}
                <strong>{tasks?.length}</strong> products
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
