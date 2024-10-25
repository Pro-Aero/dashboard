"use server";

import { DeleteTemplate } from "@/services/templates";
import { z } from "zod";

const deleteTemplateFormSchema = z.object({
  templateId: z.string(),
});

export async function ActionDeleteTemplate(data: FormData) {
  const { templateId } = deleteTemplateFormSchema.parse(
    Object.fromEntries(data)
  );

  const response = await DeleteTemplate(templateId);

  if (response) {
    return true;
  }

  return false;
}
