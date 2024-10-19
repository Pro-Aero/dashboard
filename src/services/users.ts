import { ApiKey } from "@/utils/constants";

export async function GetAllUsers() {
  const url = `http://3.219.224.207:3000/users`;
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


export interface UserResponse {
    id: string;
    displayName: string;
    userPrincipalName: string;
    mail: string;
    jobtitle: string;
    busyHours: number;
}