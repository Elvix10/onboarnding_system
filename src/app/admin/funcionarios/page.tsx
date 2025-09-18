'use client'
import { Search, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEmployeeStore } from "@/stores/employeeStore";
import { useDepartmentStore } from "@/stores/departmentStore";
import { EmployeeDialog } from "@/components/dialog/EmployeeDialog";

export default function FuncionariosPage() {
  const { employees, totalEmployees, filters, setFilters, deleteEmployee } = useEmployeeStore();
  const { departments } = useDepartmentStore();

  // Calculate new employees (added in the last week)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newEmployees = employees.filter(e => e.createdAt > oneWeekAgo);
  
  // Calculate new employees this month
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const newEmployeesThisMonth = employees.filter(e => e.createdAt > oneMonthAgo);

  return (
    <>
      <header className="p-4 border-b border-border">
        <SearchBar />
      </header>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Gestão de Funcionários</h1>
            <p className="text-muted-foreground">Gerencie os funcionários da instituição</p>
          </div>
          <EmployeeDialog />
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-card rounded-xl shadow-soft p-6">
            <div className="text-muted-foreground text-sm mb-2">Total de Funcionários</div>
            <div className="text-3xl font-bold">{totalEmployees}</div>
            <div className="text-xs text-success font-semibold">
              +{newEmployeesThisMonth.length} este mês
            </div>
          </div>
          <div className="bg-card rounded-xl shadow-soft p-6">
            <div className="text-muted-foreground text-sm mb-2">Novos Funcionários</div>
            <div className="text-3xl font-bold">{newEmployees.length}</div>
            <div className="text-xs text-success font-semibold">esta semana</div>
          </div>
          <div className="bg-card rounded-xl shadow-soft p-6">
            <div className="text-muted-foreground text-sm mb-2">Departamentos</div>
            <div className="text-3xl font-bold">{departments.length}</div>
            <div className="text-xs text-muted-foreground">Ativos</div>
          </div>
          <div className="bg-card rounded-xl shadow-soft p-6">
            <div className="text-muted-foreground text-sm mb-2">Taxa de Retenção</div>
            <div className="text-3xl font-bold">97%</div>
            <div className="text-xs text-success font-semibold">+2% vs mês anterior</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl shadow-soft">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nome</TableHead>
                <TableHead className="w-[200px]">Email Pessoal</TableHead>
                <TableHead className="w-[200px]">Email Corporativo</TableHead>
                <TableHead className="w-[150px]">Departamento</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => {
                const employeeDepartment = departments.find(d => d.id === employee.departmentId);
                return (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.fullName}</TableCell>
                    <TableCell>{employee.personalEmail}</TableCell>
                    <TableCell>{employee.corporateEmailSuggestion1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {employeeDepartment?.name || "Não definido"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <EmployeeDialog
                            mode="edit"
                            employeeId={employee.id}
                            trigger={
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                Editar
                              </DropdownMenuItem>
                            }
                          />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => deleteEmployee(employee.id)}
                          >
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
              {employees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                    Nenhum funcionário encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}