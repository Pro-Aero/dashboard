import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableTasks } from "../../components/PriorityTasks";
import { ArrowRight } from "lucide-react";
import { GetTasksPriority } from "@/services/tasks";
import { Separator } from "@/components/ui/separator";
import { GetHoursProject } from "@/services/planners";
import { Chart } from "@/components/Charts";

export default async function Home() {
  const session = await auth();

  if (!session || Date.now() >= new Date(session.expires).getTime()) {
    redirect("/auth/sign-in");
  }

  const tasksPriority = await GetTasksPriority();
  const hoursProjects = await GetHoursProject();

  return (
    <div className="flex-col flex-1 items-start gap-4 p-4 sm:py-0 ">
      <Card className="rounded-3xl mt-10 mb-10">
        <CardHeader>
          <CardTitle className="flex">
            <span>Tarefas prioritárias</span>
            <div className="ml-auto px-2">
              <ArrowRight className="size-6" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TableTasks tasks={tasksPriority} />
        </CardContent>
      </Card>

      <Card className="rounded-3xl mt-10 mb-10">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center text-center">
              <span>Distribuição de horas por projeto</span>
              <div className="ml-auto">
                <ArrowRight className="size-6" />
              </div>
            </div>
            <Separator className="w-full h-px bg-gray-300 mt-2" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Chart hoursProjects={hoursProjects} />
        </CardContent>
      </Card>
    </div>
  );
}
