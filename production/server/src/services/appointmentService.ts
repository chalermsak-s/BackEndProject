import * as appointmentRepository from '../repository/appointmentRepository'

export function getAllAppointments() {
  return appointmentRepository.getAllAppointments()
}

export function getAppointmentById(id: number) {
  return appointmentRepository.getAppointmentById(id)
}
