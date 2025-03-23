import { Feedback } from './feedback'
export interface Responder {
  id: number
  responder: string
  feedbacks: Feedback[]
}
