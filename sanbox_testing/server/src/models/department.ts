import type { Student } from "./student"
import type { Advisor } from "./advisor"
export interface Department {
  id: number
  initials: string | null
  department_name: string
  students: Student[]
  advisors: Advisor[]
}
