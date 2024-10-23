import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { TemplateCard } from "@/components/TemplateCard";
import { TemplateResponse } from "@/services/templates";
import { ModalCreateTemplate } from "./components/modal-create-template";

export default async function Templates() {
  const mockdata: TemplateResponse[] = [
    {
      title: "Exemplo Template",
      tasks: [
        { id: "12312", description: "Exemplo de tasks blabla" },
        { id: "12312", description: "Exemplo de tasks blabla" },
        { id: "12312", description: "Exemplo de tasks blabla" },
        { id: "12312", description: "Exemplo de tasks blabla" },
      ],
    },
    {
      title: "Exemplo Template",
      tasks: [
        { id: "12312", description: "Exemplo de tasks blabla" },
        { id: "12312", description: "Exemplo de tasks blabla" },
        { id: "12312", description: "Exemplo de tasks blabla" },
        { id: "12312", description: "Exemplo de tasks blabla" },
      ],
    },
    {
      title: "Exemplo Template",
      tasks: [
        { id: "12312", description: "Exemplo de tasks blabla" },
        { id: "12312", description: "Exemplo de tasks blabla" },
        { id: "12312", description: "Exemplo de tasks blabla" },
        { id: "12312", description: "Exemplo de tasks blabla" },
      ],
    },
    {
      title: "Exemplo Template",
      tasks: [
        { id: "12312", description: "Exemplo de tasks blabla" },
        { id: "12312", description: "Exemplo de tasks blabla" },
        { id: "12312", description: "Exemplo de tasks blabla" },
        { id: "12312", description: "Exemplo de tasks blabla" },
      ],
    },
  ];
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end pt-5">
        <ModalCreateTemplate />
      </div>
      <div className="flex flex-wrap gap-8 justify-start pl-10">
        {mockdata &&
          mockdata.map((item, index) => (
            <TemplateCard key={index} template={item} />
          ))}
        <div className="mx-auto max-w-[1200px] grid grid-cols-4 gap-14 mt-10"></div>
      </div>
    </div>
  );
}
