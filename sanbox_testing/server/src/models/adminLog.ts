import type { Student } from './student'
import type { Advisor } from './advisor'
import type { Admin } from './admin'
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
