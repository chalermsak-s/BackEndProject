import type { User } from './user'
import type { Role } from './role'
export interface UserRole {
  id: number
  role_name: Role
  users: User[]
}
