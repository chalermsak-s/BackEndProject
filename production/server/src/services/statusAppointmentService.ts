import * as statusAppointmentRepository from '../repository/statusAppointmentRepository'

export function getAllStatusAppointments() {
  return statusAppointmentRepository.getAllStatusAppointments()
}

export function getgetAllStatusAppointmentsById(id: number) {
  return statusAppointmentRepository.getgetAllStatusAppointmentsById(id)
}