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
