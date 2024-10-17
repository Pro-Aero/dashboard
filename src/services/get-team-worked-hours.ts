import { TeamWorkedHoursProps } from "@/@types";
import { ApiKey } from "@/utils/constants";

export async function GetHoursWorkedTeam() {
  const teste = "http://3.219.224.207:3000";
  const url = `${teste}/graphs/team/availability
`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": `${process.env.NEXTAUTH_API}`,
      "Content-Type": "application/json",
    },
  });

  console.log(response);

  const data: TeamWorkedHoursProps[] = await response.json();
  return data;
}
