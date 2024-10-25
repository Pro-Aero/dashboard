import { ApiKey, ApiURL } from "@/utils/constants";

export async function GetStatusTasksById(userId: string) {
  const url = `${ApiURL}/users/${userId}/tasks/status`;
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
  const url = `${ApiURL}/tasks/priority`;
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
  const url = `${ApiURL}/users/${userId}/tasks?page=1&itemsPerPage=15`;
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
  const url = `${ApiURL}/graphs/team/availability
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

export async function GetHoursWorkedUsers(userId: string) {
  const url = `${ApiURL}/graphs/tasks/user/${userId}
    `;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": `${ApiKey}`,
      "Content-Type": "application/json",
    },
  });

  const data: GanttData = await response.json();
  return data;
}

export interface Assignments {
  id: string;
  name: string;
}
export interface TasksTemplateResponse {
  title: string;
  priority: number;
  hours: number;
}
export interface TasksResponse {
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

// Gant chart

interface Planner {
  id: string;
  title: string;
}

export interface TaskInfo {
  id: string;
  bucketId: string;
  title: string;
  percentComplete: number;
  priority: number;
  startDateTime: string;
  dueDateTime: string;
  completedDateTime: string | null;
  hours: number;
  status: string;
  planner: Planner;
  assignments: Assignments[];
}

export interface TaskPerDay {
  totalHours: number;
  tasks: {
    taskId: string;
    title: string;
    hours: number;
    status: string;
  }[];
  isWeekend: boolean;
}

export interface Task {
  taskInfo: TaskInfo;
  taskPerDay: { [date: string]: TaskPerDay };
}

export interface TotalTasksPerDay {
  [date: string]: TaskPerDay;
}

export interface GanttData {
  tasks: Task[];
  totalTasksPerDay: TotalTasksPerDay;
}
