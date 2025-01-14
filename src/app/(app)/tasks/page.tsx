import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChartPriorityTask from "../../../components/PriorityChart";
import ChartAvailabilityTask from "../../../components/AvailabilityHours";
import { GetTasksById, GetUserWeekAvailable } from "@/services/tasks";
import { TableTasksById } from "../../../components/UserTasks";
import { GetStatusTasksById } from "@/services/tasks";
import { GetAllUsers } from "@/services/users";
import { SelectUser } from "../../../components/UserDropdown";
import ChartStatusTask from "@/components/StatusChart";

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

  const UserWeeks = await GetUserWeekAvailable(userId as string);
  const taskById = await GetTasksById(userId as string, { notComplete: true });

  const statusTasksData = await GetStatusTasksById(userId as string, {
    notComplete: true,
  });
  const tasksSummary = statusTasksData.tasksSummary;
  const statusSummary = statusTasksData.statusSummary;

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

      <div className="grid grid-cols-3 flex-1 mt-10 items-start gap-4 p-4 sm:py-0 ">
        <ChartPriorityTask tasksSummary={tasksSummary} />

        <ChartStatusTask statusSummary={statusSummary} />

        <ChartAvailabilityTask weeklyAvailability={UserWeeks} />

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>
              <span>Lista de tarefas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TableTasksById tasks={taskById} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
