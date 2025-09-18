'use client'
import { Search, MoreHorizontal } from "lucide-react";
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
import { DeviceDialog } from "@/components/dialog/DeviceDialog";
import { useDeviceStore } from "@/stores/deviceStore";

export default function DispositivosPage() {
  const { devices, totalDevices, deleteDevice } = useDeviceStore();

  // Calculate statistics
  const deviceTypes = devices.reduce((acc, device) => {
    acc[device.type] = (acc[device.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate new devices (added in the last week)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newDevices = devices.filter(d => new Date(d.createdAt) > oneWeekAgo);

  return (
    <>
      <header className="p-4 border-b border-border">
        <SearchBar />
      </header>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Gestão de Dispositivos</h1>
            <p className="text-muted-foreground">Gerencie os dispositivos da instituição</p>
          </div>
          <DeviceDialog />
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-card rounded-xl shadow-soft p-6">
            <div className="text-muted-foreground text-sm mb-2">Total de Dispositivos</div>
            <div className="text-3xl font-bold">{totalDevices}</div>
            <div className="text-xs text-success font-semibold">
              +{newDevices.length} esta semana
            </div>
          </div>
          <div className="bg-card rounded-xl shadow-soft p-6">
            <div className="text-muted-foreground text-sm mb-2">Laptops</div>
            <div className="text-3xl font-bold">{deviceTypes['LAPTOP'] || 0}</div>
            <div className="text-xs text-muted-foreground">Ativos</div>
          </div>
          <div className="bg-card rounded-xl shadow-soft p-6">
            <div className="text-muted-foreground text-sm mb-2">Monitores</div>
            <div className="text-3xl font-bold">{deviceTypes['MONITOR'] || 0}</div>
            <div className="text-xs text-muted-foreground">Ativos</div>
          </div>
          <div className="bg-card rounded-xl shadow-soft p-6">
            <div className="text-muted-foreground text-sm mb-2">Acessórios</div>
            <div className="text-3xl font-bold">
              {(deviceTypes['PHONE'] || 0) + (deviceTypes['ACCESSORY'] || 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl shadow-soft">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nome</TableHead>
                <TableHead className="w-[150px]">Tipo</TableHead>
                <TableHead className="w-[300px]">Descrição</TableHead>
                <TableHead className="w-[150px]">Data de Cadastro</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-medium">{device.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {device.type.charAt(0) + device.type.slice(1).toLowerCase()}
                    </div>
                  </TableCell>
                  <TableCell>{device.description}</TableCell>
                  <TableCell>{new Date(device.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DeviceDialog
                          mode="edit"
                          deviceId={device.id}
                          trigger={
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              Editar
                            </DropdownMenuItem>
                          }
                        />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => deleteDevice(device.id)}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {devices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                    Nenhum dispositivo encontrado
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