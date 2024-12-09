import { ApiKey, ApiURL } from "@/utils/constants";

export async function GetAllUsers() {
  const url = `${ApiURL}/users?show=true`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": `${ApiKey}`,
      "Content-Type": "application/json",
    },
  });

  const data: UserResponse[] = await response.json();
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
