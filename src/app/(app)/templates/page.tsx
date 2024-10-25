import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { TemplateCard } from "@/components/TemplateCard";
import { GetAllTemplates, TemplateResponse } from "@/services/templates";
import { ModalCreateTemplate } from "./components/modal-create-template";
import { GetAllUsers } from "@/services/users";

export default async function Templates() {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }
  const listUsers = await GetAllUsers();
  const templateData = await GetAllTemplates();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end pt-5">
        <ModalCreateTemplate />
      </div>
      <div className="flex flex-wrap gap-8 justify-start pl-10">
        {templateData &&
          templateData.map((item, index) => (
            <TemplateCard key={index} template={item} users={listUsers} />
          ))}
        <div className="mx-auto max-w-[1200px] grid grid-cols-4 gap-14 mt-10"></div>
      </div>
    </div>
  );
}
