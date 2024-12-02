import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { GetAllUsers } from "@/services/users";
import Timeline from "@/components/TimeLine";
import { GetHoursWorkedTeam, GetHoursWorkedUsers } from "@/services/tasks";
import { TeamGanttChart } from "@/components/Gant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  searchParams: {
    userId: string;
  };
}

export default async function Admin({ searchParams }: Props) {
  const userId = searchParams.userId;

  const session = await auth();
  const data = await GetHoursWorkedTeam();
  if (!session || Date.now() >= new Date(session.expires).getTime()) {
    redirect("/auth/sign-in");
  }

  const listUsers = await GetAllUsers();

  const gantData = await GetHoursWorkedUsers(userId);

  return (
    <>
      <div className="px-6 py-2">
        <span className="text-2xl font-semibold">Admin</span>
      </div>
      <Tabs defaultValue="timeline">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="gantt">Gantt</TabsTrigger>
        </TabsList>
        <TabsContent value="timeline">
          <Timeline teamData={data} />
        </TabsContent>

        <TabsContent value="gantt">
          <TeamGanttChart usersList={listUsers} teamData={gantData} />
        </TabsContent>
      </Tabs>
    </>
  );
}
