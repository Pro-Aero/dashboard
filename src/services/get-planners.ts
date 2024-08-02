export async function GetPlanners(token: string, planId: string) {
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/me/planner/plans/
`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await response.json();

  return data.value;
}
