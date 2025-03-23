import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export function getAllAdvisors() {
  return prisma.advisor.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      academic_position: true,
      department_id: true,
      department: {
        select: {
          department_name: true,
        },
      },
    },
  })
}

export function getAdvisorById(id: number) {
  return prisma.student.findUnique({
    where: { id },
  })
}
