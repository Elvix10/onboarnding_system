import { create } from "zustand";
import { Address, CreateAddress, UpdateAddress } from "@/schemas/addressSchema";

interface AddressStore {
  addresses: Address[];
  createAddress: (address: CreateAddress) => void;
  updateAddress: (id: string, address: UpdateAddress) => void;
  deleteAddress: (id: string) => void;
  getAddressByEmployeeId: (employeeId: string) => Address | undefined;
}

export const useAddressStore = create<AddressStore>((set, get) => ({
  addresses: [
    {
      id: "1",
      employeeId: "1",
      street: "Av. Paulista",
      number: "1000",
      complement: "Apto 101",
      district: "Bela Vista",
      city: "São Paulo",
      cep: "01310000",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      employeeId: "2",
      street: "Rua das Flores",
      number: "200",
      complement: "Casa",
      district: "Jardim",
      city: "Rio de Janeiro",
      cep: "22041001",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      employeeId: "3",
      street: "Praça da Sé",
      number: "50",
      complement: "Sala 5",
      district: "Centro",
      city: "Salvador",
      cep: "40020010",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  
  createAddress: (newAddress: CreateAddress) => {
    const address: Address = {
      ...newAddress,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({
      addresses: [...state.addresses, address],
    }));
  },
  
  updateAddress: (id: string, updatedAddress: UpdateAddress) => {
    set((state) => ({
      addresses: state.addresses.map((address) =>
        address.id === id
          ? { ...address, ...updatedAddress, updatedAt: new Date() }
          : address
      ),
    }));
  },
  
  deleteAddress: (id: string) => {
    set((state) => ({
      addresses: state.addresses.filter((address) => address.id !== id),
    }));
  },

  getAddressByEmployeeId: (employeeId: string) => {
    return get().addresses.find((address) => address.employeeId === employeeId);
  },
}));