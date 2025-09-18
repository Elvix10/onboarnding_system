import { SearchBar } from "@/components/SearchBar";
import { Laptop, Cloud, Lock, Database, Code, Terminal } from "lucide-react";

const tools = [
  {
    icon: Laptop,
    name: "Gestão de Hardware",
    description: "Controle e manutenção de equipamentos",
    status: "Ativo",
  },
  {
    icon: Cloud,
    name: "Cloud Services",
    description: "Gerenciamento de recursos em nuvem",
    status: "Ativo",
  },
  {
    icon: Lock,
    name: "Segurança",
    description: "Controle de acesso e permissões",
    status: "Ativo",
  },
  {
    icon: Database,
    name: "Banco de Dados",
    description: "Administração de databases",
    status: "Manutenção",
  },
  {
    icon: Code,
    name: "Desenvolvimento",
    description: "Ferramentas de desenvolvimento",
    status: "Ativo",
  },
  {
    icon: Terminal,
    name: "CLI Tools",
    description: "Ferramentas de linha de comando",
    status: "Ativo",
  },
];

export default function FerramentasPage() {
  return (
    <>
      <header className="p-4 border-b border-border">
        <SearchBar />
      </header>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Ferramentas</h1>
          <p className="text-muted-foreground">Acesse as ferramentas do sistema</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <div key={idx} className="bg-card rounded-xl shadow-soft p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{tool.name}</h3>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        tool.status === "Ativo" 
                          ? "bg-success/10 text-success" 
                          : "bg-warning/10 text-warning"
                      }`}>
                        {tool.status}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {tool.description}
                    </p>
                    <button className="mt-4 w-full py-2 text-sm text-center border border-border rounded-lg hover:bg-muted transition-colors">
                      Acessar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}