'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { employeeFormSchema, type EmployeeFormValues } from "@/schemas/employeeSchema"
import { useEmployeeStore } from "@/stores/employeeStore"
import { useDepartmentStore } from "@/stores/departmentStore"
import { useState } from "react"

interface EmployeeDialogProps {
  employeeId?: string;
  mode?: "create" | "edit";
  trigger?: React.ReactNode;
}

export function EmployeeDialog({ employeeId, mode = "create", trigger }: EmployeeDialogProps) {
  const [open, setOpen] = useState(false);
  const { departments } = useDepartmentStore();
  const { addEmployee, updateEmployee, employees } = useEmployeeStore();
  
  const employee = employeeId ? employees.find(e => e.id === employeeId) : undefined;

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      fullName: employee?.fullName || "",
      personalEmail: employee?.personalEmail || "",
      phoneNumber: employee?.phoneNumber || "",
      departmentId: employee?.departmentId || "",
    },
  });

  function generateCorporateEmail(fullName: string) {
    const names = fullName.toLowerCase().split(' ');
    const firstName = names[0];
    const lastName = names[names.length - 1];
    return {
      suggestion1: `${firstName}.${lastName}@yolobank.com`,
      suggestion2: `${firstName}${lastName}@yolobank.com`,
    };
  }

  function onSubmit(data: EmployeeFormValues) {
    const corporateEmails = generateCorporateEmail(data.fullName);
    const department = departments.find(d => d.id === data.departmentId);

    if (mode === "edit" && employeeId) {
      updateEmployee(employeeId, {
        ...data,
        departmentName: department?.name || "Não definido",
        corporateEmailSuggestion1: corporateEmails.suggestion1,
        corporateEmailSuggestion2: corporateEmails.suggestion2,
        updatedAt: new Date(),
      });
    } else {
      addEmployee({
        id: Math.random().toString(36).substring(7),
        ...data,
        departmentName: department?.name || "Não definido",
        corporateEmailSuggestion1: corporateEmails.suggestion1,
        corporateEmailSuggestion2: corporateEmails.suggestion2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary text-primary-foreground hover:bg-primary-light">
            {mode === "create" ? (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Funcionário
              </>
            ) : "Editar"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Adicionar Funcionário" : "Editar Funcionário"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="João da Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Pessoal</FormLabel>
                  <FormControl>
                    <Input placeholder="joao.silva@email.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(99) 99999-9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um departamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem key={department.id} value={department.id}>
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {mode === "create" ? "Criar" : "Salvar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}