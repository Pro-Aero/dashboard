export async function GetGroups(token: string) {
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/groups?$count=true`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await response.json();

  return data;
}
