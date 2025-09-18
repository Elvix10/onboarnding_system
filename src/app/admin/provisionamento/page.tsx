'use client'
import { SearchBar } from "@/components/SearchBar";

export default function ProvisionamentoPage() {
  return (
    <>
      <header className="p-4 border-b border-border">
        <SearchBar />
      </header>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Provisionamento</h1>
            <p className="text-muted-foreground">Gerencie o provisionamento de equipamentos</p>
          </div>
        </div>

        {/* Content will be added here */}
        <div className="bg-card rounded-xl shadow-soft p-6">
          <p className="text-muted-foreground text-center">
            Conteúdo em desenvolvimento
          </p>
        </div>
      </div>
    </>
  );
}