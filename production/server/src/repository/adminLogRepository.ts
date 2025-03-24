import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export function getAllAdvisors() {
  return prisma.admin_log.findMany({
    select: {
      id: true,
      action: true,
      log_date: true,
      student_id: true,
      advisor_id: true,
      admin_id: true,
      admin:{
        select:{
          name: true,
        }
      },
      student:{
        select:{
          student_id_card: true,
          first_name: true,
          last_name: true,
        }
      },
      advisor:{
        select:{
          first_name: true,
          last_name: true,
        }
      }
    },
  })
}

export function getAdvisorById(id: number) {
  return prisma.advisor.findUnique({
    where: { id },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      academic_position: true,
      department_id: true,
      department: {
        select: {
          department_name: true,
          initials: true,
        },
      },
    },
  })
}
