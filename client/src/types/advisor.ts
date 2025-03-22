export interface Advisor {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  phoneNumber: string;
  students: Student[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  major: string;
  year: number;
  status: StudentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum StudentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  GRADUATED = 'GRADUATED',
  ON_LEAVE = 'ON_LEAVE'
}

export interface AdvisorDashboardStats {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  graduatedStudents: number;
  studentsOnLeave: number;
}

export interface AdvisorFilters {
  search?: string;
  department?: string;
  status?: StudentStatus;
  year?: number;
  page?: number;
  limit?: number;
}

export interface AdvisorResponse {
  success: boolean;
  data: Advisor | Advisor[];
  message?: string;
  error?: string;
} 