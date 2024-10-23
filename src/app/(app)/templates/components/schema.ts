import { z } from "zod";

export const FormDataTemplateSchema = z.object({
  nameTemplate: z.string().nonempty("Nome de template é obrigatório."),
});
