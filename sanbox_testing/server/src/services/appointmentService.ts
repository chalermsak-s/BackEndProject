import * as appointmentRepository from '../repository/appointmentRepository'
import type { InAppoinment } from '../models/appointment'

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

export function confirmAppointmentAdvisor(id: number) {
  return appointmentRepository.confirmAppointmentAdvisor(id)
}

export function cancelAppointmentAdvisor(id: number) {
  return appointmentRepository.cancelAppointmentAdvisor(id)
}

export function deleteAppointment(id: number) {
  return appointmentRepository.deleteAppointment(id)
}

export function updateAppointment(id: number, appointment: any) {
  return appointmentRepository.updateAppointment(id, appointment)
}

export function AddAppointmentByStudent(newAppoinment: InAppoinment) {
  const dataAppoinment = {
    topic: newAppoinment.topic,
    description: newAppoinment.description,
    requested_date : new Date(),
    appointment_request_date: newAppoinment.appointment_request_date,
    student_confirmation: newAppoinment.student_confirmation,
    student_id: newAppoinment.student_id,
    advisor_id: newAppoinment.advisor_id,
    status_appointment_id: newAppoinment.status_appointment_id
  };
  return appointmentRepository.AddAppointmentByStudent(dataAppoinment)
}

export function getAppointment2ByAdvisorId(id: number) {
  return appointmentRepository.getAppointment2ByAdvisorId(id)
}

