import { Home, Users, Building2, Wrench, Package2, MapPin, Settings } from "lucide-react";

export interface SidebarItem {
  label: string;
  path: string;
  icon: React.ComponentType;
}

export const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    label: "Funcionarios",
    path: "/funcionarios",
    icon: Users,
  },
  {
    label: "Departamentos",
    path: "/departamentos",
    icon: Building2,
  },
  {
    label: "Ferramentas",
    path: "/ferramentas",
    icon: Wrench,
  },
  {
    label: "Provisionamento",
    path: "/provisionamento",
    icon: Package2,
  },
  {
    label: "Endereços",
    path: "/enderecos",
    icon: MapPin,
  },
  {
    label: "Configurações",
    path: "/configuracoes",
    icon: Settings,
  },
];