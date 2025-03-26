import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export function getAllAcademicPositions() {
  return prisma.academic_position.findMany()
}

export function getAcademicPositionById(id: number) {
  return prisma.academic_position.findUnique({
    where: { id },
  })
}