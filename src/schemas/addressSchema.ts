import { z } from "zod";

export const addressSchema = z.object({
  id: z.string().uuid(),
  employeeId: z.string().uuid(),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  district: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  cep: z.string().length(8, "CEP deve ter 8 dígitos").regex(/^\d+$/, "CEP deve conter apenas números"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createAddressSchema = addressSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateAddressSchema = createAddressSchema.partial();

export type Address = z.infer<typeof addressSchema>;
export type CreateAddress = z.infer<typeof createAddressSchema>;
export type UpdateAddress = z.infer<typeof updateAddressSchema>;