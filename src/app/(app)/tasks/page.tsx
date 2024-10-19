import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChartPriorityTask from "../../../components/PriorityChart";
import ChartAvailabilityTask from "../../../components/AvailabilityHours";
import { GetTasksById } from "@/services/tasks";
import { TableTasksById } from "../../../components/UserTasks";
import { GetStatusTasksById } from "@/services/tasks";
import { GetAllUsers } from "@/services/users";
import { SelectUser } from "../../../components/UserDropdown";

interface Props {
  searchParams: {
    employee: string;
  };
}

export default async function Tasks({ searchParams }: Props) {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const userId =
    session.user.role === "admin"
      ? searchParams.employee
        ? searchParams.employee
        : session.user.id
      : session.user.id;

  const tasksByIdData = await GetTasksById(userId as string);
  const tasks = tasksByIdData.data;

  const statusTasksData = await GetStatusTasksById(userId as string);
  const tasksSummary = statusTasksData.tasksSummary;
  const weeklyAvailability = statusTasksData.weeklyAvailability;

  // ------------------

  const listUsers = await GetAllUsers();

  return (
    <>
      {session.user.role === "admin" ? (
        <div className="grid px-4 py-2">
          <SelectUser listUsers={listUsers} employee={searchParams.employee} />
        </div>
      ) : (
        <></>
      )}

      <div className="grid grid-cols-2 flex-1 mt-10 items-start gap-4 p-4 sm:py-0 ">
        <ChartPriorityTask tasksSummary={tasksSummary} />

        <ChartAvailabilityTask weeklyAvailability={weeklyAvailability} />

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>
              <span>Lista de tarefas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TableTasksById tasks={tasks} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
