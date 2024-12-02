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

  console.log;

  const data = await response.json();
  return data;
}

export async function GetUserWeekAvailable(userId: string) {
  const url = `${ApiURL}/graphs/users/${userId}/availability/week`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": `${ApiKey}`,
      "Content-Type": "application/json",
    },
  });

  const data: GetUserWeekAvailableParams = await response.json();
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
  console.log(data);
  return data;
}

export async function GetTasksById(userId: string) {
  const url = `${ApiURL}/users/${userId}/tasks?page=1&itemsPerPage=1000`;
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
  console.log(data);
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

export interface GetUserWeekAvailableParams {
  userName: string;
  workedHours: number;
  availableHours: number;
  maxWorkedHours: number;
}

export interface Assignments {
  id: string;
  name: string;
}
export interface TasksTemplateResponse {
  id: string;
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

interface Assignment {
  id: string;
  name: string;
}

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
  assignments: Assignment[];
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

export interface GanttData {
  tasks: Task[];
  totalTasksPerDay: { [date: string]: TaskPerDay };
}
