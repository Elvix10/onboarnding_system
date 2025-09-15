import { SearchBar } from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
/* import { Server, HardDrive, Cpu, Network, Power } from "lucide-react"; */

export default function ProvisionamentoPage() {
  return (
    <main className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1">
        <header className="p-4 border-b border-border">
          <SearchBar />
        </header>
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Provisionamento</h1>
            <p className="text-muted-foreground">Gestão de recursos e infraestrutura</p>
          </div>

          {/* Resource Stats */}
         {/*  <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-xl shadow-soft p-6">
              <div className="text-muted-foreground text-sm mb-2">Servidores Ativos</div>
              <div className="text-3xl font-bold">24</div>
              <div className="text-xs text-success font-semibold">98.5% uptime</div>
            </div>
            <div className="bg-card rounded-xl shadow-soft p-6">
              <div className="text-muted-foreground text-sm mb-2">CPU Usage</div>
              <div className="text-3xl font-bold">65%</div>
              <div className="text-xs text-warning font-semibold">+5% última hora</div>
            </div>
            <div className="bg-card rounded-xl shadow-soft p-6">
              <div className="text-muted-foreground text-sm mb-2">Memória Disponível</div>
              <div className="text-3xl font-bold">128GB</div>
              <div className="text-xs text-success font-semibold">45% livre</div>
            </div>
            <div className="bg-card rounded-xl shadow-soft p-6">
              <div className="text-muted-foreground text-sm mb-2">Storage</div>
              <div className="text-3xl font-bold">4.2TB</div>
              <div className="text-xs text-warning font-semibold">75% usado</div>
            </div>
          </div> */}

          {/* Provisioning Actions */}
      {/*     <div className="grid grid-cols-3 gap-6">
            {[
              {
                icon: Server,
                title: "Servidores",
                description: "Gestão de servidores virtuais e físicos",
                status: "24 ativos",
              },
              {
                icon: HardDrive,
                title: "Storage",
                description: "Gerenciamento de armazenamento",
                status: "4.2TB total",
              },
              {
                icon: Cpu,
                title: "Processamento",
                description: "Recursos de computação",
                status: "65% utilização",
              },
              {
                icon: Network,
                title: "Rede",
                description: "Configuração de rede e DNS",
                status: "Operacional",
              },
              {
                icon: Network,
                title: "Memória",
                description: "Gestão de memória RAM",
                status: "128GB total",
              },
              {
                icon: Power,
                title: "Energia",
                description: "Monitoramento de energia",
                status: "Redundante",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-card rounded-xl shadow-soft p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{item.title}</h3>
                        <div className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                          {item.status}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                      <button className="mt-4 w-full py-2 text-sm text-center border border-border rounded-lg hover:bg-muted transition-colors">
                        Gerenciar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div> */}
        </div>
      </div>
    </main>
  );
}