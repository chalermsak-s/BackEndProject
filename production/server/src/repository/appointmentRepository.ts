import { PrismaClient } from '@prisma/client'
import type { InAppoinment } from '../models/appointment'
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
    },
    orderBy: {
      requested_date: 'desc',
    },
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
    orderBy: {
      appointment_request_date: 'desc',
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
    orderBy: {
      appointment_request_date: 'desc',
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

/* Student Confirm Start */
export function confirmAppointment(id: number) {
  return prisma.appointment.update({
    where: { id },
    data: {
      student_confirmation: true,
      status_appointment_id: 2,
    },
  })
}

export function cancelAppointment(id: number) {
  return prisma.appointment.update({
    where: { id },
    data: { status_appointment_id: 3 },
  })
}
/* Student Confirm End */

/* Advisor Confirm Strat */
export function confirmAppointmentAdvisor(id: number) {
  return prisma.appointment.update({
    where: { id },
    data: {
      status_appointment_id: 1
    },
  })
}

export function cancelAppointmentAdvisor(id: number) {
  return prisma.appointment.update({
    where: { id },
    data: { status_appointment_id: 3 },
  })
}
/* Advisor Confirm Strat */

export function deleteAppointment(id: number) {
  return prisma.appointment.delete({
    where: { id },
  })
}

export function AddAppointmentByStudent(newAppoinment: InAppoinment) {
  return prisma.appointment.create({
    data: {
      topic: newAppoinment.topic,
      description: newAppoinment.description,
      requested_date: new Date(),
      appointment_request_date: new Date(
        newAppoinment.appointment_request_date
      ).toISOString(),
      student_confirmation: Boolean(newAppoinment.student_confirmation),
      student_id: newAppoinment.student_id,
      advisor_id: newAppoinment.advisor_id,
      status_appointment_id: newAppoinment.status_appointment_id,
    },
  })
}

export function getAppointment2ByAdvisorId(id: number) {
  return prisma.appointment.findMany({
    where: { advisor_id: id },
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
