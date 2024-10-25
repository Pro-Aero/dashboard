"use server";

import { z } from "zod";
import { FormDataTemplateSchema } from "./schema";
import { CreateTemplate } from "@/services/templates";

type Inputs = z.infer<typeof FormDataTemplateSchema>;

export async function ActionCreateTemplate(data: Inputs) {
  const response = await CreateTemplate(data);

  if (response) {
    return true;
  }

  return false;
}
