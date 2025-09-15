
'use client'
import { Search, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
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
import { EmployeeDialog } from "@/components/dialog/EmployeeDialog";


export default function FuncionariosPage() {
  const { employees, totalEmployees, filters, setFilters, deleteEmployee } = useEmployeeStore();
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
              <h1 className="text-2xl font-bold">Gestão de Funcionários</h1>
              <p className="text-muted-foreground">Gerencie os funcionários da instituição</p>
            </div>
            <EmployeeDialog />
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-card rounded-xl shadow-soft p-6">
              <div className="text-muted-foreground text-sm mb-2">Total de Funcionários</div>
              <div className="text-3xl font-bold">245</div>
              <div className="text-xs text-success font-semibold">+5 este mês</div>
            </div>
            <div className="bg-card rounded-xl shadow-soft p-6">
              <div className="text-muted-foreground text-sm mb-2">Departamentos</div>
              <div className="text-3xl font-bold">12</div>
              <div className="text-xs text-muted-foreground">Ativos</div>
            </div>
            <div className="bg-card rounded-xl shadow-soft p-6">
              <div className="text-muted-foreground text-sm mb-2">Novos Funcionários</div>
              <div className="text-3xl font-bold">8</div>
              <div className="text-xs text-success font-semibold">Últimos 30 dias</div>
            </div>
            <div className="bg-card rounded-xl shadow-soft p-6">
              <div className="text-muted-foreground text-sm mb-2">Taxa de Retenção</div>
              <div className="text-3xl font-bold">94%</div>
              <div className="text-xs text-success font-semibold">+2% vs ano anterior</div>
            </div>
          </div>

          {/* Employees Table */}
          <div className="bg-card rounded-xl shadow-soft">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Buscar funcionários..."
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
                    <TableHead>Email Pessoal</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Email Corporativo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="font-medium">{employee.fullName}</div>
                        <div className="text-sm text-muted-foreground">ID: #{employee.id}</div>
                      </TableCell>
                      <TableCell>{employee.personalEmail}</TableCell>
                      <TableCell>{employee.phoneNumber}</TableCell>
                      <TableCell>
                        <span className="bg-accent px-2 py-1 rounded-full text-sm font-medium">
                          {employee.departmentName}
                        </span>
                      </TableCell>
                      <TableCell>{employee.corporateEmailSuggestion1}</TableCell>
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
                              onClick={() => deleteEmployee(employee.id)}
                            >
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">João Santos</div>
                      <div className="text-sm text-muted-foreground">ID: #002</div>
                    </TableCell>
                    <TableCell>joao.santos@email.com</TableCell>
                    <TableCell>(11) 98765-1234</TableCell>
                    <TableCell>
                      <span className="bg-accent px-2 py-1 rounded-full text-sm font-medium">
                        RH
                      </span>
                    </TableCell>
                    <TableCell>joao.santos@yolobank.com</TableCell>
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
                          <DropdownMenuItem className="text-destructive">
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Mostrando {employees.length} de {totalEmployees} funcionários
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