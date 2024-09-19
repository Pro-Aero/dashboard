import { ApiKey } from "@/utils/constants";

export async function GetTasksById(userId: string) {
  const teste = "http://34.238.193.94:3000";
  const url = `${teste}/users/${userId}/tasks?page=1&itemsPerPage=15`;
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
