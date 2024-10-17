import { env } from "@/env";

export async function GetTasksPriority() {
  const teste = "http://3.219.224.207:3000";
  const url = `${teste}/tasks/priority`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": `${env.NEXTAUTH_API}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}
