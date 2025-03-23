export enum DepartmentType {
  ACADEMIC = 'ACADEMIC',
  ADMINISTRATIVE = 'ADMINISTRATIVE',
  RESEARCH = 'RESEARCH',
  SUPPORT = 'SUPPORT'
}

export interface DepartmentHead {
  id: string
  name: string
  title: string
  email: string
  phone: string
}

export interface Department {
  id: string
  name: string
  code: string
  type: DepartmentType
  description: string
  head: DepartmentHead
  facultyCount: number
  staffCount: number
  studentCount: number
  budget: number
  location: string
  contactInfo: {
    email: string
    phone: string
    address: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface DepartmentStats {
  totalDepartments: number
  departmentsByType: Record<DepartmentType, number>
  totalFaculty: number
  totalStaff: number
  totalStudents: number
  totalBudget: number
}

export interface DepartmentFilters {
  type?: DepartmentType
  search?: string
  minBudget?: number
  maxBudget?: number
  minFaculty?: number
  maxFaculty?: number
}

export interface DepartmentResponse {
  data: Department[]
  total: number
  page: number
  limit: number
  filters: DepartmentFilters
} 