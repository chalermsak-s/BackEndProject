import type { Admin } from './admin'
import type { Student } from './student'
import type { Advisor } from './advisor'
import type { UserRole } from './userRole'
import type { Role } from './role'
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
