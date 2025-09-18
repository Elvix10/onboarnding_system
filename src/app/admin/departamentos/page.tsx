'use client'

import { Search, MoreHorizontal, ArrowUpDown } from "lucide-react"
import { SearchBar } from "@/components/SearchBar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDepartmentStore } from "@/stores/departmentStore"
import { useEmployeeStore } from "@/stores/employeeStore"
import { DepartmentDialog } from "@/components/dialog/DepartmentDialog";

export default function DepartamentosPage() {
  const { departments, totalDepartments, filters, setFilters, deleteDepartment } = useDepartmentStore();
  const { employees } = useEmployeeStore();
  
  const employeesByDepartment = departments.map(dept => ({
    ...dept,
    employeeCount: employees.filter(emp => emp.departmentId === dept.id).length
  }));
  
  return (
    <>
      <header className="p-4 border-b border-border">
        <SearchBar />
      </header>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Gestão de Departamentos</h1>
            <p className="text-muted-foreground">Gerencie os departamentos da instituição</p>
          </div>
          <DepartmentDialog />
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-card rounded-xl shadow-soft p-6">
            <div className="text-muted-foreground text-sm mb-2">Total de Departamentos</div>
            <div className="text-3xl font-bold">{totalDepartments}</div>
            <div className="text-xs text-success font-semibold">+2 este mês</div>
          </div>
          <div className="bg-card rounded-xl shadow-soft p-6">
            <div className="text-muted-foreground text-sm mb-2">Funcionários Alocados</div>
            <div className="text-3xl font-bold">180</div>
            <div className="text-xs text-success font-semibold">73% do total</div>
          </div>
          <div className="bg-card rounded-xl shadow-soft p-6">
            <div className="text-muted-foreground text-sm mb-2">Média por Departamento</div>
            <div className="text-3xl font-bold">22</div>
            <div className="text-xs text-muted-foreground">Funcionários</div>
          </div>
          <div className="bg-card rounded-xl shadow-soft p-6">
            <div className="text-muted-foreground text-sm mb-2">Departamentos Ativos</div>
            <div className="text-3xl font-bold">100%</div>
            <div className="text-xs text-success font-semibold">Todos operacionais</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl shadow-soft">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Funcionários</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeesByDepartment.map((department) => (
                <TableRow key={department.id}>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.description}</TableCell>
                  <TableCell>{department.employeeCount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DepartmentDialog
                          mode="edit"
                          departmentId={department.id}
                          trigger={
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              Editar
                            </DropdownMenuItem>
                          }
                        />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => deleteDepartment(department.id)}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}