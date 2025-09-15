import { create } from 'zustand'

interface Employee {
  id: string
  fullName: string
  personalEmail: string
  phoneNumber: string
  departmentId: string
  departmentName: string
  corporateEmailSuggestion1: string
  corporateEmailSuggestion2: string
  createdAt: Date
  updatedAt: Date
}

interface EmployeeFilters {
  search: string
  department: string | null
}

interface EmployeeStore {
  employees: Employee[]
  filters: EmployeeFilters
  isLoading: boolean
  totalEmployees: number
  // Actions
  setFilters: (filters: Partial<EmployeeFilters>) => void
  addEmployee: (employee: Employee) => void
  updateEmployee: (id: string, employee: Partial<Employee>) => void
  deleteEmployee: (id: string) => void
  setEmployees: (employees: Employee[]) => void
}

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  filters: {
    search: '',
    department: null,
  },
  isLoading: false,
  totalEmployees: 0,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),

  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
      totalEmployees: state.totalEmployees + 1,
    })),

  updateEmployee: (id, updatedFields) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedFields } : emp
      ),
    })),

  deleteEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
      totalEmployees: state.totalEmployees - 1,
    })),

  setEmployees: (employees) =>
    set(() => ({
      employees,
      totalEmployees: employees.length,
    })),
}))