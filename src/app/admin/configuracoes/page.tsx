import { SearchBar } from "@/components/SearchBar";
import { User, Bell, Shield, Database, Palette, Globe } from "lucide-react";

const settingSections = [
  {
    icon: User,
    title: "Perfil",
    description: "Configurações da sua conta",
    items: ["Informações pessoais", "Senha e segurança", "Preferências"],
  },
  {
    icon: Bell,
    title: "Notificações",
    description: "Gerencie suas notificações",
    items: ["Email", "Push", "In-app"],
  },
  {
    icon: Palette,
    title: "Aparência",
    description: "Personalize a interface",
    items: ["Tema", "Cores", "Fonte"],
  },
  {
    icon: Globe,
    title: "Regional",
    description: "Configurações regionais",
    items: ["Idioma", "Fuso horário", "Formato de data"],
  },
];

export default function ConfiguracoesPage() {
  return (
    <>
      <header className="p-4 border-b border-border">
        <SearchBar />
      </header>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {settingSections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx} className="bg-card rounded-xl shadow-soft p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{section.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {section.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors">
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
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