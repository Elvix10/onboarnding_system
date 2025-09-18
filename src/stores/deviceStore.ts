import { create } from "zustand";
import { Device, CreateDeviceData, UpdateDeviceData } from "@/schemas/deviceSchema";
import { v4 as uuidv4 } from "uuid";

interface DeviceStore {
  devices: Device[];
  totalDevices: number;
  filters: {
    search: string;
  };
  setFilters: (filters: DeviceStore["filters"]) => void;
  addDevice: (data: CreateDeviceData) => Device;
  updateDevice: (id: string, data: UpdateDeviceData) => Device | null;
  deleteDevice: (id: string) => void;
  getDevice: (id: string) => Device | null;
}

export const useDeviceStore = create<DeviceStore>((set, get) => ({
  devices: [],
  totalDevices: 0,
  filters: {
    search: "",
  },
  setFilters: (filters) => set({ filters }),
  addDevice: (data) => {
    const device: Device = {
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      devices: [...state.devices, device],
      totalDevices: state.devices.length + 1,
    }));
    return device;
  },
  updateDevice: (id, data) => {
    const device = get().getDevice(id);
    if (!device) return null;

    const updatedDevice: Device = {
      ...device,
      ...data,
      updatedAt: new Date(),
    };

    set((state) => ({
      devices: state.devices.map((d) => (d.id === id ? updatedDevice : d)),
    }));

    return updatedDevice;
  },
  deleteDevice: (id) => {
    set((state) => ({
      devices: state.devices.filter((d) => d.id !== id),
      totalDevices: state.devices.length - 1,
    }));
  },
  getDevice: (id) => {
    return get().devices.find((d) => d.id === id) ?? null;
  },
}));