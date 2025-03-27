import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export function getAllDeegrees() {
  return prisma.degree.findMany()
}

export function getDeegreeById(id: number) {
  return prisma.degree.findUnique({
    where: { id },
  })
}