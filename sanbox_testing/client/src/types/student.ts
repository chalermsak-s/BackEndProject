export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  major: string;
  year: number;
  status: StudentStatus;
  advisorId: string;
  advisorName: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum StudentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  GRADUATED = 'GRADUATED',
  ON_LEAVE = 'ON_LEAVE'
}

export interface StudentDashboardStats {
  totalCredits: number;
  completedCredits: number;
  remainingCredits: number;
  currentGPA: number;
  attendanceRate: number;
  upcomingEvents: Event[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: EventType;
  location?: string;
  isRequired: boolean;
}

export enum EventType {
  CLASS = 'CLASS',
  EXAM = 'EXAM',
  MEETING = 'MEETING',
  ASSIGNMENT = 'ASSIGNMENT',
  OTHER = 'OTHER'
}

export interface StudentFilters {
  search?: string;
  major?: string;
  year?: number;
  status?: StudentStatus;
  page?: number;
  limit?: number;
}

export interface StudentResponse {
  success: boolean;
  data: Student | Student[];
  message?: string;
  error?: string;
} 