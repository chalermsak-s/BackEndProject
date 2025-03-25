import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export function getAllAppointments() {
  return prisma.appointment.findMany({
    select: {
      id: true,
      topic: true,
      description: true,
      requested_date: true,
      appointment_request_date: true,
      status_appointment_id: true,
      student_confirmation: true,
      status: {
        select: {
          status: true,
        },
      },
      student: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
      advisor: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },orderBy:{
      requested_date: 'desc',
    }
  })
}

export function getAppointmentById(id: number) {
  return prisma.appointment.findUnique({
    where: { id },
    select: {
      id: true,
      topic: true,
      description: true,
      requested_date: true,
      appointment_request_date: true,
      status_appointment_id: true,
      student_confirmation: true,
      status: {
        select: {
          status: true,
        },
      },
      student: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
      advisor: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  })
}

export function getAppointmentByStudentId(studentId: number) {
  return prisma.appointment.findMany({
    where: { student_id: studentId },
    select: {
      id: true,
      topic: true,
      description: true,
      requested_date: true,
      appointment_request_date: true,
      status_appointment_id: true,
      student_confirmation: true,
      status: {
        select: {
          status: true,
        },
      },
      student: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
      advisor: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  })
}
export function getAppointmentByAdvisorId(advisorId: number) {
  return prisma.appointment.findMany({
    where: { advisor_id: advisorId },
    select: {
      id: true,
      topic: true,
      description: true,
      requested_date: true,
      appointment_request_date: true,
      status_appointment_id: true,
      student_confirmation: true,
      status: {
        select: {
          status: true,
        },
      },
      student: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
      advisor: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
  })
}

export function createAppointment(appointment: any) {
  return prisma.appointment.create({
    data: appointment,
  })
}

export function updateAppointment(id: number, appointment: any) {
  return prisma.appointment.update({
    where: { id },
    data: appointment,
  })
}

export function confirmAppointment(id: number) {
  return prisma.appointment.update({
    where: { id },
    data: { status_appointment_id: 2 },
  })
}

export function cancelAppointment(id: number) {
  return prisma.appointment.update({
    where: { id },
    data: { status_appointment_id: 3 },
  })
}

export function deleteAppointment(id: number) {
  return prisma.appointment.delete({
    where: { id },
  })
}