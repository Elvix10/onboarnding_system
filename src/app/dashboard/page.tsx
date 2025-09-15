"use client";
import { Users, Building2, Timer, Package2, ShieldCheck } from "lucide-react";
import { ActivityFeed } from "@/components/ActivityFeed";
import { ChartCard } from "@/components/ChartCard";
import { SearchBar } from "@/components/SearchBar";
import { StatsCard } from "@/components/StatsCard";
import Sidebar from "@/components/Sidebar";
import { useEmployeeStore } from "@/stores/employeeStore";
import { useDepartmentStore } from "@/stores/departmentStore";

const stats = [
  {
    title: "Total de Funcionários",
    value: 40,
    trend: "+",
    trendValue: "Funcionários ativos",
    icon: Users,
  },
  {
    title: "Departamentos",
    value: 50,
    trend: "+",
    trendValue: "Departamentos ativos",
    icon: Building2,
  },
  {
    title: "Solicitações",
    value: "0",
    trend: "+",
    trendValue: "Em andamento",
    icon: Timer,
  },
  {
    title: "Provisionamentos",
    value: "0",
    trend: "+",
    trendValue: "Pendentes",
    icon: Package2,
  },
  {
    title: "Aprovações",
    value: "0",
    trend: "+",
    trendValue: "Aguardando",
    icon: ShieldCheck,
  },
];

  // Convert employee data to activity feed format




export default function DashboardPage() {

      const employeeActivities = useEmployeeStore((state) => state.employees)
    .slice(0, 5)
    .map((employee) => ({
      user: { name: employee.fullName, initials: employee.fullName.split(" ").map(n => n[0]).join("") },
      type: "employee" as const,
      description: "Novo funcionário",
      details: "Aguardando departamento",
      timestamp: new Date(employee.createdAt).toLocaleDateString(),
    }));

  const recentActivities = employeeActivities;
  const employeeCount = useEmployeeStore((state) => state.employees.length);
  const departmentCount = useDepartmentStore((state) => state.departments.length);
  
  const stats = [
    {
      title: "Total de Funcionários",
      value: employeeCount.toString(),
      trend: "+",
      trendValue: "Funcionários ativos",
      icon: Users,
    },
    {
      title: "Departamentos",
      value: departmentCount.toString(),
      trend: "+",
      trendValue: "Departamentos ativos",
      icon: Building2,
    },
    {
      title: "Solicitações",
      value: "0",
      trend: "+",
      trendValue: "Em andamento",
      icon: Timer,
    },
    {
      title: "Provisionamentos",
      value: "0",
      trend: "+",
      trendValue: "Pendentes",
      icon: Package2,
    },
    {
      title: "Aprovações",
      value: "0",
      trend: "+",
      trendValue: "Aguardando",
      icon: ShieldCheck,
    },
  ];
  return (
    <main className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1">
        <header className="p-4 border-b border-border">
          <SearchBar />
        </header>
        <section className="p-8">
          <div className="bg-gradient-to-tr from-primary to-blue-600 rounded-xl p-6 mb-6 text-white flex items-center justify-between shadow-soft">
            <div>
              <h1 className="text-2xl font-bold mb-2">Sistema de Onboarding</h1>
              <p className="text-lg">Gerencie o processo de onboarding de funcionários de forma eficiente</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 mb-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            <ChartCard
              title="Distribuição por Departamento"
              description="Acompanhamento mensal da redução da inadimplência"
            >
              <span className="text-success font-bold">Gráfico aqui</span>
            </ChartCard>
            <div className="col-span-1">
              <ActivityFeed activities={recentActivities} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}