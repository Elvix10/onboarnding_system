import { create } from 'zustand'

interface Department {
  id: string
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}

interface DepartmentFilters {
  search: string
}

interface DepartmentStore {
  departments: Department[]
  filters: DepartmentFilters
  isLoading: boolean
  totalDepartments: number
  // Actions
  setFilters: (filters: Partial<DepartmentFilters>) => void
  addDepartment: (department: Department) => void
  updateDepartment: (id: string, department: Partial<Department>) => void
  deleteDepartment: (id: string) => void
  setDepartments: (departments: Department[]) => void
}

export const useDepartmentStore = create<DepartmentStore>((set) => ({
  departments: [],
  filters: {
    search: '',
  },
  isLoading: false,
  totalDepartments: 0,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),

  addDepartment: (department) =>
    set((state) => ({
      departments: [...state.departments, department],
      totalDepartments: state.totalDepartments + 1,
    })),

  updateDepartment: (id, updatedFields) =>
    set((state) => ({
      departments: state.departments.map((dept) =>
        dept.id === id ? { ...dept, ...updatedFields } : dept
      ),
    })),

  deleteDepartment: (id) =>
    set((state) => ({
      departments: state.departments.filter((dept) => dept.id !== id),
      totalDepartments: state.totalDepartments - 1,
    })),

  setDepartments: (departments) =>
    set(() => ({
      departments,
      totalDepartments: departments.length,
    })),
}))