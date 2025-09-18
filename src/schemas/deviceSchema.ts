import { z } from "zod";

export const deviceTypes = ["LAPTOP", "MONITOR", "PHONE", "ACCESSORY"] as const;

export const deviceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  type: z.enum(deviceTypes),
  description: z.string().min(5, "A descrição deve ter no mínimo 5 caracteres"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Device = z.infer<typeof deviceSchema>;

export type CreateDeviceData = Omit<Device, "id" | "createdAt" | "updatedAt">;
export type UpdateDeviceData = Partial<CreateDeviceData>;