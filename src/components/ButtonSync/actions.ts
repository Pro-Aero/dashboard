"use server";

import { ApiKey } from "@/utils/constants";

export const sync = async () => {
  const res = await fetch(`http://34.238.193.94:3000/sync`, {
    method: "post",
    headers: {
      "x-api-key": `${ApiKey}`,
      "Content-Type": "application/json",
    },
  });

  if (res) {
    return true;
  }

  return false;
};
