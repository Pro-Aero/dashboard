export async function GetUsers(userIds: string[], token: string) {
  try {
    // Array para armazenar os detalhes dos usuários
    const userDetails = [];

    // Buscar detalhes de cada usuário por ID
    for (const userId of userIds) {
      const userUrl = `https://graph.microsoft.com/v1.0/users/${userId}`;
      const response = await fetch(userUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(
          `Failed to fetch user details for ${userId}:`,
          response.statusText
        );
        continue; // Ignorar esse usuário e continuar
      }

      const userData = await response.json();
      userDetails.push(userData); // Adicionar os dados do usuário ao array
    }

    return userDetails; // Retornar a lista de usuários
  } catch (err) {
    console.error("Erro ao obter dados da API", err);
    throw new Error("Erro ao obter dados da API");
  }
}
