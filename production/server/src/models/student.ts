import type { Department } from './department'
import type { Degree } from './degree'
import type { User } from './user'
import type { Appointment } from './appointment'
import type { Feedback } from './feedback'
import type { AdminLog } from './adminLog'

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
}

export interface PageStudent {
  count: number
  students: Student[]
}

export interface InStudent {
  username: string
  password: string
  student_id_card: string
  first_name: string
  last_name: string
  picture: string
  department_id: number
  degree_id: number
  advisor_id: number
}
