export interface TaskPlannerProps {
  planId: string;
  bucketId: string;
  title: string;
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
  id: string;
  createdBy: {
    user: {
      displayName: string;
      id: string;
    };
    application: {
      displayName: string;
      id: string;
    };
  };
  appliedCategories: {};
  assignments: {
    assignedDateTime: string;
    orderHint: string;
    assignedBy: {
      user: { displayName: string; id: string };
      application: {
        displayName: string;
        id: string;
      };
    };
  };
}

export interface PlannerProps {
  createdDateTime: string;
  owner: string;
  title: string;
  id: string;
  createdBy: {
    user: { displayName: string; id: string };
    application: {
      displayName: string;
      id: string;
    };
  };
  container: {
    containerId: string;
    type: string;
    url: string;
  };
}

export interface TasksPriority {
  id: string;
  bucketId: string;
  title: string;
  percentComplete: number;
  priority: number;
  startDateTime: string;
  dueDateTime: string;
  completedDateTime: string;
  hours: number;
  status: string;
  planner: {
    id: string;
    title: string;
  };
  assignments: assignmentsProps[];
}

export interface assignmentsProps {
  id: string;
  name: string;
}

export interface hoursProjectsProps {
  id: string;
  groupId: string;
  title: string;
  owner: string;
  totalHours: number;
}

export interface TasksSummary {
  totalTasks: number;
  taskCountsByPriority: {
    low: number;
    medium: number;
    important: number;
    urgent: number;
  };
}

export interface WeeklyAvailability {
  totalAvailableHours: number;
  hoursOccupied: number;
  hoursRemaining: number;
}

export interface ListUsersProps {
  id: string;
  displayName: string;
  userPrincipalName: string;
  mail: string;
  jobTitle: string;
  busyHours: number;
}

export interface TeamWorkedHoursProps {
  userId: string;
  userName: string;
  tasksPerDays: {
    date: {
      totalHours: number;
      tasks: TasksTeamWorkedProps[];
      isWeekend: boolean;
    };
  };
}

export interface TasksTeamWorkedProps {
  taskId: string;
  title: string;
  hours: number;
  status: string;
}
