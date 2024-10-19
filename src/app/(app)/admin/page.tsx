import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AvailabilityEmployee } from "../../../components/HoursDistribution";
import { GetAllUsers } from "@/services/users";

export default async function Admin() {
  const session = await auth();

  if (!session || Date.now() >= new Date(session.expires).getTime()) {
    redirect("/auth/sign-in");
  }

  const listUsers = await GetAllUsers();

  return (
    <>
      <div className="px-6 py-2">
        <span className="text-2xl font-semibold">Admin</span>
      </div>
      <AvailabilityEmployee listUsers={listUsers} />
    </>
  );
}
