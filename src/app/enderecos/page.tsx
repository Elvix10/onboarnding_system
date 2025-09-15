"use client";

import { useAddressStore } from "@/stores/addressStore";
import { useEmployeeStore } from "@/stores/employeeStore";
import { AddressDialog } from "@/components/dialog/AddressDialog";
import { Button } from "@/components/ui/button";
import { MapPin,  Trash2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { SearchBar } from "@/components/SearchBar";

export default function EnderecoPage() {
  const { addresses, deleteAddress } = useAddressStore();
  const { employees } = useEmployeeStore();

  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee?.fullName || "Funcionário não encontrado";
  };

  return (
    <main className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1">
        <header className="p-4 border-b border-border">
          <SearchBar />
        </header>
        <section className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Endereços</h1>
              <p className="text-lg text-muted-foreground">Gerencie os endereços dos funcionários</p>
            </div>
            <AddressDialog mode="create" />
          </div>

          <div className="grid gap-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-card rounded-lg p-6 shadow-sm flex justify-between items-start"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">
                      {getEmployeeName(address.employeeId)}
                    </h3>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{address.street}, {address.number}{address.complement ? `, ${address.complement}` : ""}</p>
                    <p>{address.district} - {address.city}</p>
                    <p>CEP: {address.cep.replace(/(\d{5})(\d{3})/, "$1-$2")}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <AddressDialog mode="edit" addressId={address.id} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteAddress(address.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {addresses.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Nenhum endereço cadastrado. Clique em Adicionar Endereço para começar.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
