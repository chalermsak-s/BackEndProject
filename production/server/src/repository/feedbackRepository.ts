import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export function getAllFeedbacks() {
  return prisma.feedback.findMany({
    select: {
      id: true,
      feedback: true,
      timestamp: true,
      student_id: true,
      advisor_id: true,
      admin_id: true,
      responder_id: true,
      student: {
        select: {
          student_id_card: true,
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
      responder: {
        select: {
          responder: true,
        },
      },
    },
  })
}

export function getFeedbackById(id: number) {
  return prisma.feedback.findUnique({
    where: { id },
    select: {
      id: true,
      feedback: true,
      timestamp: true,
      student_id: true,
      advisor_id: true,
      admin_id: true,
      responder_id: true,
      student: {
        select: {
          student_id_card: true,
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
      responder: {
        select: {
          responder: true,
        },
      },
    },
  })
}
