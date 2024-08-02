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

export interface TaskWithUserIds {
  task: TaskPlannerProps;
  creatorId: string | null;
  assignedUserIds: string[];
  plannerId: string; // Adicionando o ID do plano
}
