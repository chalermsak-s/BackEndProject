import type { InsFeedback } from '../models/feedback'
import * as feedbackRepository from '../repository/feedbackRepository'

export function getAllFeedbacks() {
  return feedbackRepository.getAllFeedbacks()
}

export function getFeedbackById(id: number) {
  return feedbackRepository.getFeedbackById(id)
}

export function getFeedbackByStudentId(id: number) {
  return feedbackRepository.getFeedbackByStudentId(id)
}

export function addFeedbackByAdvisor(newFeedback:InsFeedback) {
  const dataFeedback = {
    feedback: newFeedback.feedback,
    timestamp: newFeedback.timestamp || new Date(),
    student_id: newFeedback.student_id,
    advisor_id: newFeedback.advisor_id,
    responder_id: newFeedback.responder_id
  }
  return feedbackRepository.addFeedbackByAdvisor(dataFeedback)
}
