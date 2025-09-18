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
import { Textarea } from "@/components/ui/textarea"
import { departmentFormSchema, type DepartmentFormValues } from "@/schemas/departmentSchema"
import { useDepartmentStore } from "@/stores/departmentStore"
import { useState } from "react"

interface DepartmentDialogProps {
  departmentId?: string;
  mode?: "create" | "edit";
  trigger?: React.ReactNode;
}

export function DepartmentDialog({ departmentId, mode = "create", trigger }: DepartmentDialogProps) {
  const [open, setOpen] = useState(false);
  const { addDepartment, updateDepartment, departments } = useDepartmentStore();
  
  const department = departmentId ? departments.find(d => d.id === departmentId) : undefined;

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: department?.name || "",
      description: department?.description || "",
    },
  });

  function onSubmit(data: DepartmentFormValues) {
    if (mode === "edit" && departmentId) {
      updateDepartment(departmentId, {
        ...data,
        updatedAt: new Date(),
      });
    } else {
      addDepartment({
        id: Math.random().toString(36).substring(7),
        ...data,
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
                Adicionar Departamento
              </>
            ) : "Editar"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Adicionar Departamento" : "Editar Departamento"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Departamento</FormLabel>
                  <FormControl>
                    <Input placeholder="TI" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva as responsabilidades e objetivos do departamento..." 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2 pt-4">
              <DialogTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogTrigger>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}