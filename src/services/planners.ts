import { ApiKey, ApiURL } from "@/utils/constants";

export async function GetAllPlanners() {
  const url = `${ApiURL}/planners`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": `${ApiKey}`,
      "Content-Type": "application/json",
    },
  });

  const data: PlannerResponse[] = await response.json();
  return data;
}

export interface PlannerResponse {
  id: string;
  groupId: string;
  title: string;
  owner: string;
  totalHours: number;
}
