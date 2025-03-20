// Description: This file contains the FeedbackRepository class, which interacts with the database to manage feedback data.
// It includes methods to create, read, and retrieve feedback between students and advisors.

import { feedback } from '@prisma/client';
import type { IFeedback } from '../models';
import prisma from './prisma-client';

export class FeedbackRepository {
  // Create a new feedback
  async createFeedback(feedbackData: IFeedback): Promise<feedback> {
    try {
      return await prisma.feedback.create({
        data: feedbackData,
      });
    } catch (error) {
      console.error('Error creating feedback:', error);
      throw error;
    }
  }

  // Get feedback by ID
  async getFeedbackById(id: number): Promise<feedback | null> {
    try {
      return await prisma.feedback.findUnique({
        where: { id },
        include: {
          student: true,
          advisor: true,
          responder: true,
          admin: true,
          replies: true,
          parent_feedback: true,
        }
      });
    } catch (error) {
      console.error(`Error retrieving feedback with ID ${id}:`, error);
      throw error;
    }
  }

  // Get feedback conversation between student and advisor
  async getFeedbackConversation(studentId: number, advisorId: number): Promise<feedback[]> {
    try {
      return await prisma.feedback.findMany({
        where: {
          student_id: studentId,
          advisor_id: advisorId,
          parent_feedback_id: null // Only top-level messages
        },
        orderBy: {
          timestamp: 'asc'
        },
        include: {
          student: true,
          advisor: true,
          responder: true,
          admin: true,
          replies: {
            include: {
              student: true,
              advisor: true,
              responder: true,
              admin: true,
              replies: true
            }
          }
        }
      });
    } catch (error) {
      console.error(`Error retrieving feedback conversation between student ${studentId} and advisor ${advisorId}:`, error);
      throw error;
    }
  }

  // Get Advisor feedbacks 
  async getAdvisorFeedbacks(advisorId: number): Promise<feedback[]> {
    try {
      return await prisma.feedback.findMany({
        where: {
          advisor_id: advisorId,
          parent_feedback_id: null // Only top-level messages
        },
        include: {
          student: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              student_id_card: true,
              picture: true
            }
          },
          responder: true,
          replies: {
            include: {
              student: true,
              advisor: true,
              responder: true,
              admin: true
            }
          }
        },
        orderBy: {
          timestamp: 'desc'
        }
      });
    } catch (error) {
      console.error(`Error retrieving feedbacks for advisor ID ${advisorId}:`, error);
      throw error;
    }
  }

  // Get Student feedbacks
  async getStudentFeedbacks(studentId: number): Promise<feedback[]> {
    try {
      return await prisma.feedback.findMany({
        where: {
          student_id: studentId,
          parent_feedback_id: null // Only top-level messages
        },
        include: {
          advisor: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              picture: true,
              academic_position: true
            }
          },
          responder: true,
          replies: {
            include: {
              student: true,
              advisor: true,
              responder: true,
              admin: true
            }
          }
        },
        orderBy: {
          timestamp: 'desc'
        }
      });
    } catch (error) {
      console.error(`Error retrieving feedbacks for student ID ${studentId}:`, error);
      throw error;
    }
  }

  // Add a reply to an existing feedback
  async addReply(replyData: Omit<IFeedback, 'id'>): Promise<feedback> {
    try {
      return await prisma.feedback.create({
        data: replyData,
        include: {
          student: true,
          advisor: true,
          responder: true,
          admin: true
        }
      });
    } catch (error) {
      console.error(`Error adding reply to feedback ID ${replyData.parent_feedback_id}:`, error);
      throw error;
    }
  }

  // Get all replies to a feedback
  async getFeedbackReplies(feedbackId: number): Promise<feedback[]> {
    try {
      return await prisma.feedback.findMany({
        where: {
          parent_feedback_id: feedbackId
        },
        include: {
          student: true,
          advisor: true,
          responder: true,
          admin: true
        },
        orderBy: {
          timestamp: 'asc'
        },
      });
    } catch (error) {
      console.error(`Error retrieving replies for feedback ID ${feedbackId}:`, error);
      throw error;
    }
  }
}