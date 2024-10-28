import { z } from "zod";

export const FormDataTemplateSchemaEdit = z.object({
  templateId: z.string(),
  plannerId: z.string(),
});
