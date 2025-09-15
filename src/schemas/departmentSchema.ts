import { z } from "zod"

export const departmentFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome deve ter pelo menos 2 caracteres" })
    .max(50, { message: "Nome deve ter no máximo 50 caracteres" }),
  description: z
    .string()
    .min(10, { message: "Descrição deve ter pelo menos 10 caracteres" })
    .max(500, { message: "Descrição deve ter no máximo 500 caracteres" }),
})

export type DepartmentFormValues = z.infer<typeof departmentFormSchema>