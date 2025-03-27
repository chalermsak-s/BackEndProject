import { PrismaClient } from '@prisma/client'
import type { Department } from '../models/department'

const prisma = new PrismaClient()

export function getAllDepartments() {
  return prisma.department.findMany()
}

export function getDepartmentById(userId: number) {
  return prisma.department.findUnique({
    where: {
      id: userId
    },
  })
}

export function getDepartmentByName(departmentName: string) {
  return prisma.department.findMany({
    where: {
      department_name: {
        contains: departmentName
      },
    },
  });
}

export function addDepartment(newDepartment: Department) {
  return prisma.department.create({
    data: {
      initials: newDepartment.initials || '',
      department_name: newDepartment.department_name || ''
    },
  })
}

export async function updateDepartment(
  departmentId: number,
  updatedData: Partial<Department>
) {
  return await prisma.department.update({
    where: { id: departmentId },
    data: {
      initials: updatedData.initials,
      department_name: updatedData.department_name
    },
  })
}


