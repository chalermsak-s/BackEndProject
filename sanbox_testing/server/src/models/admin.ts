import type { User } from './user'
import type { Advisor } from './advisor'
import type { AdminLog } from './adminLog'
import type { Appointment } from './appointment'
import type { Feedback } from './feedback'
export interface Admin {
  id: number;
  name: string;
  users: User[];
  advisors: Advisor[];
  admin_log: AdminLog[];
  appointment: Appointment[];
  feedback: Feedback[];
}