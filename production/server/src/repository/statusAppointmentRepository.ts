import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export function getAllStatusAppointments() {
  return prisma.degree.findMany()
}

export function getgetAllStatusAppointmentsById(id: number) {
  return prisma.degree.findUnique({
    where: { id },
  })
}