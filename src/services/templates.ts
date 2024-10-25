import { ApiKey, ApiURL } from "@/utils/constants";
import { TasksTemplateResponse } from "./tasks";
import { FormDataTemplateSchema } from "@/app/(app)/templates/components/schema";
import { z } from "zod";
import { FormDataTemplateSchemaEdit } from "@/components/TemplateCard/Dropdown/edit-template/schema";

type Inputs = z.infer<typeof FormDataTemplateSchema>;

export async function GetAllTemplates() {
  const response = await fetch(`${ApiURL}/templates`, {
    method: "GET",
    headers: {
      "x-api-key": `${ApiKey}`,
      "Content-Type": "application/json",
    },
  });

  const data: TemplateResponse[] = await response.json();

  if (response) {
    return data;
  }

  return [];
}

export async function CreateTemplate(data: Inputs) {
  const { nameTemplate, tasks } = FormDataTemplateSchema.parse(data);

  const response = await fetch(`${ApiURL}/templates`, {
    method: "POST",
    headers: {
      "x-api-key": `${ApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: nameTemplate,
      tasks,
    }),
  });

  if (response.ok) {
    return true;
  }

  return false;
}

export async function EditTemplate(data: Inputs) {
  const { templateId, nameTemplate, tasks } =
    FormDataTemplateSchemaEdit.parse(data);

  const response = await fetch(`${ApiURL}/templates/${templateId}`, {
    method: "PATCH",
    headers: {
      "x-api-key": `${ApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: nameTemplate,
      tasks,
    }),
  });

  if (response.ok) {
    return true;
  }

  return false;
}

export async function DeleteTemplate(templateId: string) {
  const response = await fetch(`${ApiURL}/templates/${templateId}`, {
    method: "DELETE",
    headers: {
      "x-api-key": `${ApiKey}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return true;
  }

  return false;
}
export interface TemplateResponse {
  id: string;
  title: string;
  tasks: TasksTemplateResponse[];
}
