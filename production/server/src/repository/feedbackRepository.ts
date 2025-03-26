import { PrismaClient } from '@prisma/client'
import type { InsFeedback } from '../models/feedback'
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

export function getFeedbackByStudentId(id: number) {
  return prisma.feedback.findMany({
    where: { student_id: id },
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
    orderBy: {
      timestamp: 'desc',
    },
  })
}

export function addFeedbackByAdvisor(newFeedback: InsFeedback) {
  return prisma.feedback.create({
    data: {
      feedback: newFeedback.feedback,
      timestamp: newFeedback.timestamp,
      student_id: newFeedback.student_id,
      advisor_id: newFeedback.advisor_id,
      responder_id: newFeedback.responder_id
    }
  })
}
