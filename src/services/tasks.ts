import { ApiKey } from "@/utils/constants";

export async function GetStatusTasksById(userId: string) {
    const url = `http://3.219.224.207:3000/users/${userId}/tasks/status`;
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
  
export async function GetTasksPriority() {
  const teste = "http://3.219.224.207:3000";
  const url = `${teste}/tasks/priority`;
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

export async function GetTasksById(userId: string) {
    const teste = "http://3.219.224.207:3000";
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
  
export async function GetHoursWorkedTeam() {
    const teste = "http://3.219.224.207:3000";
    const url = `${teste}/graphs/team/availability
    `;
    const response = await fetch(url, {
        method: "GET",
        headers: {
        "x-api-key": `${ApiKey}`,
        "Content-Type": "application/json",
        },
    });

    const data: TimeLineResponse[] = await response.json();
    return data;
}
  

export interface Assignments {
    id: string;
    name: string;
  }
export interface TasksResponse{
    id: string;
    title: string;
    bucketId: string;
    orderHint: string;
    assigneePriority: string;
    percentComplete: number;
    startDateTime: string;
    createdDateTime: string;
    dueDateTime: string;
    hasDescription: boolean;
    previewType: string;
    completedDateTime: string;
    referenceCount: number;
    checkListItemCount: number;
    activeCheckListItemCount: number;
    conversationThreadId: string;
    priority: number;
    hours: number;
    status: string;
    planner: {
        id: string;
        title: string;
    };
    assignments: Assignments[];
}

export interface TasksHoursResponse {
    taskId: string;
    title: string;
    hours: number;
    status: string;
}  

export interface WeeklyAvailability {
    totalAvailableHours: number;
    hoursOccupied: number;
    hoursRemaining: number;
  }

export interface TimeLineResponse {
    userId: string;
    userName: string;
    tasksPerDays: {
      [date: string]: {
        totalHours: number;
        tasks: TasksHoursResponse[];
        isWeekend: boolean;
        availableHours: number;
        workedHours: number;
      };
    };
  }