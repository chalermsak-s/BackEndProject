import type { Appointment } from './appointment'
export interface StatusAppointment {
  id: number
  status: string
  appointments: Appointment[]
}
