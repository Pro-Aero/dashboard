import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AddButton } from "@/components/AddButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "postcss";

export default async function Templates() {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <>
      <div className="flex justify-end pt-5">
        <AddButton/>

      </div>
    </>
  );
}
