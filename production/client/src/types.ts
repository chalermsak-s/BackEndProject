export interface AcademicPosition {
  id: number
  academic_position_name: string
  advisors: Advisor[]
}
export interface Admin {
  id: number
  name: string
  users: User[]
  advisors: Advisor[]
  admin_log: AdminLog[]
  appointment: Appointment[]
  feedback: Feedback[]
}

export interface AdminLog {
  id: number
  action?: string
  log_date: Date
  student_id?: number
  advisor_id?: number
  admin_id?: number
  student?: Student
  advisor?: Advisor
  admin?: Admin
}

export interface Advisor {
  id: number
  first_name: string
  last_name: string
  picture?: string
  academic_position_id?: number
  department_id?: number
  admin_id?: number
  academic_position?: AcademicPosition
  department?: Department
  admin?: Admin
  users: User[]
  announcements: Announcement[]
  appointments: Appointment[]
  feedbacks: Feedback[]
  admin_logs: AdminLog[]
  students: Student[]
}

export interface AdvisorState {
  advisor: Advisor | null
}

export interface Announcement {
  id: number
  topic: string
  description?: string
  file?: string
  posted_date: Date
  advisor_id?: number
  advisor?: Advisor
}

export interface AnnouncementState {
  announcement: Announcement | null
}

export interface Appointment {
  id: number
  topic: string
  description?: string
  requested_date: Date
  appointment_request_date: Date
  student_confirmation: boolean
  student_id?: number
  advisor_id?: number
  status_appointment_id?: number
  admin_id?: number
  student?: Student
  advisor?: Advisor
  status?: StatusAppointment
  admin?: Admin
}

export interface AppointmentState {
  appointment: Appointment | null
}

export interface Degree {
  id: number
  degree_name: string
  students: Student[]
}

export interface Department {
  id: number
  initials: string | null
  department_name: string
  students: Student[]
  advisors: Advisor[]
}

export interface Feedback {
  id: number
  feedback: string
  timestamp: Date
  student_id?: number
  advisor_id?: number
  responder_id?: number
  admin_id?: number
  student?: Student
  advisor?: Advisor
  responder?: Responder
  admin?: Admin
}

export interface Responder {
  id: number
  responder: string
  feedbacks: Feedback[]
}

export enum Role {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  ADVISOR = 'ADVISOR',
}

export interface StatusAppointment {
  id: number
  status: string
  appointments: Appointment[]
}

export interface Student {
  id: number
  student_id_card: string
  first_name: string
  last_name: string
  picture: string | null
  department_id: number | null
  degree_id: number | null
  advisor_id: number | null
  department: Department | null
  degree: Degree | null
  users: User[]
  appointments: Appointment[]
  feedbacks: Feedback[]
  admin_logs: AdminLog[]
  advisor?: Advisor
}

export interface PageStudent {
  count: number
  students: Student[]
}

export interface User {
  id: number
  username: string
  password: string
  role: Role
  admin_id: number | null
  student_id: number | null
  advisor_id: number | null
  admin: Admin | null
  student: Student | null
  advisor: Advisor | null
  UserRole: UserRole | null
  userRoleId: number | null
}

export interface UserRole {
  id: number
  role_name: Role
  users: User[]
}

export interface StudentState {
  student: Student | null
}

export interface RegisterForm {
  username: string
  password: string
  student_id_card: string
  first_name: string
  last_name: string
  file: File | null
  department_id: string
  degree_id: string
  advisor_id: string
}

export interface RegisterAdvisor {
  username: string
  password: string
  first_name: string
  last_name: string
  file: File | null
  academic_position_id: number | null
  department_id: number | null
}

export interface MessageState {
  message: string;
}
