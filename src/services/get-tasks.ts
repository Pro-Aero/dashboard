import { TaskWithUserIds } from "@/@types";

// Função para buscar planos de um grupo específico
async function getPlansForGroup(groupId: string, token: string) {
  const plansUrl = `https://graph.microsoft.com/v1.0/groups/${groupId}/planner/plans`;
  const response = await fetch(plansUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error(`Error fetching plans for group ${groupId}:`, errorDetails);
    throw new Error("Failed to fetch plans: " + response.statusText);
  }

  const data = await response.json();
  return data.value;
}

// Função para buscar tarefas de um plano específico
async function getTasksForPlan(planId: string, token: string) {
  const tasksUrl = `https://graph.microsoft.com/v1.0/planner/plans/${planId}/tasks`;
  const response = await fetch(tasksUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error(`Error fetching tasks for plan ${planId}:`, errorDetails);
    throw new Error("Failed to fetch tasks: " + response.statusText);
  }

  const data = await response.json();
  return data.value;
}

export async function GetTasks(token: string): Promise<TaskWithUserIds[]> {
  const groupsUrl = "https://graph.microsoft.com/v1.0/me/memberOf";

  try {
    // Obter todos os grupos dos quais o usuário é membro
    const response = await fetch(groupsUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Error fetching user groups:", errorDetails);
      throw new Error("Failed to fetch groups: " + response.statusText);
    }

    const groupsData = await response.json();
    const groups = groupsData.value.filter(
      (group) => group["@odata.type"] === "#microsoft.graph.group"
    );

    const allTasks: TaskWithUserIds[] = [];

    // Obter planos e tarefas em paralelo
    const groupTasksPromises = groups.map(async (group) => {
      try {
        const plans = await getPlansForGroup(group.id, token);
        const planTasksPromises = plans.map(async (plan) => {
          try {
            const tasks = await getTasksForPlan(plan.id, token);
            // Mapear tarefas para incluir IDs de criador e atribuídos
            return tasks.map((task) => {
              const creatorId = task.createdBy?.user?.id || null;
              const assignedUserIds = Object.keys(task.assignments || {});
              return {
                task,
                creatorId,
                assignedUserIds,
                plannerId: plan.id, // Incluindo o plannerId
              };
            });
          } catch (error) {
            console.error(`Failed to fetch tasks for plan ${plan.id}:`, error);
            return [];
          }
        });
        const planTasks = await Promise.all(planTasksPromises);
        return planTasks.flat();
      } catch (error) {
        console.error(`Failed to fetch plans for group ${group.id}:`, error);
        return [];
      }
    });

    const tasksPerGroup = await Promise.all(groupTasksPromises);
    allTasks.push(...tasksPerGroup.flat());

    return allTasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}
