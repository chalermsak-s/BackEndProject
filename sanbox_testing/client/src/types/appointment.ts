export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW'
}

export enum AppointmentType {
  ACADEMIC = 'ACADEMIC',
  CAREER = 'CAREER',
  PERSONAL = 'PERSONAL',
  EMERGENCY = 'EMERGENCY'
}

export interface Participant {
  id: string
  name: string
  role: string
  email: string
}

export interface Appointment {
  id: string
  studentId: string
  advisorId: string
  type: AppointmentType
  status: AppointmentStatus
  title: string
  description: string
  startTime: Date
  endTime: Date
  location: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface AppointmentStats {
  totalAppointments: number
  appointmentsByStatus: Record<AppointmentStatus, number>
  appointmentsByType: Record<AppointmentType, number>
  upcomingAppointments: number
  completedAppointments: number
  cancellationRate: number
}

export interface AppointmentFilters {
  status?: AppointmentStatus
  type?: AppointmentType
  startDate?: Date
  endDate?: Date
  search?: string
}

export interface AppointmentResponse {
  data: Appointment[]
  total: number
  page: number
  limit: number
  filters: AppointmentFilters
} 