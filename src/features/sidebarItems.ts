import { Home, Users, Building2, Wrench, Package2, MapPin, Settings, Laptop, MonitorSmartphone } from "lucide-react";

export interface SidebarItem {
  label: string;
  path: string;
  icon: React.ComponentType;
}

export const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: Home,
  },
  {
    label: "Funcionarios",
    path: "/admin/funcionarios",
    icon: Users,
  },
  {
    label: "Departamentos",
    path: "/admin/departamentos",
    icon: Building2,
  },
  {
    label: "Dispositivos",
    path: "/admin/dispositivos",
    icon: Laptop,
  },
  {
    label: "Provisionamento",
    path: "/admin/provisionamento",
    icon: MonitorSmartphone,
  },
  {
    label: "Ferramentas",
    path: "/admin/ferramentas",
    icon: Wrench,
  },
  {
    label: "Endereços",
    path: "/admin/enderecos",
    icon: MapPin,
  },
  {
    label: "Configurações",
    path: "/admin/configuracoes",
    icon: Settings,
  },
];