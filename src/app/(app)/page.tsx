import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableTasks } from "../../components/PriorityTasks";
import { ArrowRight } from "lucide-react";
import { GetTasksPriority } from "@/services/tasks";
import { Separator } from "@/components/ui/separator";
import { GetAllPlanners } from "@/services/planners";
import { Chart } from "@/components/Charts";
import { StatusSelect } from "@/components/StatusSelect";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    status: string;
    page: string;
    itemsPerPage: string;
  };
}) {
  const session = await auth();

  if (!session || Date.now() >= new Date(session.expires).getTime()) {
    redirect("/auth/sign-in");
  }

  const page = parseInt(searchParams.page ?? "1", 10);
  const itemsPerPage = parseInt(searchParams.itemsPerPage ?? "10", 10);

  const status = (searchParams.status as string) || "All";
  const tasksPriority = await GetTasksPriority(status, page, itemsPerPage);
  const hoursProjects = await GetAllPlanners();

  return (
    <div className="flex-col flex-1 items-start gap-4 p-4 sm:py-0 ">
      <Card className="rounded-3xl mt-10 mb-10">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span>Tarefas prioritárias</span>
            <div className="ml-auto flex items-center gap-4">
              <StatusSelect />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TableTasks
            tasks={tasksPriority}
            currentPage={page}
            totalPages={Math.ceil(tasksPriority.pagination.totalPages)}
            itemsPerPage={itemsPerPage}
          />
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
