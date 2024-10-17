import { ApiKey } from "@/utils/constants";

export async function GetStatusTasksById(userId: string) {
  const url = `http://3.219.224.207:3000/users/${userId}/tasks/status`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": `${process.env.NEXTAUTH_API}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}
