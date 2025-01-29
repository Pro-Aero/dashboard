import { z } from "zod";

export const FormDataTemplateSchemaExecute = z.object({
  assignments: z.record(z.string(), z.string()),
  templateId: z.string(),
  plan: z.string(),
});

export const TemplateSchemaData = z.object({
  plan: z.string().min(1, "O plano é obrigatório"),
  templateId: z.string(),
  tasks: z.array(
    z.object({
      responsibleId: z.string().min(1, "Responsável obrigatório"),
    })
  ),
});
