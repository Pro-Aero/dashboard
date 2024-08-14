"use server";

import { signIn } from "@/auth";
export async function SignInAction() {
  await signIn("azure-ad", { prompt: "login" });
}
