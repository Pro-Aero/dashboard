interface PlannerDetails {
  id: string;
  title: string;
  // Adicione outros campos que você possa precisar
}

async function GetPlanner(
  plannerId: string,
  accessToken: string
): Promise<PlannerDetails | null> {
  try {
    const response = await fetch(
      `https://graph.microsoft.com/v1.0/planner/plans/${plannerId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch planner details: ${response.status} - ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();
    return {
      id: data.id,
      title: data.title,
      // Extraia e retorne outros campos conforme necessário
    };
  } catch (error) {
    console.error("Error fetching planner details:", error);
    return null;
  }
}

export { GetPlanner };
