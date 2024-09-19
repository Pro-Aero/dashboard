import { ApiKey } from "@/utils/constants";

export async function GetAllUsers() {
  const url = `http://34.238.193.94:3000/users`;
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
