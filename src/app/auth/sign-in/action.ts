"use server";

import { signIn } from "@/auth";
export async function SignInAction() {
  try {
    await signIn("azure-ad", { prompt: "login" });
  } catch (err) {
    console.log("erro de servidor?");
  }
}
