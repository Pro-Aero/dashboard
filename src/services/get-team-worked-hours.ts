import { TeamWorkedHoursProps } from "@/@types";
import { ApiKey } from "@/utils/constants";

export async function GetHoursWorkedTeam() {
  const teste = "http://34.238.193.94:3000";
  const url = `${teste}/graphs/team/availability
`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": `${ApiKey}`,
      "Content-Type": "application/json",
    },
  });

  console.log(response);

  const data: TeamWorkedHoursProps[] = await response.json();
  return data;
}
