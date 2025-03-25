import * as appointmentRepository from '../repository/appointmentRepository'

export function getAllAppointments() {
  return appointmentRepository.getAllAppointments()
}

export function getAppointmentById(id: number) {
  return appointmentRepository.getAppointmentById(id)
}

export function getAppointmentByStudentId(studentId: number) {
  return appointmentRepository.getAppointmentByStudentId(studentId)
}

export function getAppointmentByAdvisorId(advisorId: number) {
  return appointmentRepository.getAppointmentByAdvisorId(advisorId)
}

export function createAppointment(appointment: any) {
  return appointmentRepository.createAppointment(appointment)
}

export function confirmAppointment(id: number) {
  return appointmentRepository.confirmAppointment(id)
}

export function cancelAppointment(id: number) {
  return appointmentRepository.cancelAppointment(id)
}

export function deleteAppointment(id: number) {
  return appointmentRepository.deleteAppointment(id)
}

export function updateAppointment(id: number, appointment: any) {
  return appointmentRepository.updateAppointment(id, appointment)
}
