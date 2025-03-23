import type { Student } from "./student"
import type { Advisor } from "./advisor"
import type { Responder } from "./responder"
import type { Admin } from "./admin"
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
