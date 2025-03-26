import type { Student } from './student'
import type { Advisor } from './advisor'
import type { StatusAppointment } from './statusAppointment'
import type { Admin } from './admin'
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
