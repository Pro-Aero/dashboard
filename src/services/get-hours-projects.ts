import { ApiKey } from "@/utils/constants";

export async function GetHoursProject() {
  const teste = "http://34.238.193.94:3000";
  const url = `${teste}/planners`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": `${ApiKey}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}
