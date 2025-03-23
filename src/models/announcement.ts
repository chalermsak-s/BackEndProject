import type { Advisor } from './advisor'
export interface Announcement {
  id: number
  topic: string
  description?: string
  file?: string
  posted_date: Date
  advisor_id?: number
  advisor?: Advisor
}
