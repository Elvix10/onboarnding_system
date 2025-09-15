import { z } from "zod"

export const employeeFormSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
    .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
  personalEmail: z
    .string()
    .email({ message: "Email inválido" }),
  phoneNumber: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, { 
      message: "Telefone deve estar no formato (99) 99999-9999" 
    }),
  departmentId: z
    .string()
    .min(1, { message: "Departamento é obrigatório" }),
})

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>