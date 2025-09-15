'use client'

import { Search, MoreHorizontal, ArrowUpDown } from "lucide-react"
import { SearchBar } from "@/components/SearchBar"
import Sidebar from "@/components/Sidebar"
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
import { DepartmentDialog } from "@/components/dialog/DepartmentDialog";

export default function DepartamentosPage() {
  const { departments, totalDepartments, filters, setFilters, deleteDepartment } = useDepartmentStore();
  return (
    <main className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1">
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
              <div className="text-muted-foreground text-sm mb-2">Funcionários</div>
              <div className="text-3xl font-bold">245</div>
              <div className="text-xs text-muted-foreground">Distribuídos</div>
            </div>
            <div className="bg-card rounded-xl shadow-soft p-6">
              <div className="text-muted-foreground text-sm mb-2">Média por Departamento</div>
              <div className="text-3xl font-bold">20</div>
              <div className="text-xs text-warning font-semibold">+5% vs. meta</div>
            </div>
            <div className="bg-card rounded-xl shadow-soft p-6">
              <div className="text-muted-foreground text-sm mb-2">Custo Total</div>
              <div className="text-3xl font-bold">R$ 850k</div>
              <div className="text-xs text-success font-semibold">-2% vs. orçamento</div>
            </div>
          </div>

          {/* Departments Table */}
          <div className="bg-card rounded-xl shadow-soft">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Buscar departamentos..."
                  className="bg-transparent border-none text-sm placeholder:text-muted-foreground focus:outline-none"
                  value={filters.search}
                  onChange={(e) => setFilters({ search: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                {/* Add filters here */}
              </div>
            </div>
            <div className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" className="pl-0 font-medium">
                        Nome
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Funcionários</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell>
                        <div className="font-medium">{department.name}</div>
                        <div className="text-sm text-muted-foreground">ID: #{department.id}</div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="truncate">{department.description}</p>
                      </TableCell>
                      <TableCell>
                        <span className="bg-accent px-2 py-1 rounded-full text-sm font-medium">
                          25
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(department.createdAt).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
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
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Mostrando {departments.length} de {totalDepartments} departamentos
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm">
                    Próxima
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}