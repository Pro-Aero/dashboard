"use server";

import { ApiKey, ApiURL } from "@/utils/constants";

export const sync = async () => {
  const res = await fetch(`${ApiURL}/sync`, {
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
