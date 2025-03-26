import { PrismaClient } from '@prisma/client'
import type { PageStudent, InStudent } from '../models/student'

const prisma = new PrismaClient()

export function getAllStudents() {
  return prisma.student.findMany({
    select: {
      id: true,
      student_id_card: true,
      first_name: true,
      last_name: true,
      picture: true,
      department: true,
      degree: true,
      users: {
        select: {
          username: true,
        },
      },
      advisor: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
    },
  })
}

export function getStudentById(id: number) {
  return prisma.student.findUnique({
    where: { id },
    select: {
      id: true,
      student_id_card: true,
      first_name: true,
      last_name: true,
      picture: true,
      department: true,
      degree: true,
      users: {
        select: {
          username: true,
        },
      },
      advisor: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
    },
  })
}

export function addStudent(newStudent: InStudent) {
  return prisma.user.create({
    data: {
      username: newStudent.username,
      password: newStudent.password,
      user_role: {
        connect: {
          role_name: 'Student', // Replace "Student" with the actual role name or use an ID
        },
      },
      student: {
        create: {
          student_id_card: newStudent.student_id_card,
          first_name: newStudent.first_name,
          last_name: newStudent.last_name,
          picture: newStudent.picture,
          department_id: newStudent.department_id,
          degree_id: newStudent.degree_id,
          advisor_id: newStudent.advisor_id,
        },
      },
    },
    include: {
      student: true,
    },
  })
}

export async function getAllStudentPagination(
  keyword: string,
  pageSize: number,
  pageNo: number
) {
  const where = {
    OR: [
      { student_id_card: { contains: keyword } },
      { first_name: { contains: keyword } },
      { last_name: { contains: keyword } },
    ],
  }

  const students = await prisma.student.findMany({
    where,
    skip: pageSize * (pageNo - 1),
    take: pageSize,
    select: {
      id: true,
      student_id_card: true,
      first_name: true,
      last_name: true,
      department: true,
      degree: true,
      users: {
        select: {
          username: true,
        },
      },
    },
  })
  const count = await prisma.student.count({ where })
  return { count, students } as PageStudent
}

export function getStudentIdByUserId(id: number) {
  return prisma.user.findFirst({
    where: {
      id: id
    },select:{
      student_id: true,
      student:{
        select:{
          advisor_id: true,
        }
      }
    }
  })
}

export async function updateStudentById(studentId: number, updatedStudent: InStudent) {
  
  const user = await prisma.user.findFirst({
    where: {
      student: {
        id: studentId
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      username: updatedStudent.username,
      password: updatedStudent.password,
      user_role: {
        connect: {
          role_name: 'Student'
        },
      },
      student: {
        update: {
          student_id_card: updatedStudent.student_id_card,
          first_name: updatedStudent.first_name,
          last_name: updatedStudent.last_name,
          picture: updatedStudent.picture,
          department_id: updatedStudent.department_id,
          degree_id: updatedStudent.degree_id,
          advisor_id: updatedStudent.advisor_id,
        },
      },
    },
    include: {
      student: true,
    },
  })
}

export function countStudent() {
  return prisma.student.count()
}
