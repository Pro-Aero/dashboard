import { z } from "zod";

export const FormDataTemplateSchemaEdit = z.object({
  templateId: z.string(),
  nameTemplate: z.string().min(1, "Nome do template é obrigatório"),
  tasks: z.array(
    z.object({
      title: z.string().min(1, "Título é obrigatório"),
      hours: z.number(),
      priority: z.number().min(1, "Prioridade é obrigatória"),
    })
  ),
});
