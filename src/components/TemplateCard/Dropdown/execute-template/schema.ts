import { z } from "zod";

export const FormDataTemplateSchemaExecute = z.object({
  assignments: z.record(z.string(), z.string()),
  templateId: z.string(),
  plan: z.string(),
});
