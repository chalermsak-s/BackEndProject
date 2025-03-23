import type { Student } from './student'
export interface Degree {
  id: number
  degree_name: string
  students: Student[]
}
