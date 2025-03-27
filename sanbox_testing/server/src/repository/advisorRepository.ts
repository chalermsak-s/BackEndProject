import { PrismaClient } from '@prisma/client'
import type { InAdvisor } from '../models/advisor'
const prisma = new PrismaClient()

export function getAllAdvisors() {
  return prisma.advisor.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      picture: true,
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
  return prisma.advisor.findUnique({
    where: { id },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      picture: true,
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

export function getStudentByAdvisorById(id: number) {
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
      students: {
        select: {
          id: true,
          student_id_card: true,
          first_name: true,
          last_name: true,
          degree: {
            select: {
              degree_name: true,
            },
          },
          department: {
            select: {
              department_name: true,
            },
          },
        },
      },
    },
  })
}

export function getAdvisorIdByUserId(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      advisor_id: true,
    },
  })
}

export function addAdvisor(newAdvisor: InAdvisor) {
  return prisma.user.create({
    data: {
      username: newAdvisor.username,
      password: newAdvisor.password,
      user_role: {
        connect: {
          role_name: 'Advisor', // Replace "Student" with the actual role name or use an ID
        },
      },
      advisor: {
        create: {
          first_name: newAdvisor.first_name,
          last_name: newAdvisor.last_name,
          picture: newAdvisor.picture,
          academic_position_id: newAdvisor.academic_position_id,
          department_id: newAdvisor.department_id,
        },
      },
    },
    include: {
      advisor: true,
    },
  })
}
