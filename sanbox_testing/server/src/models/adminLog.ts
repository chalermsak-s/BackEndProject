import type { Student } from './student'
import type { Advisor } from './advisor'
import type { Admin } from './admin'
export interface AdminLog {
  id: number
  action?: string | null
  log_date: Date
  student_id?: number | null
  advisor_id?: number | null
  admin_id?: number | null
  student?: Student | null
  advisor?: Advisor | null
  admin?: Admin | null
}
