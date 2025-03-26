import type { AcademicPosition } from './academicPosition'
import type { Department } from './department'
import type { Admin } from './admin'
import type { User } from './user'
import type { Announcement } from './announcement'
import type { Appointment } from './appointment'
import type { Feedback } from './feedback'
import type { AdminLog } from './adminLog'
import type { Student } from './student'
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

export interface InAdvisor {
  username: string
  password: string
  first_name: string
  last_name: string
  picture?: string
  academic_position_id?: number
  department_id?: number
}
