import type { Advisor } from './advisor'
export interface AcademicPosition {
  id: number
  academic_position_name: string
  advisors: Advisor[]
}
