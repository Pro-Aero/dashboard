"use server";

import { z } from "zod";
import { FormDataTemplateSchemaEdit } from "./schema";
import { EditTemplate } from "@/services/templates";

type Inputs = z.infer<typeof FormDataTemplateSchemaEdit>;

export async function ActionEditTemplate(data: Inputs) {
  const response = await EditTemplate(data);

  if (response) {
    return true;
  }

  return false;
}
