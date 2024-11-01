"use server";

import { z } from "zod";
import { FormDataTemplateSchemaExecute } from "./schema";
import { ExecuteTemplate } from "@/services/templates";

type Inputs = z.infer<typeof FormDataTemplateSchemaExecute>;

export async function ActionExecuteTemplate(data: Inputs) {
  const response = await ExecuteTemplate(data);

  if (response) {
    return true;
  }

  return false;
}
