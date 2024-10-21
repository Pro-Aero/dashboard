import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AvailabilityEmployee } from "../../../components/HoursDistribution";
import { GetAllUsers } from "@/services/users";
import Timeline from "@/components/TimeLine";
import { GetHoursWorkedTeam } from "@/services/tasks";

export default async function Admin() {
  const session = await auth();
  const data = await GetHoursWorkedTeam();
  if (!session || Date.now() >= new Date(session.expires).getTime()) {
    redirect("/auth/sign-in");
  }

  const listUsers = await GetAllUsers();

  return (
    <>
      <div className="px-6 py-2">
        <span className="text-2xl font-semibold">Admin</span>
      </div>
      <Timeline teamData={data} />
    </>
  );
}
