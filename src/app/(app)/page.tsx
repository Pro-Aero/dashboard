import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableTasks } from "./table-tasks-priority";
import { ArrowRight } from "lucide-react";
import { GetTasksPriority } from "@/services/get-tasks-priority";
import { Separator } from "@/components/ui/separator";
import { Component } from "./charts";
import { GetHoursProject } from "@/services/get-hours-projects";

export default async function Home() {
  const session = await auth();

  if (!session || Date.now() >= new Date(session.expires).getTime()) {
    redirect("/auth/sign-in");
  }

  const tasksPriority = await GetTasksPriority();
  const hoursProjects = await GetHoursProject();

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:py-0 ">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle className="flex">
            <span>Tarefas prioritárias</span>
            <div className="ml-auto px-2">
              <ArrowRight className="size-6" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TableTasks tasksPriority={tasksPriority} />
        </CardContent>
      </Card>

      <Card className="rounded-3xl">
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
          <Component hoursProjects={hoursProjects} />
        </CardContent>
      </Card>
    </div>
  );
}
