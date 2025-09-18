'use client'
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDeviceStore } from "@/stores/deviceStore";
import { deviceTypes } from "@/schemas/deviceSchema";
import type { Device } from "@/schemas/deviceSchema";

interface DeviceDialogProps {
  mode?: "create" | "edit";
  deviceId?: string;
  trigger?: React.ReactNode;
}

export function DeviceDialog({ mode = "create", deviceId, trigger }: DeviceDialogProps) {
  const { addDevice, updateDevice, getDevice } = useDeviceStore();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Device>>(() => {
    if (mode === "edit" && deviceId) {
      const device = getDevice(deviceId);
      return device || {};
    }
    return {};
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "create") {
      addDevice(formData as any);
    } else if (deviceId) {
      updateDevice(deviceId, formData);
    }
    setOpen(false);
  };

  const defaultTrigger = mode === "create" ? (
    <Button>
      <Plus className="w-4 h-4 mr-2" />
      Adicionar Dispositivo
    </Button>
  ) : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Adicionar Dispositivo" : "Editar Dispositivo"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Dell Latitude Laptop"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select
              value={formData.type || ""}
              onValueChange={(value) => setFormData({ ...formData, type: value as any })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {deviceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o dispositivo..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {mode === "create" ? "Adicionar" : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}